import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

const headSchema = z.object({
  nickname: z.string(),
  title: z.string(),
  tag: z.string()
})

const arrayHeadSchema = z.array(headSchema)

const deleteHeadSchema = z.object({
  nickname: z.string()
})

export const { schemas, $ref } = buildJsonSchemas({
  headSchema,
  arrayHeadSchema,
  deleteHeadSchema
})
