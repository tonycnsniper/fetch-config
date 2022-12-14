import { Router, Request, Response } from 'express'

export const defaultRoute = Router()

/**
 * default route
 * @route GET /
 */
defaultRoute.get('/', (req: Request, res: Response) => {
  res.status(200).send('Welcome!')
})
