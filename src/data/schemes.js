const sourceChecked = '2026-10-17';

// Government programme records are intentionally conservative. A needs_verification label means
// the user must confirm current rules, windows, and documents on the linked official source.
export const schemes = [
  {
    id: 'pm-usp-csss', audience: 'student', applicantTypes: ['student'],
    name: 'PM-USP Central Sector Scheme of Scholarship', department: 'Department of Higher Education, Ministry of Education',
    category: 'Scholarship', availability: 'National', description: 'A higher-education scholarship pathway for meritorious students who meet the current scheme conditions.',
    benefit: 'Scholarship assistance as specified in the current official guidelines', education: ['undergraduate'], incomeMax: 450000,
    documents: ['Academic result and admission records', 'Income certificate where required', 'Bank and identity documents requested by the official portal'],
    steps: ['Read the current PM-USP CSSS guidelines', 'Check institution and course conditions', 'Prepare the documents listed by the official portal', 'Apply through the National Scholarship Portal when the window is open', 'Track the application only through the official portal'],
    url: 'https://scholarships.gov.in', sourceTitle: 'National Scholarship Portal', sourceStatus: 'Official NSP page inspected; current PM-USP renewal notice is visible, but eligibility details still require scheme-level confirmation', verificationStatus: 'source_checked', lastChecked: sourceChecked,
    tags: ['Education', 'Scholarship'], criteria: ['Higher-education study', 'Merit and income conditions apply', 'Current institution and course rules must be confirmed']
  },
  {
    id: 'aicte-pragati', audience: 'student', applicantTypes: ['student'],
    name: 'AICTE Pragati Scholarship Scheme', department: 'All India Council for Technical Education (AICTE)',
    category: 'Scholarship', availability: 'National', description: 'A scholarship programme for eligible women students in AICTE-approved technical education programmes.',
    benefit: 'Education support under the current AICTE scheme guidelines; not a guaranteed award', education: ['undergraduate', 'diploma'],
    documents: ['Admission and institute records', 'Academic records', 'Income and other supporting documents listed in the current notice'],
    steps: ['Confirm that the institution and programme are covered', 'Read the current AICTE notice', 'Prepare the listed documents', 'Apply through the official scholarship route', 'Retain the acknowledgement and monitor official updates'],
    url: 'https://www.aicte-india.org/schemes/students-development-schemes', sourceTitle: 'AICTE Student Development Schemes', sourceStatus: 'Official AICTE page inspected; Pragati is listed, while current registration details still require confirmation', verificationStatus: 'source_checked', lastChecked: sourceChecked,
    tags: ['Technical education', 'Scholarship'], criteria: ['AICTE-approved technical programme', 'Current scheme conditions and applicant requirements apply']
  },
  {
    id: 'pm-vidyalaxmi', audience: 'student', applicantTypes: ['student'],
    name: 'PM-Vidyalaxmi', department: 'Department of Higher Education, Ministry of Education',
    category: 'Education finance', availability: 'National', description: 'A government education-finance support pathway that helps eligible students explore education loans and related support through participating institutions.',
    benefit: 'Education-finance support; this is not a direct grant and lender approval is separate', education: ['undergraduate', 'postgraduate', 'diploma'], loan: true,
    documents: ['Admission letter or proof of study', 'Academic records', 'Income and other documents requested by the participating lender'],
    steps: ['Review the current PM-Vidyalaxmi guidance', 'Check whether the institution and course are covered', 'Compare lender terms carefully', 'Apply through the official education-loan route', 'Track the request with the lender'],
    url: 'https://www.vidyalakshmi.co.in', sourceTitle: 'Vidya Lakshmi Education Loan Portal', sourceStatus: 'Official portal link; current scheme terms and lender availability need verification', verificationStatus: 'needs_verification', lastChecked: sourceChecked,
    tags: ['Loan', 'Education'], criteria: ['Eligible higher-education admission', 'Lender assessment and repayment terms apply']
  },
  {
    id: 'national-means-cum-merit', audience: 'student', applicantTypes: ['student'],
    name: 'National Means-cum-Merit Scholarship Scheme', department: 'Department of School Education and Literacy, Ministry of Education',
    category: 'Scholarship', availability: 'National', description: 'A school-level scholarship pathway for eligible students continuing education after the selection stage.',
    benefit: 'Scholarship assistance under the current state and central implementation guidelines', education: ['school'],
    documents: ['School and academic records', 'Income certificate where required', 'Documents specified by the state or official application route'],
    steps: ['Check the current scheme and state implementation notice', 'Confirm the relevant selection and school conditions', 'Prepare the requested documents', 'Apply through the notified official route', 'Follow official renewal or status instructions'],
    url: 'https://dsel.education.gov.in/scheme/national-means-cum-merit-scholarship-scheme', sourceTitle: 'Ministry of Education: NMMS', sourceStatus: 'Official ministry source; state-level route and current conditions need verification', verificationStatus: 'needs_verification', lastChecked: sourceChecked,
    tags: ['School education', 'Scholarship'], criteria: ['School-level study', 'Selection, income, and state implementation conditions apply']
  },
  {
    id: 'pm-mudra', audience: 'entrepreneur', applicantTypes: ['aspiring_entrepreneur', 'existing_entrepreneur'],
    name: 'Pradhan Mantri MUDRA Yojana', department: 'Ministry of Finance', category: 'Business loan', availability: 'National',
    description: 'A business-credit pathway for eligible micro enterprises through participating lenders.', benefit: 'Business loan pathway; approval, interest, fees, and repayment depend on the lender', loan: true,
    documents: ['Business or activity details', 'Identity and address documents requested by lender', 'Banking, registration, or project documents where applicable'],
    steps: ['Define the business purpose and funding need', 'Review current MUDRA guidance and participating lenders', 'Prepare the lender-requested documents', 'Apply with the participating lender', 'Track the application with that lender'],
    url: 'https://www.mudra.org.in', sourceTitle: 'MUDRA: Pradhan Mantri MUDRA Yojana', sourceStatus: 'Official MUDRA source; lender-specific terms need verification', verificationStatus: 'needs_verification', lastChecked: sourceChecked,
    tags: ['Loan', 'Micro enterprise'], criteria: ['Micro-enterprise purpose', 'Lender assessment and documentation apply']
  },
  {
    id: 'startup-india-dpiit-recognition', audience: 'entrepreneur', applicantTypes: ['aspiring_entrepreneur', 'existing_entrepreneur'],
    name: 'Startup India: DPIIT Startup Recognition', department: 'Department for Promotion of Industry and Internal Trade (DPIIT)', category: 'Recognition', availability: 'National',
    description: 'A recognition programme for eligible startup entities that can unlock access to certain government benefits and support routes.', benefit: 'Recognition and access to applicable benefits; not a grant or loan',
    documents: ['Entity incorporation or registration information', 'Business and innovation details', 'Documents requested in the current recognition application'],
    steps: ['Review current DPIIT recognition criteria', 'Prepare entity and business information', 'Apply through the Startup India recognition route', 'Respond to any official clarification request', 'Use only benefits for which the recognised entity separately qualifies'],
    url: 'https://www.startupindia.gov.in/content/sih/en/startup-scheme.html', sourceTitle: 'Startup India: DPIIT Recognition', sourceStatus: 'Official Startup India source checked; current criteria and benefits should still be confirmed', verificationStatus: 'source_checked', lastChecked: sourceChecked,
    tags: ['Recognition', 'Startup'], criteria: ['Eligible entity form and age conditions', 'Innovation or scalability requirements apply', 'Recognition is not funding']
  },
  {
    id: 'startup-india-seed-fund', audience: 'entrepreneur', applicantTypes: ['aspiring_entrepreneur', 'existing_entrepreneur'],
    name: 'Startup India Seed Fund Scheme', department: 'DPIIT, Ministry of Commerce and Industry', category: 'Startup support', availability: 'National',
    description: 'A competitive seed-support programme delivered through eligible incubators for startups meeting the current scheme conditions.', benefit: 'Potential seed support through an eligible incubator; selection is competitive and not guaranteed',
    documents: ['Startup and founder information', 'Business plan or pitch materials', 'Incorporation and other documents requested by the incubator or official portal'],
    steps: ['Read the current Seed Fund Scheme guidelines', 'Check startup and incubator conditions', 'Prepare the requested venture materials', 'Apply through the official Seed Fund route when available', 'Follow the selected incubator’s official process'],
    url: 'https://seedfund.startupindia.gov.in', sourceTitle: 'Startup India Seed Fund Scheme', sourceStatus: 'Official Startup India Seed Fund portal; current availability and terms need verification', verificationStatus: 'needs_verification', lastChecked: sourceChecked,
    tags: ['Incubation', 'Startup support'], criteria: ['Startup-stage and innovation conditions', 'Incubator selection and due diligence apply']
  },
  {
    id: 'prism', audience: 'entrepreneur', applicantTypes: ['aspiring_entrepreneur', 'existing_entrepreneur'],
    name: 'PRISM: Promoting Innovations in Individuals, Startups and MSMEs', department: 'Department of Scientific and Industrial Research, Ministry of Science and Technology', category: 'Innovation grant', availability: 'National',
    description: 'An innovation support programme for individuals and early-stage innovators developing technology or product ideas.', benefit: 'Innovation support subject to the current PRISM guidelines and evaluation; not a guaranteed grant',
    documents: ['Innovation proposal', 'Technical and business information', 'Documents specified in the current PRISM call'],
    steps: ['Review the current PRISM guidelines or call', 'Prepare the innovation proposal', 'Submit through the notified official route', 'Respond to technical evaluation requirements', 'Follow the official sanction and reporting process if selected'],
    url: 'https://dst.gov.in/prism', sourceTitle: 'Department of Science and Technology: PRISM', sourceStatus: 'Official DST source; active call, amount, and current documents need verification', verificationStatus: 'needs_verification', lastChecked: sourceChecked,
    tags: ['Innovation', 'Grant'], criteria: ['Technology or product innovation', 'Evaluation and current call conditions apply']
  },
  {
    id: 'startup-credit-guarantee', audience: 'entrepreneur', applicantTypes: ['aspiring_entrepreneur', 'existing_entrepreneur'],
    name: 'Credit Guarantee Scheme for Startups', department: 'Department for Promotion of Industry and Internal Trade (DPIIT)', category: 'Credit guarantee', availability: 'National',
    description: 'A credit-guarantee support route for eligible startups through participating lenders.', benefit: 'Credit guarantee support to lenders; it is not a direct grant or automatic loan approval', loan: true,
    documents: ['DPIIT recognition and startup information', 'Loan proposal and financial information', 'Documents requested by the participating lender'],
    steps: ['Review the current Startup India credit-guarantee guidance', 'Check startup and lender conditions', 'Prepare the loan proposal and requested documents', 'Approach a participating lender', 'Track the credit request with the lender'],
    url: 'https://www.startupindia.gov.in/content/sih/en/credit-guarantee-scheme-for-startups.html', sourceTitle: 'Startup India: Credit Guarantee Scheme for Startups', sourceStatus: 'Official Startup India source link; current coverage and lender terms need verification', verificationStatus: 'needs_verification', lastChecked: sourceChecked,
    tags: ['Credit guarantee', 'Startup'], criteria: ['DPIIT-recognised startup conditions may apply', 'Lender appraisal is required']
  },
  {
    id: 'pmegp', audience: 'entrepreneur', applicantTypes: ['aspiring_entrepreneur', 'existing_entrepreneur'],
    name: 'Prime Minister’s Employment Generation Programme (PMEGP)', department: 'Ministry of Micro, Small and Medium Enterprises; implemented by KVIC', category: 'Subsidy-linked loan', availability: 'National',
    description: 'A credit-linked support programme for setting up eligible new micro enterprises through the notified implementation agencies and lenders.', benefit: 'Credit-linked margin-money subsidy pathway; lender approval and contribution requirements apply', loan: true,
    documents: ['Project report', 'Identity and address documents', 'Category or education documents where applicable', 'Documents requested by the implementing agency and lender'],
    steps: ['Read current PMEGP guidelines', 'Prepare the project report and contribution details', 'Apply through the official PMEGP portal', 'Complete agency and lender appraisal', 'Follow sanction, training, and reporting instructions'],
    url: 'https://www.kviconline.gov.in/pmegpeportal/pmegphome/index.jsp', sourceTitle: 'KVIC PMEGP e-Portal', sourceStatus: 'Official KVIC portal; current limits, subsidy conditions, and application status need verification', verificationStatus: 'needs_verification', lastChecked: sourceChecked,
    tags: ['Loan', 'Micro enterprise', 'Subsidy'], criteria: ['New micro-enterprise conditions', 'Project, lender, and implementing-agency assessment apply']
  },
  {
    id: 'cgtmse', audience: 'entrepreneur', applicantTypes: ['existing_entrepreneur', 'aspiring_entrepreneur'],
    name: 'Credit Guarantee Scheme for Micro and Small Enterprises', department: 'Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE)', category: 'Credit guarantee', availability: 'National',
    description: 'A credit-guarantee support route that helps eligible lenders extend collateral-free or reduced-collateral credit to qualifying micro and small enterprises.', benefit: 'Credit guarantee support to lenders; it is not a direct grant or automatic loan approval', loan: true,
    documents: ['Business and enterprise information', 'Loan proposal and financial information', 'Documents requested by the participating lender'],
    steps: ['Check current CGTMSE coverage and lender participation', 'Prepare the business and loan proposal', 'Approach a participating lender', 'Complete lender appraisal and guarantee formalities', 'Track the credit request with the lender'],
    url: 'https://www.cgtmse.in', sourceTitle: 'CGTMSE official portal', sourceStatus: 'Official CGTMSE page inspected; it describes credit guarantees and lender-led appraisal, while current coverage needs confirmation', verificationStatus: 'source_checked', lastChecked: sourceChecked,
    tags: ['Credit guarantee', 'MSME'], criteria: ['Micro or small enterprise and eligible credit facility', 'Lender appraisal is required']
  },
  {
    id: 'pm-svanidhi', audience: 'entrepreneur', applicantTypes: ['existing_entrepreneur'],
    name: 'PM Street Vendor’s AtmaNirbhar Nidhi (PM SVANidhi)', department: 'Ministry of Housing and Urban Affairs', category: 'Working-capital loan', availability: 'National',
    description: 'A working-capital credit programme for eligible street vendors, delivered through the notified urban and lending system.', benefit: 'Working-capital loan pathway; repayment, lender, and current eligibility conditions apply', loan: true,
    documents: ['Street-vendor identification or survey information', 'Identity and address documents requested by the official process', 'Other documents required by the lender or urban local body'],
    steps: ['Check current PM SVANidhi eligibility and local process', 'Confirm vendor identification requirements', 'Prepare the requested documents', 'Apply through the official portal or notified facilitation route', 'Track the application with the lender or local authority'],
    url: 'https://pmsvanidhi.mohua.gov.in', sourceTitle: 'PM SVANidhi official portal', sourceStatus: 'Official MoHUA portal inspected; it identifies the street-vendor credit facility and current application routes', verificationStatus: 'source_checked', lastChecked: sourceChecked,
    tags: ['Loan', 'Street vendor'], criteria: ['Eligible street-vendor activity', 'Urban local body and lender conditions apply']
  },
  {
    id: 'udyam-registration', audience: 'entrepreneur', applicantTypes: ['existing_entrepreneur'],
    name: 'Udyam Registration', department: 'Ministry of Micro, Small and Medium Enterprises', category: 'Business registration', availability: 'National',
    description: 'The official registration route for eligible micro, small, and medium enterprises.', benefit: 'MSME registration and access to applicable government processes; not a grant or loan',
    documents: ['PAN and GST-linked information where applicable', 'Enterprise and business details requested by the official registration form'],
    steps: ['Visit the official Udyam Registration portal', 'Read the current registration guidance', 'Enter the enterprise details requested by the portal', 'Submit and retain the registration reference', 'Use the registration only for applicable schemes and services'],
    url: 'https://udyamregistration.gov.in', sourceTitle: 'Udyam Registration official portal', sourceStatus: 'Official MSME portal inspected; it identifies the registration process and warns users to use only the government portal', verificationStatus: 'source_checked', lastChecked: sourceChecked,
    tags: ['Registration', 'MSME'], criteria: ['Existing enterprise or business activity', 'Portal and classification conditions apply']
  },
  {
    id: 'stand-up-india', audience: 'entrepreneur', applicantTypes: ['aspiring_entrepreneur', 'existing_entrepreneur'],
    name: 'Stand-Up India', department: 'Department of Financial Services, Ministry of Finance', category: 'Business loan', availability: 'National',
    description: 'A bank-finance pathway for eligible entrepreneurs setting up a new enterprise in the notified categories and sectors.', benefit: 'Business loan pathway; bank assessment, contribution, and repayment terms apply', loan: true,
    documents: ['Project report or business plan', 'Identity and address documents', 'Promoter contribution and enterprise documents requested by the lender'],
    steps: ['Review current Stand-Up India eligibility', 'Prepare the greenfield enterprise project report', 'Use the official portal or participating bank route', 'Complete bank appraisal', 'Track the application with the bank'],
    url: 'https://www.standupmitra.in', sourceTitle: 'Stand-Up India official portal', sourceStatus: 'Official portal inspected; it describes greenfield enterprise loans and the relevant applicant categories', verificationStatus: 'source_checked', lastChecked: sourceChecked,
    tags: ['Loan', 'Enterprise'], criteria: ['Greenfield enterprise conditions', 'Current applicant and lender conditions apply']
  }
];

// A date is only shown for records whose source page was actually inspected during this audit.
schemes.forEach(scheme => {
  if (scheme.verificationStatus === 'needs_verification') scheme.lastChecked = null;
});
