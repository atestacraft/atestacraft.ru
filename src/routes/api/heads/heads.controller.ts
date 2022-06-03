import {
  getHeads,
  createOrUpdateHead,
  deleteHead
} from './heads.service.js'
import type { Head } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'

type HeadBody = {
  Body: Omit<Head, 'created_at' | 'updated_at'>
}

type HeadParams = {
  Params: {
    nickname: Head['nickname']
  }
}

export async function getHandler(
  request: FastifyRequest<HeadParams>,
  reply: FastifyReply
) {
  const { nickname } = request.params
  const heads = await getHeads(nickname ?? {})

  if (heads.length) {
    return heads
  }

  return reply.notFound()
}

export async function postHandler(
  request: FastifyRequest<HeadBody>,
  reply: FastifyReply
) {
  return await createOrUpdateHead(request.body)
}

export async function patchHandler(
  request: FastifyRequest<HeadParams & HeadBody>,
  reply: FastifyReply
) {
  return await createOrUpdateHead(request.body, request.params.nickname)
}

export async function deleteHandler(
  request: FastifyRequest<HeadParams>,
  reply: FastifyReply
) {
  console.log(request.params.nickname)
  return await deleteHead(request.params.nickname)
}
