import { FileText, BarChart3, Cog } from 'lucide-react'

const useCases = [
    { icon: FileText, title: 'Document Intelligence', desc: 'AI-powered extraction and processing from any document format.' },
    { icon: BarChart3, title: 'Predictive Analytics', desc: 'Transform raw data into forecasts, risk scores, and dashboards.' },
    { icon: Cog, title: 'Process Automation', desc: 'Intelligent RPA that learns, adapts, and scales across departments.' },
]

export default function UseCases() {
    return (
        <section style={{ padding: '48px 32px', background: 'var(--bg-alt)' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                    {useCases.map((uc, i) => (
                        <div key={i} className="card" style={{ padding: '24px', display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                            <div style={{
                                width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                background: 'var(--teal-light)', color: 'var(--teal)'
                            }}>
                                <uc.icon style={{ width: '20px', height: '20px' }} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                                    {uc.title}
                                </h3>
                                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                                    {uc.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
