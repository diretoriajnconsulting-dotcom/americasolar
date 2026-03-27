// Logo oficial Solar América — vetorizado fiel à identidade visual
// Símbolo: três elos ovais encadeados em S diagonal (dourado #F0A500)
// Tipografia: "Solar América" (navy bold) + "TRANSFORMADORES" (caps espaçado)
// Variantes: dark (fundo branco) | light (fundo escuro)

interface SolarAmericaLogoProps {
  variant?: 'dark' | 'light'
  className?: string
  showText?: boolean  // false = só o símbolo (favicon, ícone)
}

export function SolarAmericaLogo({
  variant = 'dark',
  className = '',
  showText = true,
}: SolarAmericaLogoProps) {
  const navyColor = variant === 'dark' ? '#0C1E3C' : '#FFFFFF'
  const subColor  = variant === 'dark' ? '#5A6478' : 'rgba(255,255,255,0.50)'
  const gold      = '#F0A500'

  if (!showText) {
    return (
      <svg viewBox="0 0 48 54" xmlns="http://www.w3.org/2000/svg"
        aria-label="Solar América" className={className} style={{ display: 'block' }}>
        <SolarSymbol gold={gold} />
      </svg>
    )
  }

  return (
    <svg
      viewBox="0 0 248 54"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Solar América Transformadores"
      className={className}
      style={{ display: 'block' }}
    >
      {/* ── Símbolo dourado (3 elos em S) ── */}
      <SolarSymbol gold={gold} />

      {/* ── "Solar América" ── */}
      <text x="60" y="35"
        fontFamily="'Poppins', Arial, sans-serif"
        fontWeight="700" fontSize="27" letterSpacing="-0.4"
        fill={navyColor}
      >
        Solar América
      </text>

      {/* ── "TRANSFORMADORES" ── */}
      <text x="61" y="50"
        fontFamily="'Montserrat', Arial, sans-serif"
        fontWeight="500" fontSize="7.8" letterSpacing="4.2"
        fill={subColor}
      >
        TRANSFORMADORES
      </text>
    </svg>
  )
}

// ─── Símbolo: 3 elos ovais em cadeia diagonal (fiel ao logo oficial) ────────
// fill-rule evenodd: onde 2 elos se sobrepõem → transparente (efeito corrente)
function SolarSymbol({ gold }: { gold: string }) {
  return (
    <g>
      {/* Camada de brilho/volume — elos maiores, mais opacos na borda */}
      <g fill={gold} opacity="0.22">
        <ellipse cx="13" cy="43" rx="14" ry="8.8" transform="rotate(-36 13 43)" />
        <ellipse cx="24" cy="27" rx="14" ry="8.8" transform="rotate(-36 24 27)" />
        <ellipse cx="35" cy="11" rx="14" ry="8.8" transform="rotate(-36 35 11)" />
      </g>

      {/* Elos principais — fill-rule evenodd cria "buracos" nas interseções */}
      <g fill={gold} fillRule="evenodd">
        <ellipse cx="13" cy="43" rx="12.8" ry="7.6" transform="rotate(-36 13 43)" />
        <ellipse cx="24" cy="27" rx="12.8" ry="7.6" transform="rotate(-36 24 27)" />
        <ellipse cx="35" cy="11" rx="12.8" ry="7.6" transform="rotate(-36 35 11)" />
      </g>

      {/* Anel interno — cria espessura/anilha em cada elo */}
      <g fill="none" stroke={gold} strokeWidth="2.4" opacity="0.28">
        <ellipse cx="13" cy="43" rx="8.4"  ry="4.6" transform="rotate(-36 13 43)" />
        <ellipse cx="24" cy="27" rx="8.4"  ry="4.6" transform="rotate(-36 24 27)" />
        <ellipse cx="35" cy="11" rx="8.4"  ry="4.6" transform="rotate(-36 35 11)" />
      </g>
    </g>
  )
}
