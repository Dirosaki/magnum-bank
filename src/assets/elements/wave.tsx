interface WaveProps {
  className?: string
}

export function Wave({ className }: WaveProps) {
  return (
    <svg className={className} viewBox="0 0 48 48">
      <circle cx="24" cy="24" fill="currentColor" opacity="0.1" r="20" />
      <circle cx="24" cy="24" fill="currentColor" opacity="0.2" r="16" />
      <circle cx="24" cy="24" fill="currentColor" opacity="0.3" r="12" />
      <circle cx="24" cy="24" fill="currentColor" opacity="0.4" r="8" />
      <circle cx="24" cy="24" fill="currentColor" opacity="1" r="4" />
    </svg>
  )
}
