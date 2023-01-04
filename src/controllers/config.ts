import { AppConfiguration } from '../types/appConfig'
import {
  ConfigReponseBody,
  InitialSessionResponse,
  InitialSessionBody,
} from '../types/appConfig'
import {
  getLatestConfiguration,
  startSession,
} from '../services/awsAppConfigService'
import { default as defaultConfig } from '../cache/aws-config-appId.json'
import config from 'config'

export const getAppConfigToken = async (): Promise<InitialSessionResponse> => {
  const {
    ApplicationIdentifier,
    ConfigurationProfileIdentifier,
    EnvironmentIdentifier,
  }: InitialSessionBody = config.get('startSession')

  const response: InitialSessionResponse = await startSession({
    ApplicationIdentifier,
    ConfigurationProfileIdentifier,
    EnvironmentIdentifier,
  })

  return response
}

/**
 * return default config from json file.
 * @returns AppConfiguration
 */
export const loadDefaultConfig = (): AppConfiguration => {
  return defaultConfig as AppConfiguration
}

export const fetchConfig = async (): Promise<ConfigReponseBody> => {
  let responseBody: ConfigReponseBody = {
    status: 200
  }
  const result = await getAppConfigToken()
  const token = result?.InitialConfigurationToken || ''
  if (!token) {
    responseBody = {
      ...responseBody,
      statusText: "default config loaded",
      body: loadDefaultConfig()
    }
    return responseBody
  }

  const appConfig = await getLatestConfiguration(token)

  if(!appConfig) {
    responseBody = {
      ...responseBody,
      statusText: "default config loaded",
      body: loadDefaultConfig()
    }

    return responseBody
  }

  responseBody = {
    statusText: 'fetch succesully',
    status: 200,
    body: appConfig,
  }

  return responseBody
}
