import { useState } from 'react'
import { Send, Sparkles, Loader2 } from 'lucide-react'
import ResultCards from './ResultCards'
import LoadingSkeleton from './LoadingSkeleton'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const quickPrompts = [
    { label: 'FMCG company struggling with reporting', full: 'FMCG company struggling with reporting' },
    { label: 'Healthcare: 50K+ disconnected patient records', full: 'Healthcare chain managing 50,000+ patient records across 12 disconnected systems with no unified view' },
    { label: 'Finance: 200+ hrs/month on invoice checks', full: 'Financial services firm spending 200+ hours/month manually cross-checking vendor invoices against procurement contracts' },
]

export default function AiDemo() {
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(null)
    const [error, setError] = useState('')

    const handleSubmit = async (problemText) => {
        const problem = problemText || input
        if (!problem.trim()) return
        setLoading(true); setResult(null); setError('')
        try {
            const res = await fetch(`${API_URL}/api/generate`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ business_problem: problem }),
            })
            if (!res.ok) throw new Error(`Error: ${res.status}`)
            setResult(await res.json())
        } catch (err) {
            setError('Could not reach the AI service. Please try again.')
        } finally { setLoading(false) }
    }

    const handleQuickPrompt = (p) => { setInput(p.full); handleSubmit(p.full) }

    return (
        <section id="demo" style={{ padding: '48px 32px', background: 'var(--bg)' }}>
            <div style={{ maxWidth: '880px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '6px', background: 'var(--teal-light)', marginBottom: '12px' }}>
                        <Sparkles style={{ width: '13px', height: '13px', color: 'var(--teal)' }} />
                        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--teal)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Live AI Demo</span>
                    </div>
                    <h2 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                        AI Use Case Generator
                    </h2>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '440px', margin: '0 auto', lineHeight: 1.5 }}>
                        Describe a business challenge and get a strategic AI implementation roadmap instantly.
                    </p>
                </div>

                {/* Input */}
                <div className="card" style={{ padding: '24px', boxShadow: 'var(--shadow-lg)' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input
                            type="text" value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && !loading && handleSubmit()}
                            placeholder="e.g. FMCG company struggling with reporting..."
                            disabled={loading}
                            style={{
                                flex: 1, background: 'var(--bg-alt)', border: '1px solid var(--border)',
                                color: 'var(--text-primary)', padding: '12px 16px', borderRadius: '8px',
                                fontSize: '14px', outline: 'none', fontFamily: 'inherit',
                                transition: 'border-color 0.2s'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--teal)'}
                            onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                        />
                        <button onClick={() => handleSubmit()} disabled={loading || !input.trim()} className="btn-primary" style={{ fontSize: '14px', padding: '12px 22px' }}>
                            {loading ? <Loader2 style={{ width: '16px', height: '16px' }} className="animate-spin" /> : <Send style={{ width: '15px', height: '15px' }} />}
                            <span>{loading ? 'Analyzing...' : 'Analyze'}</span>
                        </button>
                    </div>

                    <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid var(--border)' }}>
                        <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Try an example</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {quickPrompts.map((p, i) => (
                                <button key={i} onClick={() => handleQuickPrompt(p)} disabled={loading} className="chip">{p.label}</button>
                            ))}
                        </div>
                    </div>
                </div>

                {error && (
                    <div style={{ marginTop: '16px', padding: '12px 16px', borderRadius: '8px', fontSize: '13px', background: '#fef2f2', border: '1px solid #fecaca', color: 'var(--red)' }}>
                        ⚠️ {error}
                    </div>
                )}

                {loading && <LoadingSkeleton />}
                <ResultCards data={result} />
            </div>
        </section>
    )
}
