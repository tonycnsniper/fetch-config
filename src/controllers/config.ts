import { AppConfiguration } from '../types/appConfig'
import { ConfigReponseBody, InitialSessionResponse, InitialSessionBody } from '../types/appConfig'
import { getLatestConfiguration, startSession } from '../services/awsAppConfigService'
import * as defaultConfig from '../cache/aws-config-appId.json'
import config from 'config'

const getAppConfigToken = async (): Promise<InitialSessionResponse> => {
  const {
    ApplicationIdentifier,
    ConfigurationProfileIdentifier,
    EnvironmentIdentifier
  }: InitialSessionBody = config.get('startSession');
  
  const response: InitialSessionResponse = await startSession({
    ApplicationIdentifier,
    ConfigurationProfileIdentifier,
    EnvironmentIdentifier
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
  let responseBody: ConfigReponseBody = {}
  const result = await getAppConfigToken();
  const token = result.InitialConfigurationToken;
  if (token) {
    const appConfig = await getLatestConfiguration(token)
    responseBody = {
      message: 'fetch succesully',
      status: 200,
      body: appConfig
    }
  } else {
    responseBody.body = loadDefaultConfig()
  }

  return responseBody
}
