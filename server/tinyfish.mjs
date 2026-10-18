const TINYFISH_FETCH_URL = 'https://api.fetch.tinyfish.ai';

export function isAllowedSourceUrl(value) {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password) return false;
    if (url.hostname === 'localhost' || url.hostname.endsWith('.localhost')) return false;
    if (/^(127\.|10\.|192\.168\.|169\.254\.)/.test(url.hostname)) return false;
    if (url.hostname === '::1' || url.hostname === '0.0.0.0') return false;
    return true;
  } catch { return false; }
}

export function validateTinyfishResponse(payload, sourceUrl) {
  if (!payload || !Array.isArray(payload.results) || !Array.isArray(payload.errors)) throw new Error('TinyFish returned an invalid response.');
  const result = payload.results.find(item => item?.url === sourceUrl || item?.final_url === sourceUrl) || payload.results[0];
  if (!result || typeof result.text !== 'string') {
    const failure = payload.errors.find(item => item?.url === sourceUrl);
    throw new Error(failure?.error ? `TinyFish could not read the source (${failure.error}).` : 'The source returned no readable content.');
  }
  return result;
}

export function relevantExcerpt(text) {
  const paragraphs = text.split(/\n\s*\n/).map(part => part.replace(/[#*_`]/g, '').replace(/\s+/g, ' ').trim()).filter(Boolean);
  const relevant = paragraphs.filter(part => /eligib|benefit|document|apply|application|loan|scholarship|grant|open|close|deadline|guideline|requirement|eligible/i.test(part));
  return relevant.slice(0, 12).join('\n\n').slice(0, 7000).trim();
}

export async function fetchTinyfishContent(sourceUrl, apiKey, fetchImpl = fetch) {
  if (!apiKey) throw new Error('TinyFish is not configured. Add TINYFISH_API_KEY on the server.');
  const response = await fetchImpl(TINYFISH_FETCH_URL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json', 'X-API-Key': apiKey},
    body: JSON.stringify({
      urls: [sourceUrl], format: 'markdown', ttl: 0,
      purpose: 'Extract official information about scheme eligibility, benefits, required documents, application process, and current application availability. Do not infer approval or eligibility.'
    })
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok) throw new Error(payload?.error?.message || `TinyFish request failed with HTTP ${response.status}.`);
  const result = validateTinyfishResponse(payload, sourceUrl);
  const content = relevantExcerpt(result.text);
  return {sourceUrl: result.final_url || result.url || sourceUrl, title: result.title || null, content, empty: !content, retrievedAt: new Date().toISOString()};
}
