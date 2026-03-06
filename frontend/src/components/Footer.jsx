export default function Footer() {
    return (
        <footer style={{ padding: '20px 32px', borderTop: '1px solid var(--border)', background: 'var(--bg-alt)' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--navy)', letterSpacing: '0.05em' }}>CHIACON</span>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Consulting</span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    © {new Date().getFullYear()} Chiacon. Pioneering IT Services for the Digital Era.
                </p>
            </div>
        </footer>
    )
}
