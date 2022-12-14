import express from 'express'
import { defaultRoute } from './default'
import { configRoute } from './config'

export const routes = express.Router()

routes.use(defaultRoute)
routes.use(configRoute)
