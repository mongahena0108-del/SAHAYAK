export async function refreshOfficialScheme(url, fetchImpl = fetch) {
  const response = await fetchImpl('/api/tinyfish/refresh', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({url})
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || !payload.ok) throw new Error(payload.error || 'The official-source check could not be completed.');
  if (!payload.data?.retrievedAt || !payload.data?.sourceUrl) throw new Error('The official-source response was incomplete.');
  return payload.data;
}
