// Componente de logo tipográfica oficial da Solar América
// Fiel à logo original: "Solar América" (bold arredondado) + "TRANSFORMADORES" (espaced caps)
// Versão com cores: preto no header branco, branco no footer escuro

interface SolarAmericaLogoProps {
  variant?: 'dark' | 'light'   // dark = texto escuro (para fundos brancos), light = texto branco (para fundos escuros)
  className?: string
}

export function SolarAmericaLogo({ variant = 'dark', className = '' }: SolarAmericaLogoProps) {
  const primaryColor  = variant === 'dark' ? '#0A1628' : '#FFFFFF'
  const accentColor   = variant === 'dark' ? '#1B84FE' : '#1B84FE'
  const subtitleColor = variant === 'dark' ? '#4B5563' : 'rgba(255,255,255,0.55)'

  return (
    <svg
      viewBox="0 0 220 52"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Solar América Transformadores"
      className={className}
      style={{ display: 'block' }}
    >
      {/* "Solar" — peso bold, fonte geométrica arredondada */}
      <text
        x="0"
        y="34"
        fontFamily="'Poppins', 'Montserrat', Arial, sans-serif"
        fontWeight="700"
        fontSize="32"
        letterSpacing="-0.5"
        fill={primaryColor}
      >
        Solar{' '}
      </text>
      {/* "América" — mesmo peso, cor de destaque azul */}
      <text
        x="92"
        y="34"
        fontFamily="'Poppins', 'Montserrat', Arial, sans-serif"
        fontWeight="700"
        fontSize="32"
        letterSpacing="-0.5"
        fill={accentColor}
      >
        América
      </text>
      {/* "TRANSFORMADORES" — ultrafino, spaced caps */}
      <text
        x="1"
        y="48"
        fontFamily="'Montserrat', 'Poppins', Arial, sans-serif"
        fontWeight="400"
        fontSize="8.5"
        letterSpacing="3.5"
        fill={subtitleColor}
      >
        TRANSFORMADORES
      </text>
    </svg>
  )
}
