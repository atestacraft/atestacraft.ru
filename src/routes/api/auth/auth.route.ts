import {
  getHandler,
  loginHandler,
  postHandler
} from './auth.controller.js'
import { schemas, $ref } from './auth.schema.js'
import type { FastifyInstance, FastifyPluginAsync } from 'fastify'

const auth: FastifyPluginAsync = async (fastify: FastifyInstance): Promise<void> => {
  fastify.post('/login', loginHandler)
  fastify.post('/', postHandler)

  fastify.addSchemas(schemas)
}

export default auth
