import { AppConfiguration } from '../types/appConfig'
import { ConfigReponseBody } from '../types/appConfig'

import * as defaultConfig from '../cache/aws-config-appId.json'

/**
 * check app conf if avaible or not
 * @returns true for avaiable; false for not
 */
export const isAppConfigAvailable = () => false


/**
 * return default config from json file.
 * @returns AppConfiguration
 */
export const loadDefaultConfig = (): AppConfiguration => {
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
