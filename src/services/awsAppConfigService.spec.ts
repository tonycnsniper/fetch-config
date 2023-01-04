import { startSession, getLatestConfiguration } from './awsAppConfigService'
import { client } from '../client'
jest.mock('../client/index.ts')

describe('startSession test suite', () => {
  let mockClient: jest.MockedFunction<typeof client>

  beforeAll(() => {
    mockClient = client as jest.MockedFunction<typeof client>
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  afterAll(() => {
    jest.resetAllMocks()
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

    const expectUrl: URL = new URL(
      'http://appconfigdata.us-west-1.amazonaws.com/configurationsessions'
    )

    expect(response).toEqual({
      InitialConfigurationToken: 'AYADeNgfsRxdKiJ37A1',
    })
    expect(mockClient).toHaveBeenCalledWith(expectUrl, {
      method: 'POST',
      body: JSON.stringify({
        ApplicationIdentifier: 'MyMobileApp',
        ConfigurationProfileIdentifier: 'MyAccessListFlag',
        EnvironmentIdentifier: 'MyMobileAppProdEnv',
      }),
    })
  })

  it('a invalid response would be return when send request failed', async () => {
    mockClient.mockResolvedValue({
      message: 'BadRequestException',
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

describe('getLatestConfiguration test suite', () => {
  let mockClient: jest.MockedFunction<typeof client>

  beforeAll(() => {
    mockClient = client as jest.MockedFunction<typeof client>
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  it('appConfig data should be return after passed valid token', async () => {
    mockClient.mockResolvedValue({
      NextPollConfigurationToken: '9i3k3-93',
      NextPollIntervalInSeconds: 600,
      Configuration: {
        "ip": "10.0.0.1",
        "namespace": "west-dg-mc",
        "domain": "demo.example.com"
      }
    })
    
    const token: String = '84k4-38'
    const result = await getLatestConfiguration(token);

    expect(result).toEqual({
      "ip": "10.0.0.1",
      "namespace": "west-dg-mc",
      "domain": "demo.example.com"
    })
  })

  it('error message would be return when client fetch config failed', async () => {
    mockClient.mockResolvedValue({
      status: 500,
      statusText: 'failed'
    })
    
    const token: String = '84k4-38'
    const result = await getLatestConfiguration(token);

    expect(result).not.toBeDefined()
  })
})
