export interface TaxSection {
  id: string;
  code: string;
  title: string;
  category: "Savings" | "Insurance" | "Salary" | "Investments" | "Home Loan" | "Education" | "Retirement";
  maxDeduction: string;
  summary: string;
  whoCanUse: string;
  examples: string[];
  documents: string[];
  commonMistakes: string[];
}

export const TAX_SECTIONS: TaxSection[] = [
  {
    id: "80c",
    code: "80C",
    title: "Investments & Savings",
    category: "Investments",
    maxDeduction: "₹1,50,000",
    summary:
      "The most popular deduction. Covers EPF, PPF, ELSS mutual funds, life insurance premiums, NSC, tax-saver FDs, and your children's school tuition fees.",
    whoCanUse: "All individuals and HUFs in the Old Regime.",
    examples: [
      "Investing ₹1.5L in ELSS mutual funds.",
      "PPF contribution of ₹1.5L per year.",
      "Combining ₹60k EPF + ₹90k ELSS.",
    ],
    documents: ["Investment proofs", "Life insurance premium receipts", "School fee receipts"],
    commonMistakes: [
      "Forgetting to count EPF that is already deducted from salary.",
      "Investing more than ₹1.5L expecting more deduction — the cap is fixed.",
    ],
  },
  {
    id: "80d",
    code: "80D",
    title: "Health Insurance Premium",
    category: "Insurance",
    maxDeduction: "₹25,000 (+₹50,000 for senior parents)",
    summary:
      "Deduction for medical insurance premiums paid for self, spouse, children and parents. Higher limits if parents are senior citizens.",
    whoCanUse: "Any individual paying health insurance premiums.",
    examples: [
      "₹22,000 family floater premium.",
      "₹25,000 self + ₹50,000 senior parents = ₹75,000 total.",
    ],
    documents: ["Insurance premium receipts", "Health checkup bills (up to ₹5,000)"],
    commonMistakes: ["Claiming cash payments — only digital/cheque payments qualify."],
  },
  {
    id: "80ccd1b",
    code: "80CCD(1B)",
    title: "NPS Additional Contribution",
    category: "Retirement",
    maxDeduction: "₹50,000",
    summary:
      "An extra ₹50,000 deduction over and above Section 80C for contributions to the National Pension System (NPS) Tier 1 account.",
    whoCanUse: "All NPS subscribers.",
    examples: ["₹50,000 voluntary NPS contribution saves up to ₹15,600 in tax."],
    documents: ["NPS contribution statement / Transaction receipt"],
    commonMistakes: ["Confusing NPS Tier 1 with Tier 2 — only Tier 1 qualifies."],
  },
  {
    id: "24b",
    code: "24(b)",
    title: "Home Loan Interest",
    category: "Home Loan",
    maxDeduction: "₹2,00,000",
    summary:
      "Interest paid on a home loan for a self-occupied house is deductible up to ₹2 lakh per year.",
    whoCanUse: "Anyone repaying a home loan for a residential property.",
    examples: ["₹1.9L interest on an ₹40L loan."],
    documents: ["Home loan interest certificate from your bank"],
    commonMistakes: [
      "Claiming principal here — principal goes under 80C.",
      "Missing pre-construction interest spread over 5 years.",
    ],
  },
  {
    id: "hra",
    code: "HRA",
    title: "House Rent Allowance",
    category: "Salary",
    maxDeduction: "Conditional",
    summary:
      "Tax-free portion of HRA is the least of: actual HRA received, rent paid minus 10% of basic salary, or 50% of basic salary (metro) / 40% (non-metro).",
    whoCanUse: "Salaried employees living in rented accommodation.",
    examples: ["Basic ₹6L, HRA ₹2.4L, rent ₹2.4L in Bengaluru → exempt ₹1.8L."],
    documents: ["Rent receipts", "Rental agreement", "Landlord PAN (if rent > ₹1L/year)"],
    commonMistakes: ["Claiming HRA while not actually paying rent — strict scrutiny."],
  },
  {
    id: "lta",
    code: "LTA",
    title: "Leave Travel Allowance",
    category: "Salary",
    maxDeduction: "Actual travel cost",
    summary:
      "Reimbursement for travel within India is tax-free up to twice in a block of 4 calendar years.",
    whoCanUse: "Salaried employees with LTA in their CTC.",
    examples: ["₹40,000 flight tickets for a family vacation to Manali."],
    documents: ["Boarding passes", "Tickets", "Travel invoices"],
    commonMistakes: ["Claiming international travel — only domestic qualifies."],
  },
  {
    id: "80e",
    code: "80E",
    title: "Education Loan Interest",
    category: "Education",
    maxDeduction: "Full interest, 8 years",
    summary:
      "Interest on education loans for higher studies of self, spouse, or children is fully deductible for up to 8 years.",
    whoCanUse: "Anyone repaying an education loan from a recognised institution.",
    examples: ["₹85,000 annual interest on a study-abroad loan."],
    documents: ["Loan interest certificate from lender"],
    commonMistakes: ["Claiming principal — only the interest qualifies."],
  },
  {
    id: "std",
    code: "Standard",
    title: "Standard Deduction",
    category: "Salary",
    maxDeduction: "₹50,000 (Old) / ₹75,000 (New)",
    summary:
      "A flat deduction applied automatically to salaried income. ₹50,000 in the Old Regime and ₹75,000 in the New Regime.",
    whoCanUse: "All salaried individuals and pensioners.",
    examples: ["Salaried employee earning ₹15L gets ₹75k off the top in the New Regime."],
    documents: ["None — applied automatically"],
    commonMistakes: ["Forgetting the higher ₹75k limit applies to the New Regime."],
  },
  {
    id: "87a",
    code: "87A",
    title: "Rebate for Small Taxpayers",
    category: "Savings",
    maxDeduction: "Up to ₹60,000 (New)",
    summary:
      "If taxable income is below the threshold, the entire tax liability is rebated. ₹12,500 cap (Old, ≤ ₹5L) or ₹60,000 cap (New, ≤ ₹12L).",
    whoCanUse: "Resident individuals only.",
    examples: ["₹11L salary in New Regime → ₹0 tax after rebate."],
    documents: ["None — applied automatically"],
    commonMistakes: ["Assuming the rebate applies to NRIs or HUFs."],
  },
];

