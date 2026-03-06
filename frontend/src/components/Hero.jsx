export default function Hero() {
    return (
        <section style={{ background: 'var(--navy)', padding: '56px 32px', textAlign: 'center' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <p style={{ color: 'var(--teal)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '16px' }}>
                    Chiacon Consulting · AI Division
                </p>
                <h1 style={{ color: '#ffffff', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, lineHeight: 1.2, marginBottom: '16px' }}>
                    Intelligent Automation. <span style={{ color: 'var(--teal)' }}>Strategic AI.</span>
                    <br />Real Business Impact.
                </h1>
                <p style={{ color: '#b0bec5', fontSize: '15px', lineHeight: 1.6, maxWidth: '560px', margin: '0 auto' }}>
                    We help enterprises transform operations with AI-driven analytics,
                    robotic process automation, and intelligent quality assurance.
                </p>
            </div>
        </section>
    )
}
