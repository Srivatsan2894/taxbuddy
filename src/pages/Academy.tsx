export default function Academy() {
  const lessons = [
    { id: 1, title: 'Understanding Income Tax', desc: 'Learn the basics of Indian income tax system' },
    { id: 2, title: 'Old Regime vs New Regime', desc: 'Key differences and which is better for you' },
    { id: 3, title: 'Section 80C Deductions', desc: 'Maximize your tax-saving investments' },
    { id: 4, title: 'Health Insurance (80D)', desc: 'How to claim deductions on health insurance' },
    { id: 5, title: 'Home Loan Interest', desc: 'Reduce taxable income with home loan deductions' },
    { id: 6, title: 'Tax Planning Tips', desc: 'Strategies to minimize your tax burden' }
  ]

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ color: '#6200EA', marginBottom: '2rem' }}>Tax Academy</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {lessons.map((lesson) => (
          <div key={lesson.id} style={{ border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h3 style={{ color: '#6200EA', marginBottom: '0.5rem' }}>{lesson.title}</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>{lesson.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
