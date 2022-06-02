import { number, z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

const headSchema = z.object({
  tag: z.string(),
  title: z.string(),
  nickname: z.string()
})

const deleteHeadSchema = z.object({
  id: number()
})

const updateHeadSchema = z.object({
  id: z.number(),
  title: z.string(),
  nickname: z.string(),
  tag: z.string()
})

export const { schemas, $ref } = buildJsonSchemas({
  headSchema,
  deleteHeadSchema,
  updateHeadSchema
})
