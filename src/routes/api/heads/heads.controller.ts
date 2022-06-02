import {
  getHeads,
  createHead,
  updateHead,
  deleteHead
} from './heads.service.js'
import type { Head } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function getHandler(
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
): Promise<Head[]> {
  return await getHeads()
}

export async function postHandler(
  request: FastifyRequest<{ Body: Head }>,
  reply: FastifyReply
) {
  const { id } = request.body
  const head = await getHeads(id)

  if (head.length) {
    return reply.badRequest()
  } else {
    return await createHead(request.body)
  }
}

export async function patchHandler(
  request: FastifyRequest<{ Body: Head }>,
  reply: FastifyReply
) {
  const { id } = request.body
  const head = await getHeads(id)

  if (head.length) {
    return await updateHead(request.body)
  } else {
    return reply.notFound()
  }
}

export async function deleteHandler(
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) {
  const { id } = request.params
  const head = await getHeads(id)

  if (head.length) {
    return await deleteHead(id)
  } else {
    return reply.notFound()
  }
}
