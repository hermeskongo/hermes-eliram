const common = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export default function ServiceIcon({ index, className = '' }) {
  switch (index) {
    case 0: // Web
      return (
        <svg viewBox="0 0 48 48" className={className} {...common} aria-hidden="true">
          <rect x="6" y="9" width="36" height="30" rx="3" />
          <line x1="6" y1="17" x2="42" y2="17" />
          <circle cx="11" cy="13" r="1" />
          <circle cx="15" cy="13" r="1" />
          <path d="M18 26h12M18 31h8M34 24l4 3-4 3" />
        </svg>
      )
    case 1: // Mobile
      return (
        <svg viewBox="0 0 48 48" className={className} {...common} aria-hidden="true">
          <rect x="15" y="5" width="18" height="38" rx="4" />
          <line x1="21" y1="9" x2="27" y2="9" />
          <line x1="22" y1="38" x2="26" y2="38" />
          <path d="M20 20h8M20 25h5" />
        </svg>
      )
    case 2: // Back-end
      return (
        <svg viewBox="0 0 48 48" className={className} {...common} aria-hidden="true">
          <rect x="8" y="8" width="32" height="10" rx="2" />
          <rect x="8" y="20" width="32" height="10" rx="2" />
          <rect x="8" y="32" width="32" height="8" rx="2" />
          <circle cx="14" cy="13" r="1.1" />
          <circle cx="14" cy="25" r="1.1" />
          <path d="M31 13h4M31 25h4" />
        </svg>
      )
    default: // Architecture
      return (
        <svg viewBox="0 0 48 48" className={className} {...common} aria-hidden="true">
          <circle cx="24" cy="10" r="4" />
          <circle cx="11" cy="34" r="4" />
          <circle cx="37" cy="34" r="4" />
          <path d="M22 13.5 13 30.5M26 13.5 35 30.5M15 34h18" />
        </svg>
      )
  }
}
