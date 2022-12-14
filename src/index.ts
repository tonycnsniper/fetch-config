import dotEnv from 'dotenv'
import app from './app'

dotEnv.config()

const server = app
const PORT = process.env.PORT

server.listen(PORT, () => {
  console.log(`Express with Typescript! http://localhost:${PORT}`)
})
