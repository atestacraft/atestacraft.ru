import {
  getAllHandsHandler,
  getHeadHandler,
  createOrUpdateHeadHandler,
  deleteHeadHandler
} from './heads.controller.js'
import { schemas, $ref } from './heads.schema.js'
import type { FastifyInstance, FastifyPluginAsync } from 'fastify'

const heads: FastifyPluginAsync = async (fastify: FastifyInstance): Promise<void> => {
  fastify.route({
    url: '/',
    method: 'GET',
    schema: {
      response: {
        200: $ref('arrayHeadSchema')
      }
    },
    handler: getAllHandsHandler
  })

  fastify.route({
    url: '/:nickname',
    method: 'GET',
    schema: {
      response: {
        200: $ref('headSchema')
      }
    },
    handler: getHeadHandler
  })

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      body: $ref('headSchema')
    },
    // preHandler: [fastify.authenticate],
    handler: createOrUpdateHeadHandler
  })

  fastify.route({
    url: '/:nickname',
    method: 'PATCH',
    schema: {
      body: $ref('headSchema')
    },
    // preHandler: [fastify.authenticate],
    handler: createOrUpdateHeadHandler
  })

  fastify.route({
    url: '/:nickname',
    method: 'DELETE',
    schema: {
      params: $ref('deleteHeadSchema')
    },
    // preHandler: [fastify.authenticate],
    handler: deleteHeadHandler
  })

  fastify.addSchemas(schemas)
}

export default heads
