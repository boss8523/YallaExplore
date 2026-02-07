import { MOCK_RESPONSE } from './mockResponse';

const API_URL: string | null = null; // Set your backend URL here when ready

export async function askAI(query: string) {
  if (!API_URL) {
    await new Promise((res) => setTimeout(res, 800));
    return MOCK_RESPONSE;
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) throw new Error('AI backend error');
  return res.json();
}
