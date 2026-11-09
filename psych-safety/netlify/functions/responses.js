// Server-side proxy for the survey's JSONbin storage.
//
// The JSONbin credentials live in Netlify environment variables, so they
// never reach the browser:
//   JSONBIN_ACCESS_KEY  – JSONbin Access Key, Bins Read + Update only (preferred, secret)
//   JSONBIN_MASTER_KEY  – JSONbin Master Key (fallback if no Access Key is set, secret)
//   JSONBIN_BIN_ID      – ID of the bin holding the responses array
//
// Endpoints (all at /.netlify/functions/responses):
//   GET     → returns the responses array
//   POST    → appends one response object (JSON body), returns { count }
//   DELETE  → clears all responses
//   POST ?verify=1 → reads and writes the data back unchanged (checks read + update access)
//
// The browser can no longer write arbitrary data to the bin: only append
// a single, size-limited response, or clear (which the dashboard already offers).

const JSONBIN = 'https://api.jsonbin.io/v3/b/';
const MAX_RESPONSE_BYTES = 20 * 1024;

const json = (statusCode, body) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  body: JSON.stringify(body),
});

exports.handler = async (event) => {
  const accessKey = process.env.JSONBIN_ACCESS_KEY;
  const masterKey = process.env.JSONBIN_MASTER_KEY;
  const bin = process.env.JSONBIN_BIN_ID;
  if (!(accessKey || masterKey) || !bin) return json(503, { error: 'Shared storage is not configured.' });
  const auth = accessKey ? { 'X-Access-Key': accessKey } : { 'X-Master-Key': masterKey };

  const read = async () => {
    const r = await fetch(JSONBIN + bin + '/latest', {
      headers: { ...auth, 'X-Bin-Meta': 'false' },
    });
    if (!r.ok) throw new Error('read ' + r.status);
    const data = await r.json();
    // Accept the raw record, or the { record, metadata } wrapper.
    const record = Array.isArray(data) ? data : data && data.record;
    return Array.isArray(record) ? record : [];
  };

  const write = async (data) => {
    const r = await fetch(JSONBIN + bin, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...auth,
        'X-Bin-Versioning': 'false',
      },
      body: JSON.stringify(data),
    });
    if (!r.ok) throw new Error('write ' + r.status);
  };

  try {
    switch (event.httpMethod) {
      case 'GET':
        return json(200, await read());

      case 'POST': {
        if (event.queryStringParameters && event.queryStringParameters.verify) {
          const all = await read();
          await write(all);
          return json(200, { ok: true, count: all.length });
        }
        const raw = event.isBase64Encoded
          ? Buffer.from(event.body || '', 'base64').toString('utf8')
          : event.body || '';
        if (Buffer.byteLength(raw) > MAX_RESPONSE_BYTES) return json(413, { error: 'Response too large.' });
        let resp;
        try { resp = JSON.parse(raw); } catch { return json(400, { error: 'Invalid JSON.' }); }
        if (!resp || typeof resp !== 'object' || Array.isArray(resp)) {
          return json(400, { error: 'Expected a single response object.' });
        }
        const all = await read();
        all.push(resp);
        await write(all);
        return json(200, { count: all.length });
      }

      case 'DELETE':
        await write([]);
        return json(200, { count: 0 });

      default:
        return { statusCode: 405, headers: { Allow: 'GET, POST, DELETE' }, body: '' };
    }
  } catch (e) {
    console.error('JSONbin proxy error:', e.message);
    return json(502, { error: 'Storage request failed.' });
  }
};
