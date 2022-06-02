import { prisma } from '../../../utils/prisma.js'
import type { Prisma, Head } from '@prisma/client'

export async function getHeads(id?: Head['id']): Promise<Head[]> {
  return await prisma.head.findMany({
    where: {
      id
    }
  })
}

export async function createHead(head: Head): Promise<Head> {
  return await prisma.head.create({
    data: head
  })
}

export async function updateHead(head: Prisma.HeadCreateManyInput): Promise<Head> {
  return await prisma.head.update({
    where: {
      id: head.id
    },
    data: {
      ...head,
      updated_at: new Date()
    }
  })
}

export async function deleteHead(id: Head['id']): Promise<Head> {
  return await prisma.head.delete({
    where: {
      id
    }
  })
}
