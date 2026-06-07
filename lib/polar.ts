export async function verifyCheckoutSession(
  checkoutId: string
): Promise<{ paid: boolean; email: string | null }> {
  try {
    const res = await fetch(
      `https://api.polar.sh/v1/checkouts/${checkoutId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.POLAR_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!res.ok) return { paid: false, email: null }

    const data = await res.json()

    const paid = data.status === 'confirmed' ||
                 data.status === 'succeeded'
    const email = data.customer_email ?? null

    return { paid, email }
  } catch {
    return { paid: false, email: null }
  }
}
