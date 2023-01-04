import { Router, Request, Response } from 'express'

import { ConfigReponseBody } from '../types/appConfig'
import { fetchConfig } from '../controllers/config'

export const configRoute = Router()

/**
 * fetch config info
 * @route GET /config
 */
configRoute.get('/config', async (req: Request, res: Response) => {
  const responseBody: ConfigReponseBody = await fetchConfig()
  res.json(responseBody)
})
