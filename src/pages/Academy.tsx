import { useState } from 'react'

interface Lesson {
  id: string
  title: string
  icon: string
  description: string
  content: string
}

const lessons: Lesson[] = [
  {
    id: 'ctc',
    title: 'Understanding CTC',
    icon: '💼',
    description: 'What is CTC and how is it calculated?',
    content: `CTC (Cost to Company) is the total annual cost incurred by an employer for an employee.

Components:
• Basic Salary - Fixed monthly salary
• Dearness Allowance (DA) - Inflation adjustment
• House Rent Allowance (HRA) - Housing support
• Medical & Special Allowances
• PF & Insurance - Employee benefits
• Gratuity - Retirement benefits

Formula: CTC = Gross Salary + Benefits + Employer PF + Gratuity

Note: CTC is NOT your take-home salary. Your actual salary is much lower after deductions.`
  },
  {
    id: 'gross',
    title: 'Gross Salary vs Net Salary',
    icon: '📊',
    description: 'Difference between gross and net salary',
    content: `Gross Salary = Basic + DA + Allowances (before any deductions)

Deductions:
• Income Tax - Based on income slab
• Employee PF - 12% of basic (max ₹1,80,000/year)
• Professional Tax - State-specific
• Health Insurance Premium

Net Salary = Gross Salary - All Deductions

Example:
Gross Salary: ₹5,00,000/year
Income Tax: ₹50,000
Employee PF: ₹60,000
Professional Tax: ₹2,500
Net Salary: ₹3,87,500/year`
  },
  {
    id: 'section80c',
    title: 'Section 80C Deductions',
    icon: '🏦',
    description: 'How to save taxes with 80C deductions',
    content: `Section 80C allows you to deduct investments up to ₹1,50,000/year from your income.

Eligible Investments:
• EPF (Employee Provident Fund) - Mandatory 12%
• PPF (Public Provident Fund) - Up to ₹1,50,000
• ELSS (Equity Linked Saving Scheme) - Tax-saving mutual funds
• Life Insurance Premiums - LIC and other insurers
• Home Loan Principal Repayment
• NSC (National Savings Certificate)
• sukanya Samriddhi Yojana

Advantage:
If your income is ₹10,00,000 and 80C deductions are ₹1,50,000:
Tax is calculated on ₹8,50,000 instead of ₹10,00,000
This saves significant tax!`
  },
  {
    id: 'section80d',
    title: 'Health Insurance (80D)',
    icon: '🏥',
    description: 'Tax benefits from health insurance',
    content: `Section 80D allows deduction for health insurance premiums paid for yourself and family.

Deduction Limits:
• Self + Family (not senior citizens): Up to ₹25,000/year
• Senior Citizen (60+ years): Up to ₹25,000/year
• Parents (not senior citizens): Up to ₹25,000/year
• Parents (senior citizens): Up to ₹50,000/year
• Maximum total: ₹2,50,000/year

Eligible:
• Medical insurance from authorized insurers
• Critical illness policies
• Preventive health check-up: Up to ₹5,000 additional

Pro Tip:
Always buy health insurance under Section 80D. It provides tax benefits + health coverage!`
  },
  {
    id: 'old_vs_new',
    title: 'Old vs New Tax Regime',
    icon: '⚖️',
    description: 'Choosing the right tax regime',
    content: `Two tax regimes available from FY 2020-21:

OLD REGIME:
• Allows various deductions (80C, 80D, 80E, etc.)
• Best if you have substantial investments
• Complex calculations
• Lower tax slabs for lower income
• More paperwork

NEW REGIME:
• Only standard deduction of ₹75,000
• Lower tax slabs overall
• Simpler filing
• No need to maintain investment records
• Better for high earners with few deductions

Who should choose which:
Old Regime: If 80C deductions > ₹50,000
New Regime: If minimal deductions or for simplicity

Use TaxBuddy to compare both and choose wisely!`
  },
  {
    id: 'nps',
    title: 'NPS Contributions',
    icon: '📈',
    description: 'National Pension Scheme tax benefits',
    content: `NPS (National Pension Scheme) provides both tax benefits and retirement corpus.

Tax Deductions:
• Under 80C: Up to ₹1,50,000/year (includes EPF, PPF, ELSS, etc.)
• Under 80CCD(1b): Additional ₹50,000/year (only NPS)
• Total NPS limit: ₹2,00,000/year possible

How NPS Works:
1. Contribute monthly or yearly
2. Get tax deduction up to ₹2,00,000/year
3. Money grows tax-free
4. At retirement (60 years), withdraw tax-free corpus
5. Balance converted to annuity for pension

Advantages:
• Dual tax benefit (contribution + growth)
• Forced long-term savings
• Low cost mutual fund approach
• Flexibility in fund choice

Example:
Age 30, contribute ₹50,000/year
By age 60: Corpus could be ₹1,00,00,000+ (at 10% returns)`
  },
]

export default function Academy() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ color: '#6200EA', marginBottom: '0.5rem' }}>Tax Academy</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>Learn about Indian tax system and maximize your tax savings</p>

      {selectedLesson ? (
        <div>
          <button
            onClick={() => setSelectedLesson(null)}
            style={{
              padding: '0.5rem 1rem',
              background: '#666',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginBottom: '1rem'
            }}
          >
            ← Back to Lessons
          </button>
          <div style={{
            background: '#f9f9f9',
            padding: '2rem',
            borderRadius: '8px',
            border: '1px solid #eee'
          }}>
            <h2 style={{ color: '#6200EA', marginBottom: '0.5rem' }}>
              {selectedLesson.icon} {selectedLesson.title}
            </h2>
            <p style={{
              whiteSpace: 'pre-wrap',
              color: '#666',
              lineHeight: '1.8',
              fontFamily: 'monospace'
            }}>
              {selectedLesson.content}
            </p>
          </div>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1.5rem'
        }}>
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              onClick={() => setSelectedLesson(lesson)}
              style={{
                background: '#f9f9f9',
                border: '1px solid #ddd',
                padding: '1.5rem',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                {lesson.icon}
              </div>
              <h3 style={{ color: '#6200EA', marginBottom: '0.5rem' }}>
                {lesson.title}
              </h3>
              <p style={{ color: '#666', fontSize: '0.95rem' }}>
                {lesson.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
