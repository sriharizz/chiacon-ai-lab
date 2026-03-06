import { useState, useEffect } from 'react'

const steps = [
    'Analyzing business challenge...',
    'Building strategic roadmap...',
    'Calculating business impact...',
    'Preparing executive summary...',
]

export default function LoadingSkeleton() {
    const [stepIndex, setStepIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setStepIndex(prev => (prev < steps.length - 1 ? prev + 1 : prev))
        }, 2000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '4px' }}>
            {/* Progress steps */}
            <div style={{
                padding: '16px 18px', borderRadius: '10px',
                background: 'linear-gradient(135deg, rgba(17,179,165,0.06), rgba(99,102,241,0.04))',
                border: '1px solid var(--border)'
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {steps.map((step, i) => (
                        <div key={i} style={{
                            display: 'flex', alignItems: 'center', gap: '10px',
                            opacity: i <= stepIndex ? 1 : 0.3,
                            transition: 'opacity 0.5s ease'
                        }}>
                            <div style={{
                                width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '10px', fontWeight: 700, color: 'white',
                                background: i < stepIndex ? 'var(--green)' : i === stepIndex ? 'var(--teal)' : 'var(--border)',
                                transition: 'background 0.3s ease'
                            }}>
                                {i < stepIndex ? '✓' : i + 1}
                            </div>
                            <span style={{
                                fontSize: '12px', fontWeight: i === stepIndex ? 600 : 400,
                                color: i <= stepIndex ? 'var(--text-heading)' : 'var(--text-muted)'
                            }}>
                                {step}
                            </span>
                            {i === stepIndex && (
                                <div style={{
                                    width: '12px', height: '12px', border: '2px solid var(--teal)',
                                    borderTopColor: 'transparent', borderRadius: '50%',
                                    animation: 'spin 0.8s linear infinite'
                                }} />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Skeleton cards */}
            <div className="card accent-left" style={{ padding: '16px' }}>
                <div className="shimmer" style={{ height: '12px', width: '140px', marginBottom: '10px' }} />
                <div className="shimmer" style={{ height: '10px', width: '100%', marginBottom: '5px' }} />
                <div className="shimmer" style={{ height: '10px', width: '75%' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {[1, 2, 3].map(i => (
                    <div key={i} className="card" style={{ padding: '14px' }}>
                        <div className="shimmer" style={{ height: '10px', width: '50%', marginBottom: '8px' }} />
                        <div className="shimmer" style={{ height: '8px', width: '100%', marginBottom: '4px' }} />
                        <div className="shimmer" style={{ height: '8px', width: '80%' }} />
                    </div>
                ))}
            </div>
        </div>
    )
}
