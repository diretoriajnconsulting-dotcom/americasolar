/**
 * 🛠️  PÁGINA DE DEV — PREVIEW DOS SVGs
 * Acesse em: http://localhost:3000/dev-preview
 * Remova esta pasta antes do deploy em produção.
 */

const SVGS = [
  { file: '/casos/solar_1.svg',  label: 'solar_1' },
  { file: '/casos/solar_2.svg',  label: 'solar_2' },
  { file: '/casos/solar_3.svg',  label: 'solar_3' },
  { file: '/casos/solar_5.svg',  label: 'solar_5' },
  { file: '/casos/solar_6.svg',  label: 'solar_6' },
  { file: '/casos/solar_9.svg',  label: 'solar_9' },
  { file: '/casos/slide_a.svg',  label: 'slide_a (file.svg)' },
  { file: '/casos/slide_b.svg',  label: 'slide_b (file 1.svg)' },
  { file: '/casos/slide_c.svg',  label: 'slide_c (file 2.svg)' },
]

export default function DevPreview() {
  return (
    <div style={{ background: '#111', minHeight: '100vh', padding: '2rem', fontFamily: 'monospace' }}>
      <h1 style={{ color: '#ffce00', marginBottom: '2rem', fontSize: '1.2rem' }}>
        🛠 SVG Preview — mapeie qual arquivo é qual produto
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
        {SVGS.map(({ file, label }) => (
          <div key={file} style={{ background: '#1a1a2e', borderRadius: '12px', overflow: 'hidden', border: '1px solid #333' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={file}
              alt={label}
              style={{ width: '100%', height: '200px', objectFit: 'cover', background: '#fff' }}
            />
            <p style={{ color: '#ffce00', padding: '0.75rem', margin: 0, fontSize: '0.75rem' }}>
              {label}
            </p>
            <p style={{ color: '#666', padding: '0 0.75rem 0.75rem', margin: 0, fontSize: '0.65rem' }}>
              {file}
            </p>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '2rem', color: '#666', fontSize: '0.75rem', borderTop: '1px solid #333', paddingTop: '1rem' }}>
        ⚠️ Remova a pasta <code style={{ color: '#f87171' }}>src/app/dev-preview</code> antes do deploy em produção.
      </div>
    </div>
  )
}