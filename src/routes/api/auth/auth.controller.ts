import { getToken, addSession } from './auth.service.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

function generateCode(): number {
  const code = Math
    .random()
    .toString()
    .slice(-10)

  return Number(code)
}

export async function loginHandler(
  request: FastifyRequest<{ Body: { nickname: string } }>,
  reply: FastifyReply
) {
  const { nickname } = request.body
  const accessToken = request.jwt.sign({ nickname })
  return { accessToken }
}

export async function getHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const code = generateCode()
  const token = await reply.jwtSign({ code })
  // const jwtVerify = await request.jwtVerify()

  reply
    .setCookie('token', token, {
      path: '/',
      secure: true,
      httpOnly: true,
      sameSite: true
    })
    .code(200)
    .send({ token })
}

export async function postHandler(
  request: FastifyRequest<{ Body: { nickname: string } }>,
  reply: FastifyReply
) {
  const code = await request.jwtDecode()
  console.log(code)

  // const response = await addSession({
  //   nickname: request.body.nickname,
  //   code: Number(code.value),
  //   ip_address: request.ip
  // })

  return reply.send({ code })
}
