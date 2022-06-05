import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

export const { schemas, $ref } = buildJsonSchemas({ })
