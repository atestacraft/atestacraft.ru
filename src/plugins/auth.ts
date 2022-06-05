import fp from 'fastify-plugin'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import type { JWT } from '@fastify/jwt'
import type { Player } from '@prisma/client'
import type { FastifyRequest, FastifyReply } from 'fastify'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: Partial<Player & { code: number }>
    user: Player
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    jwt: JWT
  }

  interface FastifyInstance {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    authenticate: any
  }
}

export default fp(async (fastify) => {
  fastify.register(fastifyCookie)

  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET
  })

  fastify.decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        return await request.jwtVerify()
      } catch (err) {
        return reply.send(err)
      }
    }
  )

  fastify.addHook('preHandler', (request, reply, done) => {
    request.jwt = fastify.jwt
    return done()
  })
})
