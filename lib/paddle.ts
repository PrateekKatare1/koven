import { Environment, Paddle } from '@paddle/paddle-node-sdk'

export const paddle = new Paddle(process.env.PADDLE_API_KEY!, {
  environment: Environment.Production
})

export const PRICES = {
  earlyBird: process.env.NEXT_PUBLIC_PADDLE_EARLY_BIRD_PRICE_ID!,
  builderPack: process.env.NEXT_PUBLIC_PADDLE_BUILDER_PACK_PRICE_ID!,
}
