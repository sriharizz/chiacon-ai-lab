import { Lightbulb, Route, TrendingUp, AlertTriangle, Clock, Rocket, Building2 } from 'lucide-react'
import TypewriterText from './TypewriterText'

const phaseConfig = [
    { icon: Clock, color: '#059669', bg: '#ecfdf5' },
    { icon: Rocket, color: '#d97706', bg: '#fffbeb' },
    { icon: Building2, color: '#6366f1', bg: '#eef2ff' },
]

export default function ResultCards({ data }) {
    if (!data) return null

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingTop: '4px' }}>
            {/* Executive Synthesis */}
            <div className="card accent-left fade-in" style={{ padding: '18px 20px', animationDelay: '0s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                    <Lightbulb style={{ width: '15px', height: '15px', color: 'var(--teal-dark)' }} />
                    <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--teal-dark)' }}>Executive Synthesis</span>
                </div>
                <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-body)' }}>
                    <TypewriterText text={data.executive_synthesis} speed={8} />
                </p>
            </div>

            {/* Strategic Roadmap */}
            <div className="fade-in" style={{ animationDelay: '0.15s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                    <Route style={{ width: '15px', height: '15px', color: 'var(--teal-dark)' }} />
                    <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--teal-dark)' }}>Strategic Roadmap</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                    {data.strategic_roadmap.map((phase, i) => {
                        const c = phaseConfig[i] || phaseConfig[0]
                        const Icon = c.icon
                        return (
                            <div key={i} className="card fade-in" style={{
                                padding: '16px', borderTop: `3px solid ${c.color}`,
                                animationDelay: `${0.25 + i * 0.1}s`,
                                transition: 'transform 0.2s, box-shadow 0.2s',
                            }}
                                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.08)' }}
                                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '' }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px' }}>
                                    <Icon style={{ width: '13px', height: '13px', color: c.color }} />
                                    <span className="phase-badge" style={{ background: c.bg, color: c.color, fontSize: '11px' }}>{phase.phase}</span>
                                </div>
                                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '6px' }}>{phase.title}</h4>
                                <p style={{ fontSize: '13px', color: 'var(--text-body)', lineHeight: 1.55, marginBottom: '10px' }}>{phase.description}</p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                    {phase.key_technologies.map((t, j) => <span key={j} className="tech-tag" style={{ fontSize: '11px' }}>{t}</span>)}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Business Impact */}
            <div className="card fade-in" style={{ padding: '18px 20px', animationDelay: '0.55s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
                    <TrendingUp style={{ width: '15px', height: '15px', color: 'var(--teal-dark)' }} />
                    <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--teal-dark)' }}>Business Impact</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px' }}>
                            <TrendingUp style={{ width: '13px', height: '13px', color: 'var(--green)' }} />
                            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--green)' }}>ROI Metrics</span>
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '7px' }}>
                            {data.business_impact.roi_metrics.map((m, i) => (
                                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: 'var(--text-body)', lineHeight: 1.5 }}>
                                    <span style={{ marginTop: '7px', width: '5px', height: '5px', borderRadius: '50%', background: 'var(--green)', flexShrink: 0 }} />
                                    {m}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px' }}>
                            <AlertTriangle style={{ width: '13px', height: '13px', color: 'var(--amber)' }} />
                            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--amber)' }}>Cost of Inaction</span>
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '7px' }}>
                            {data.business_impact.cost_of_inaction.map((c, i) => (
                                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: 'var(--text-body)', lineHeight: 1.5 }}>
                                    <span style={{ marginTop: '7px', width: '5px', height: '5px', borderRadius: '50%', background: 'var(--amber)', flexShrink: 0 }} />
                                    {c}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