export interface LearnArticle {
  id: string;
  title: string;
  blurb: string;
  emoji: string;
  readMin: number;
  body: string;
  takeaways: string[];
  faqs: Array<{ q: string; a: string }>;
}

export const LEARN_ARTICLES: LearnArticle[] = [
  {
    id: "tax-slabs",
    title: "Understanding Tax Slabs",
    blurb: "How India taxes your income in chunks, not all at once.",
    emoji: "🪜",
    readMin: 3,
    body:
      "Indian income tax is progressive. Your income is split into slabs, and each slab has its own rate. For example in the New Regime FY 2025-26, the first ₹4L is tax-free, the next ₹4L is taxed at 5%, and so on. Your effective tax rate is almost always lower than your highest slab rate.",
    takeaways: [
      "Each slab is taxed at its own rate, not your whole income.",
      "A pay raise never reduces your take-home — only the increment is taxed higher.",
      "Rebate under 87A can make your tax zero up to ₹12L in the New Regime.",
    ],
    faqs: [
      { q: "If I earn ₹12L in the New Regime, do I pay ₹0?", a: "Yes — after the 87A rebate the net tax is zero for taxable income up to ₹12L." },
      { q: "Are slabs the same in both regimes?", a: "No. The Old Regime has 4 slabs starting at ₹2.5L. The New Regime has 7 slabs starting at ₹4L." },
    ],
  },
  {
    id: "old-vs-new",
    title: "Old vs New Regime",
    blurb: "Which one saves you more — and why it depends on deductions.",
    emoji: "⚖️",
    readMin: 4,
    body:
      "The Old Regime has higher rates but lets you claim deductions like 80C, HRA, home loan interest, and NPS. The New Regime has lower rates and a higher standard deduction, but almost no other deductions. Salaried IT employees with a home loan and full 80C usage often save more in the Old Regime; people with simpler finances usually win in the New Regime.",
    takeaways: [
      "New Regime is the default since FY 2023-24.",
      "Old Regime helps if your deductions exceed roughly ₹3.75L.",
      "You can switch every year if you have only salary income.",
    ],
    faqs: [
      { q: "Can I switch every year?", a: "Yes, salaried individuals can switch between regimes each financial year while filing their ITR." },
    ],
  },
  {
    id: "form-16",
    title: "What is Form 16?",
    blurb: "Your employer's tax statement, explained.",
    emoji: "📄",
    readMin: 2,
    body:
      "Form 16 is a TDS certificate issued by your employer summarising your salary, deductions claimed, and tax deducted at source for a financial year. It has two parts — Part A (TDS summary) and Part B (salary breakup). You use it when filing your ITR.",
    takeaways: ["Issued by your employer by 15th June.", "Verify against your AIS before filing."],
    faqs: [{ q: "What if I change jobs?", a: "You'll get a Form 16 from each employer for the period you worked there." }],
  },
  {
    id: "tds",
    title: "What is TDS?",
    blurb: "Tax Deducted at Source, the pay-as-you-earn system.",
    emoji: "✂️",
    readMin: 2,
    body:
      "TDS is tax deducted by the payer (employer, bank, client) before paying you. It's adjusted against your final tax liability when you file your ITR. If too much was deducted, you get a refund.",
    takeaways: ["TDS isn't extra tax — it's an advance.", "Check your 26AS to see all TDS credited."],
    faqs: [{ q: "How do I claim TDS refund?", a: "File your ITR — refunds are credited to your bank account in a few weeks." }],
  },
  {
    id: "ais",
    title: "What is AIS?",
    blurb: "Annual Information Statement — what the tax department already knows.",
    emoji: "🔍",
    readMin: 2,
    body:
      "The AIS is a comprehensive view of all your financial transactions reported to the Income Tax Department — salary, interest, dividends, mutual fund sales, property purchases and more. Always cross-check it before filing.",
    takeaways: ["Available on the IT portal.", "Mismatches trigger notices — fix them early."],
    faqs: [{ q: "Where do I find it?", a: "Log in to incometax.gov.in and open the AIS section." }],
  },
  {
    id: "rebate",
    title: "What is Rebate (87A)?",
    blurb: "How low-income taxpayers pay zero tax.",
    emoji: "🎁",
    readMin: 2,
    body:
      "Section 87A gives a direct rebate against your tax bill if your taxable income is under a threshold — up to ₹12,500 in the Old Regime (income ≤ ₹5L) or ₹60,000 in the New Regime (income ≤ ₹12L).",
    takeaways: ["Applied automatically.", "Doesn't apply to NRIs."],
    faqs: [{ q: "Does the rebate cover cess?", a: "Cess is calculated after the rebate, so if the rebate makes tax zero, cess is also zero." }],
  },
  {
    id: "surcharge",
    title: "What is Surcharge?",
    blurb: "An extra tax on the very high-income.",
    emoji: "📈",
    readMin: 2,
    body:
      "Surcharge is an additional percentage charged on your tax (not income) when your income crosses certain thresholds — 10% above ₹50L, 15% above ₹1Cr, and so on. The New Regime caps surcharge at 25%.",
    takeaways: ["It's a tax on tax.", "Only kicks in above ₹50L taxable income."],
    faqs: [],
  },
  {
    id: "how-it-works",
    title: "How Income Tax Works",
    blurb: "The full picture, in one read.",
    emoji: "🧮",
    readMin: 4,
    body:
      "Add up your income → subtract deductions → apply slab rates → subtract 87A rebate → add surcharge if applicable → add 4% cess → that's your net tax. TDS already paid is then deducted to give your balance payable or refundable.",
    takeaways: ["Five steps, every time.", "Deductions only help in the Old Regime (mostly)."],
    faqs: [],
  },
  {
    id: "it-tax-planning",
    title: "Tax Planning for IT Employees",
    blurb: "Practical moves specifically for tech salaries.",
    emoji: "💻",
    readMin: 4,
    body:
      "IT employees typically have high CTCs split into base, HRA, bonus and variable pay. Max your EPF + ELSS for 80C, claim HRA if you rent, add ₹50k NPS for 80CCD(1B), and use health insurance for 80D. With a home loan, the Old Regime often wins. ESOPs and RSUs are taxed as salary on vesting — set aside cash for the tax.",
    takeaways: [
      "ELSS gives 80C + equity returns with a 3-year lock-in.",
      "₹50k NPS top-up is the easiest extra deduction nobody uses.",
      "Variable pay can push you into the next slab — plan investments before March.",
    ],
    faqs: [
      { q: "Are RSUs taxed twice?", a: "On vesting they're salary income. On sale they're capital gains on the appreciation." },
    ],
  },
];

