function applicantType(profile) {
  if (profile.audience !== 'entrepreneur') return 'student';
  if (profile.business === 'Aspiring Entrepreneur') return 'aspiring_entrepreneur';
  if (profile.business === 'Existing business' || profile.business === 'Existing Entrepreneur') return 'existing_entrepreneur';
  if (profile.business === 'Entrepreneur') return 'any_entrepreneur';
  return null;
}

function upperIncome(value) {
  if (!value) return null;
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  if (typeof value !== 'string') return null;
  if (value.includes('Above')) return Number.POSITIVE_INFINITY;
  const numbers = value.match(/[\d.]+/g);
  if (!numbers?.length) return null;
  return Math.max(...numbers.map(number => Number(number) * (value.includes('lakh') ? 100000 : 1)));
}

function ageRange(value) {
  if (!value) return null;
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  if (typeof value !== 'string') return null;
  const numbers = value.match(/\d+/g);
  return numbers?.length ? Number(numbers[0]) : null;
}

export function matchSchemes(profile, records) {
  const type = applicantType(profile);
  return records.filter(scheme => scheme.audience === profile.audience).map(scheme => {
    const matched = [], missing = [], concerns = [];
    const allowedTypes = scheme.applicantTypes || [scheme.audience];

    if (!type && profile.audience === 'entrepreneur') missing.push('applicant type');
    else if (type === 'any_entrepreneur') missing.push('specific applicant type');
    else if (type && !allowedTypes.includes(type)) concerns.push(`the programme is listed for ${allowedTypes.join(' or ')}`);
    else matched.push(type === 'student' ? 'student profile' : 'applicant type fits');

    if (profile.age && scheme.ageMax) {
      const age = ageRange(profile.age);
      if (age && age <= scheme.ageMax) matched.push('age range may fit');
      else if (age) concerns.push(`the sample record lists an age limit of ${scheme.ageMax}`);
      else missing.push('age confirmation');
    } else if (scheme.ageMax) missing.push('age');

    if (scheme.education) {
      if (profile.education && scheme.education.includes(profile.education)) matched.push('education level fits');
      else if (profile.education) concerns.push('education level may not fit');
      else missing.push('education level');
    }

    if (scheme.incomeMax) {
      const income = upperIncome(profile.income);
      if (income === null) missing.push('family income');
      else if (income <= scheme.incomeMax) matched.push('income may fit the listed threshold');
      else concerns.push('income is above the listed threshold');
    }

    if (scheme.businessStages) {
      if (!profile.stage) missing.push('business stage');
      else if (scheme.businessStages.includes(profile.stage)) matched.push('business stage fits');
      else concerns.push('business stage may not fit');
    }
    if (scheme.sectors) {
      if (!profile.sector) missing.push('business sector');
      else if (scheme.sectors.includes(profile.sector)) matched.push('business sector fits');
      else concerns.push('business sector may not fit');
    }
    if (profile.state) matched.push(`${profile.state} profile added`);

    const status = concerns.length ? 'not-match' : missing.length ? 'more' : 'potential';
    const explanation = status === 'potential'
      ? `Potential match based on ${matched.join(', ')}. Confirm the official criteria.`
      : status === 'more'
        ? `Needs more information: ${missing.join(', ')}.`
        : `Likely not a match based on known criteria: ${concerns.join('; ')}.`;
    return {...scheme, matchStatus: status, matched, missing, concerns, explanation};
  }).sort((a, b) => ({potential: 0, more: 1, 'not-match': 2}[a.matchStatus] - {potential: 0, more: 1, 'not-match': 2}[b.matchStatus]));
}

export function filterSchemeResults(records, query = '', category = 'All') {
  const normalizedQuery = query.trim().toLowerCase();
  return records.filter(scheme => (category === 'All' || scheme.category === category) && scheme.name.toLowerCase().includes(normalizedQuery));
}

export function calculateEmi(principal, annualRate, months) {
  const p=Number(principal), n=Number(months), r=Number(annualRate)/1200;
  if (!Number.isFinite(p)||!Number.isFinite(n)||!Number.isFinite(r)||p<=0||n<=0||r<0) return {emi:0,total:0,interest:0};
  const emi = r === 0 ? p/n : p*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);
  return {emi,total:emi*n,interest:emi*n-p};
}
