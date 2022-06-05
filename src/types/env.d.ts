declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    APP_IP: string
    APP_PORT: number
    JWT_SECRET: string
    RCON_IP: string
    RCON_PORT: number
    RCON_PASSWORD: string
  }
}
