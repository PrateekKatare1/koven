'use client'

interface BuyButtonProps {
  plan: 'earlyBird' | 'builderPack'
  label: string
  className?: string
}

export function BuyButton({ plan, label, className }: BuyButtonProps) {
  const urls = {
    earlyBird: process.env.NEXT_PUBLIC_GUMROAD_EARLY_BIRD_URL!,
    builderPack: process.env.NEXT_PUBLIC_GUMROAD_BUILDER_PACK_URL!,
  }

  return (
    <a
      href={urls[plan]}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {label}
    </a>
  )
}
