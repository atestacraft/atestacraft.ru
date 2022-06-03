import { PrismaClient } from '@prisma/client'
import type { Player } from '@prisma/client'

const players: Player[] = [
  {
    nickname: 'crashmax',
    admin: true
  }
]

const prisma = new PrismaClient()

async function main() {
  for (const player of players) {
    await prisma.player.create({
      data: player
    })
  }
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
