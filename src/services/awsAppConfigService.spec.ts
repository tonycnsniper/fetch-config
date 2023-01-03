import { startSession, getLatestConfiguration } from './awsAppConfigService'
import { client } from '../client'
jest.mock('../client/index.ts')

describe('startSession', () => {
  let mockClient: jest.MockedFunction<typeof client>

  beforeAll(() => {
    mockClient = client as jest.MockedFunction<typeof client>
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('a valid token would be return after send request with correct params by client', async () => {
    mockClient.mockResolvedValue({
      InitialConfigurationToken: 'AYADeNgfsRxdKiJ37A1',
    })

    const response = await startSession({
      ApplicationIdentifier: 'MyMobileApp',
      ConfigurationProfileIdentifier: 'MyAccessListFlag',
      EnvironmentIdentifier: 'MyMobileAppProdEnv',
    })

    const expectUrl: URL = new URL('http://appconfigdata.us-west-1.amazonaws.com/configurationsessions');

    expect(response).toEqual({
      InitialConfigurationToken: 'AYADeNgfsRxdKiJ37A1',
    })
    expect(mockClient).toHaveBeenCalledWith(expectUrl,
      {
        method: 'POST',
        body: JSON.stringify({
          ApplicationIdentifier: 'MyMobileApp',
          ConfigurationProfileIdentifier: 'MyAccessListFlag',
          EnvironmentIdentifier: 'MyMobileAppProdEnv',
        }),
      }
    )
  })

  it('a invalid response would be return when send request failed', async () => {
    mockClient.mockResolvedValue({
        message: 'BadRequestException'
    })

    const response = await startSession({
      ApplicationIdentifier: 'MyMobileApp',
      ConfigurationProfileIdentifier: 'MyAccessListFlag',
      EnvironmentIdentifier: 'MyMobileAppProdEnv',
    })

    expect(response).toEqual({
      message: 'BadRequestException',
    })
  })
})
