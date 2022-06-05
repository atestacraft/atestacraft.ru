import { rcon } from '../../../utils/rcon.js'
import { prisma } from '../../../utils/prisma.js'
import type { Player } from '@prisma/client'

interface AddSessionOpts {
  nickname: string
  code: number
  ip_address: string
}

export async function getToken(nickname: string): Promise<number> {
  const response = await rcon.send(`scoreboard players get ${nickname} login`)
  const token = Number(response.split(' ')[2])
  return token
}

export async function addSession(
  { nickname, code, ip_address }: AddSessionOpts
): Promise<Player> {
  return await prisma.player.upsert({
    where: {
      nickname
    },
    create: {
      nickname
    },
    update: {
      sessions: {
        create: {
          code,
          ip_address
        }
      }
    }
  })
}