export const TAX_CALENDAR = [
  { date: "Jun 15", year: "2025", title: "Advance Tax — 1st Installment", note: "15% of annual tax due" },
  { date: "Jun 15", year: "2025", title: "Form 16 Released", note: "Collect from your employer" },
  { date: "Jul 31", year: "2025", title: "ITR Filing Deadline", note: "For salaried individuals" },
  { date: "Sep 15", year: "2025", title: "Advance Tax — 2nd Installment", note: "45% of annual tax due" },
  { date: "Dec 15", year: "2025", title: "Advance Tax — 3rd Installment", note: "75% of annual tax due" },
  { date: "Jan 31", year: "2026", title: "Investment Declaration", note: "Submit proofs to HR" },
  { date: "Mar 15", year: "2026", title: "Advance Tax — Final", note: "100% of annual tax due" },
  { date: "Mar 31", year: "2026", title: "Investment Cutoff", note: "Last day for 80C / 80D investments" },
];

export const DAILY_TIPS = [
  "You can save up to ₹46,800 in taxes by maximising Section 80C.",
  "₹50,000 in NPS under 80CCD(1B) is over and above your 80C limit.",
  "Health insurance for senior-citizen parents gives you an extra ₹50,000 deduction.",
  "Pre-construction home loan interest can be claimed across 5 years.",
  "Standard deduction in the New Regime is ₹75,000 — automatic.",
];