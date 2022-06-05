import { prisma } from '../../../utils/prisma.js'
import { Prisma } from '@prisma/client'
import type { Head } from '@prisma/client'

type Nickname = Head['nickname']
type HeadOpts = Pick<Head, 'nickname' | 'title' | 'tag'>

export async function getHeads(): Promise<Head[]> {
  return await prisma.head.findMany()
}

export async function getUniqueHead(
  nickname?: Nickname
): Promise<Head | null> {
  return await prisma.head.findUnique({
    where: {
      nickname
    }
  })
}

export async function updateHead(
  data: HeadOpts, nickname: Nickname
): Promise<Head> {
  return await prisma.head.update({
    where: {
      nickname
    },
    data
  })
}

export async function createHead(data: HeadOpts) {
  return await prisma.head.create({ data })
}

// @ts-ignore
export async function deleteHead(
  nickname: Nickname
) {
  try {
    return await prisma.head.delete({
      where: {
        nickname
      }
    })
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        throw 'There is a unique constraint violation, a new user cannot be created with this email'
      }
    }
  }
}
