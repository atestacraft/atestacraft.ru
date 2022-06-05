import { Rcon } from 'rcon-client'

// /scoreboard objectives add login trigger
// /scoreboard players enable @a login

// /trigger login set <code>
// /scoreboard players get <nickname> login

const rcon = await Rcon.connect({
  host: process.env.RCON_IP,
  port: process.env.RCON_PORT,
  password: process.env.RCON_PASSWORD
})

export { rcon }
