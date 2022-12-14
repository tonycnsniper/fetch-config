import { AppConfiguration } from '../types/appConfig'
import { ConfigReponseBody } from '../types/appConfig'

import * as defaultConfig from '../cache/aws-config-appId.json'

const isAppConfigAvailable = () => false

const loadDefaultConfig = (): AppConfiguration => {
  return defaultConfig as AppConfiguration
}

export const fetchConfig = (): ConfigReponseBody => {
  let responseBody: ConfigReponseBody = {}
  if (isAppConfigAvailable()) {
    responseBody = {
      message: 'fetch succesully',
      status: 200,
    }
  } else {
    responseBody.body = loadDefaultConfig()
  }

  return responseBody;
}
