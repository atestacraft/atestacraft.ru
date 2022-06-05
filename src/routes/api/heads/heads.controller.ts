import {
  getHeads,
  getUniqueHead,
  deleteHead,
  updateHead,
  createHead
} from './heads.service.js'
import type { Head } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'

export type HeadBody = {
  Body: Omit<Head, 'created_at' | 'updated_at'>
}

export type HeadParams = {
  Params: {
    nickname: Head['nickname']
  }
}

export async function getAllHandsHandler() {
  return await getHeads()
}

export async function getHeadHandler(
  request: FastifyRequest<HeadParams>,
  reply: FastifyReply
) {
  const { nickname } = request.params
  const head = await getUniqueHead(nickname)

  if (!head) {
    return reply.notFound()
  } else {
    return head
  }
}

export async function createOrUpdateHeadHandler(
  request: FastifyRequest<HeadParams & HeadBody>,
  reply: FastifyReply
) {
  const { body } = request
  const { nickname } = request.params

  if (nickname) {
    console.log(body, nickname)
    return await updateHead(body, nickname)
  } else {
    return await createHead(body)
  }
}

export async function deleteHeadHandler(
  request: FastifyRequest<HeadParams>,
  reply: FastifyReply
) {
  return await deleteHead(request.params.nickname)
}
