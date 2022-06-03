import { prisma } from '../../../utils/prisma.js'
import type { Head } from '@prisma/client'

type Nickname = Head['nickname']
type HeadOpts = Pick<Head, 'nickname' | 'title' | 'tag'>

export async function getHeads(
  nickname?: Nickname
): Promise<Head[]> {
  return await prisma.head.findMany({
    where: {
      nickname
    }
  })
}

export async function createOrUpdateHead(
  opts: HeadOpts, whereNickname?: Nickname
): Promise<Head> {
  return await prisma.head.upsert({
    where: {
      nickname: whereNickname ?? opts.nickname
    },
    create: opts,
    update: {
      ...opts,
      updated_at: new Date()
    }
  })
}

export async function deleteHead(
  nickname: Nickname
): Promise<Head> {
  return await prisma.head.delete({
    where: {
      nickname
    }
  })
}
