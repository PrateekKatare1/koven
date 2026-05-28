'use client'

import { initializePaddle, Paddle } from '@paddle/paddle-js'
import { useEffect, useState } from 'react'

export function PaddleProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [paddle, setPaddle] = useState<Paddle | undefined>()

  useEffect(() => {
    initializePaddle({
      environment: 'production',
      token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!,
    }).then(setPaddle)
  }, [])

  return <>{children}</>
}

export function usePaddleCheckout() {
  const openCheckout = (priceId: string, email?: string) => {
    if (typeof window === 'undefined') return

    // @ts-ignore
    window.Paddle?.Checkout.open({
      items: [{ priceId, quantity: 1 }],
      customer: email ? { email } : undefined,
    })
  }

  return { openCheckout }
}
