import {
  deleteHandler,
  getHandler,
  patchHandler,
  postHandler
} from './heads.controller.js'
import { schemas, $ref } from './heads.schema.js'
import type { FastifyInstance, FastifyPluginAsync } from 'fastify'

const heads: FastifyPluginAsync = async (fastify: FastifyInstance): Promise<void> => {
  fastify.get(
    '/',
    getHandler
  )

  fastify.post(
    '/',
    {
      schema: {
        body: $ref('headSchema')
      }
    },
    postHandler
  )

  fastify.patch(
    '/',
    {
      schema: {
        body: $ref('updateHeadSchema')
      }
    },
    patchHandler
  )

  fastify.delete(
    '/:id',
    {
      schema: {
        params: $ref('deleteHeadSchema')
      }
    },
    deleteHandler
  )

  fastify.addSchemas(schemas)
}

export default heads
