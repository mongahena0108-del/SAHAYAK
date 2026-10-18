import {describe,it,expect} from 'vitest';
import {fetchTinyfishContent,isAllowedSourceUrl,validateTinyfishResponse} from '../server/tinyfish.mjs';
import {schemes} from '../src/data/schemes.js';

describe('TinyFish server integration',()=>{
  it('accepts only safe HTTPS source URLs',()=>{
    expect(isAllowedSourceUrl(schemes[0].url)).toBe(true);
    expect(isAllowedSourceUrl('http://example.gov.in')).toBe(false);
    expect(isAllowedSourceUrl('https://localhost:8787')).toBe(false);
    expect(isAllowedSourceUrl('https://user:pass@example.gov.in')).toBe(false);
  });
  it('validates and extracts a documented successful Fetch response',async()=>{
    const result=await fetchTinyfishContent('https://example.gov.in/scheme','secret',async()=>({ok:true,status:200,json:async()=>({results:[{url:'https://example.gov.in/scheme',title:'Scheme page',text:'# Eligibility\n\nApplicants may apply.\n\nOther page content.'}],errors:[]})}));
    expect(result.sourceUrl).toBe('https://example.gov.in/scheme');
    expect(result.content).toContain('Applicants may apply.');
    expect(result.retrievedAt).toBeTruthy();
  });
  it('surfaces per-URL failures and invalid response shapes',async()=>{
    await expect(fetchTinyfishContent('https://example.gov.in/scheme','secret',async()=>({ok:true,status:200,json:async()=>({results:[],errors:[{url:'https://example.gov.in/scheme',error:'bot_blocked'}]})}))).rejects.toThrow('bot_blocked');
    expect(()=>validateTinyfishResponse({results:{}},'https://example.gov.in')).toThrow('invalid response');
  });
  it('represents a successful fetch with no relevant text as an empty result',async()=>{
    const result=await fetchTinyfishContent('https://example.gov.in/scheme','secret',async()=>({ok:true,status:200,json:async()=>({results:[{url:'https://example.gov.in/scheme',text:'Navigation only'}],errors:[]})}));
    expect(result.empty).toBe(true);
    expect(result.content).toBe('');
  });
  it('does not change locally stored scheme details',()=>{
    const local=schemes.find(s=>s.id==='pm-usp-csss');
    expect(local.name).toBe('PM-USP Central Sector Scheme of Scholarship');
    expect(local.url).toBe('https://scholarships.gov.in');
  });
});
