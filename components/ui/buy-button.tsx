'use client'

import { PRICES } from '@/lib/paddle'

interface BuyButtonProps {
  plan: 'earlyBird' | 'builderPack'
  label: string
  className?: string
}

export function BuyButton({ plan, label, className }: BuyButtonProps) {
  const handleClick = () => {
    const priceId = PRICES[plan]

    // @ts-ignore
    if (window.Paddle) {
      // @ts-ignore
      window.Paddle.Checkout.open({
        items: [{ priceId, quantity: 1 }],
      })
    }
  }

  return (
    <button
      onClick={handleClick}
      className={className}
    >
      {label}
    </button>
  )
}
