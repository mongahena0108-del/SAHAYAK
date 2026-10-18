import http from 'node:http';
import {schemes} from '../src/data/schemes.js';
import {fetchTinyfishContent, isAllowedSourceUrl} from './tinyfish.mjs';

const port = Number(process.env.PORT || 8787);
const enabled = process.env.TINYFISH_ENABLED === 'true';

function json(res, status, body) {
  res.writeHead(status, {'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store'});
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; if (body.length > 10000) reject(new Error('Request body is too large.')); });
    req.on('end', () => { try { resolve(JSON.parse(body || '{}')); } catch { reject(new Error('Request body must be valid JSON.')); } });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method !== 'POST' || req.url !== '/api/tinyfish/refresh') return json(res, 404, {ok: false, error: 'Not found.'});
  if (!enabled) return json(res, 503, {ok: false, error: 'Live official-source refresh is disabled. Set TINYFISH_ENABLED=true on the server to enable it.'});
  try {
    const {url} = await readBody(req);
    const record = schemes.find(scheme => scheme.url === url);
    if (!record || !isAllowedSourceUrl(url)) return json(res, 400, {ok: false, error: 'Only an HTTPS source URL from a stored scheme record can be refreshed.'});
    const data = await fetchTinyfishContent(url, process.env.TINYFISH_API_KEY);
    return json(res, 200, {ok: true, data});
  } catch (error) {
    return json(res, 502, {ok: false, error: error instanceof Error ? error.message : 'The official-source check failed.'});
  }
});

server.listen(port, () => console.log(`SAHAYAK API server listening on http://localhost:${port}`));
