import {describe,it,expect} from 'vitest';
import {matchSchemes,filterSchemeResults,calculateEmi} from '../src/lib/matching.js';
import {schemes} from '../src/data/schemes.js';

describe('scheme dataset and matching',()=>{
  it('contains the expanded audience groups',()=>{
    expect(schemes).toHaveLength(14);
    expect(schemes.filter(s=>s.audience==='student')).toHaveLength(4);
    expect(schemes.filter(s=>s.audience==='entrepreneur')).toHaveLength(10);
  });
  it('returns all student records with a transparent status',()=>{
    const out=matchSchemes({audience:'student',age:'18–24',education:'undergraduate',income:'Below ₹2.5 lakh',state:'Delhi'},schemes);
    expect(out).toHaveLength(4);
    expect(out.some(x=>x.matchStatus==='potential')).toBe(true);
    expect(out.every(x=>x.explanation)).toBe(true);
  });
  it('supports aspiring and existing entrepreneurs separately',()=>{
    const aspiring=matchSchemes({audience:'entrepreneur',business:'Aspiring Entrepreneur'},schemes);
    const existing=matchSchemes({audience:'entrepreneur',business:'Existing business'},schemes);
    expect(aspiring).toHaveLength(10);
    expect(existing).toHaveLength(10);
    expect(aspiring.find(x=>x.id==='pm-svanidhi').matchStatus).toBe('not-match');
    expect(existing.find(x=>x.id==='pm-svanidhi').matchStatus).not.toBe('not-match');
  });
  it('does not exclude records when optional profile information is blank',()=>{
    const out=matchSchemes({audience:'student'},schemes);
    expect(out).toHaveLength(4);
    expect(out.some(x=>x.matchStatus==='more')).toBe(true);
  });
  it('keeps All, search, and category filtering deterministic',()=>{
    const out=matchSchemes({audience:'student'},schemes);
    expect(filterSchemeResults(out)).toHaveLength(4);
    expect(filterSchemeResults(out,'pragati')).toHaveLength(1);
    expect(filterSchemeResults(out,'','Scholarship')).toHaveLength(3);
  });
  it('stores official source metadata for every record',()=>{
    expect(schemes.every(s=>s.url&&s.sourceTitle&&s.verificationStatus)).toBe(true);
    expect(schemes.some(s=>s.verificationStatus==='needs_verification')).toBe(true);
    expect(schemes.filter(s=>s.verificationStatus==='source_checked').every(s=>s.lastChecked)).toBe(true);
    expect(schemes.filter(s=>s.verificationStatus==='needs_verification').every(s=>s.lastChecked===null)).toBe(true);
    expect(schemes.find(s=>s.id==='startup-india-dpiit-recognition').verificationStatus).toBe('source_checked');
  });
  it('handles numeric profile values and the generic entrepreneur option',()=>{
    expect(matchSchemes({audience:'student',age:20,income:200000},schemes).length).toBe(4);
    expect(matchSchemes({audience:'entrepreneur',business:'Entrepreneur'},schemes).every(s=>s.matchStatus!=='not-match')).toBe(true);
  });
  it('handles all questionnaire applicant-type values without changing family guidance',()=>{
    const aspiring=matchSchemes({audience:'entrepreneur',business:'Aspiring Entrepreneur'},schemes);
    const existing=matchSchemes({audience:'entrepreneur',business:'Existing Entrepreneur'},schemes);
    const generic=matchSchemes({audience:'entrepreneur',business:'Entrepreneur'},schemes);
    const family=matchSchemes({audience:'entrepreneur',business:'Family or Guardian'},schemes);
    expect(aspiring.find(s=>s.id==='pm-svanidhi').matchStatus).toBe('not-match');
    expect(existing.find(s=>s.id==='pm-svanidhi').matchStatus).not.toBe('not-match');
    expect(generic.every(s=>s.matchStatus!=='not-match')).toBe(true);
    expect(family.every(s=>s.matchStatus==='more')).toBe(true);
  });
});

describe('EMI calculator',()=>{
  it('calculates reducing balance EMI',()=>{const x=calculateEmi(100000,12,12);expect(Math.round(x.emi)).toBe(8885);expect(Math.round(x.total)).toBe(106619);});
  it('handles zero interest and invalid input',()=>{expect(calculateEmi(1200,0,12).emi).toBe(100);expect(calculateEmi(-1,10,12).emi).toBe(0);});
});
