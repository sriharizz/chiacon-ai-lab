import { Cpu } from 'lucide-react'

export default function Navbar() {
    return (
        <nav style={{
            position: 'sticky', top: 0, zIndex: 50,
            background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)',
            borderBottom: '1px solid var(--border)'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                        width: '36px', height: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'var(--teal)', color: 'white'
                    }}>
                        <Cpu style={{ width: '20px', height: '20px' }} />
                    </div>
                    <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--navy)', letterSpacing: '0.05em' }}>
                        CHIACON
                    </span>
                    <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--teal)', background: 'var(--teal-light)', padding: '2px 8px', borderRadius: '4px' }}>
                        AI LAB
                    </span>
                </div>
                <a href="#demo" className="btn-primary" style={{ padding: '8px 20px', fontSize: '13px' }}>
                    Try AI Demo →
                </a>
            </div>
        </nav>
    )
}
