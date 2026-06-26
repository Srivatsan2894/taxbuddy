export default function Academy() {
  const lessons = [
    { title: 'Income Tax Basics', desc: 'Understanding Indian income tax system' },
    { title: 'Old vs New Regime', desc: 'Comparing both tax regimes' },
    { title: 'Section 80C', desc: 'Investment-linked deductions' },
    { title: 'HRA & DA', desc: 'House Rent & Dearness Allowance' },
    { title: 'Tax Planning Tips', desc: 'Strategies to minimize tax' },
    { title: 'TDS & Form 26AS', desc: 'Understanding TDS system' }
  ]

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ color: '#6200EA', marginBottom: '2rem' }}>Tax Academy</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {lessons.map((lesson, i) => (
          <div key={i} style={{ border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px' }}>
            <h3 style={{ color: '#6200EA' }}>{lesson.title}</h3>
            <p style={{ color: '#666', marginTop: '0.5rem' }}>{lesson.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
