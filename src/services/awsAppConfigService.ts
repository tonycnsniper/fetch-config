import {
  AppConfiguration,
  InitialSessionBody,
  InitialSessionResponse,
  GetConfigurationResponse,
} from '../types/appConfig'
import config from 'config'
import { client, ClientCustomConfig } from '../client'

const buildStartSessionRequstUrl = (): URL => {
  const host: String = config.get('appConfig.host')
  const endpoint: String = config.get('startSession.endpoint')
  const url = new URL(`http://${host}/${endpoint}`)
  return url
}

const buildGetLatestRequestUrl = (token: String): URL => {
  const host: String = config.get('appConfig.host')
  const endpoint: String = config.get('getConfig.endpoint')
  const url = new URL(`http://${host}/${endpoint}${token}`)
  return url
}

export const startSession = async (
  data: InitialSessionBody
): Promise<InitialSessionResponse> => {
  const url = buildStartSessionRequstUrl()
  const startSessionResponse = await client<InitialSessionResponse>(url, {
    method: 'POST',
    body: JSON.stringify(data),
  })

  return startSessionResponse
}

export const getLatestConfiguration = async (
  token: String
): Promise<AppConfiguration | undefined>  => {
  const url = buildGetLatestRequestUrl(token)

  const getLastestConfigurationResponse =
    await client<GetConfigurationResponse>(url, {
      method: 'GET',
    })

  return getLastestConfigurationResponse?.Configuration
}
