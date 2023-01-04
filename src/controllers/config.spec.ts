import { getAppConfigToken, fetchConfig } from './config'
import { startSession, getLatestConfiguration } from '../services/awsAppConfigService'
jest.mock('../services/awsAppConfigService')

describe('getAppConfigToken test suite', () => {
  let startSessionMock: jest.MockedFunction<typeof startSession>

  beforeEach(() => {
    startSessionMock = startSession as jest.MockedFunction<typeof startSession>
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  it('a valid token would be return after getAppConfigToken is called with correct params', async () => {
    startSessionMock.mockResolvedValue({
      InitialConfigurationToken: '8k3lkh',
    })

    const result = await getAppConfigToken()
    expect(result).toEqual({
      InitialConfigurationToken: '8k3lkh',
    })
  })

  it('an error would be return after get appConfig token failed', async () => {
    startSessionMock.mockResolvedValue({
        statusText: 'failed'
    })

    const result = await getAppConfigToken()
    expect(result).toEqual({
        statusText: 'failed'
    })
  })
})

describe('fetchConfig test suite', () => {
  let startSessionMock: jest.MockedFunction<typeof startSession>
  let getLatestConfigurationMock: jest.MockedFunction<typeof getLatestConfiguration>

  beforeEach(() => {
    startSessionMock = startSession as jest.MockedFunction<typeof startSession>
    getLatestConfigurationMock = getLatestConfiguration as jest.MockedFunction<typeof getLatestConfiguration>
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('a response with config data should be return when get appConfig token successfully', async () => {
    startSessionMock.mockResolvedValue({
      InitialConfigurationToken: '8k3lkh'
    })

    getLatestConfigurationMock.mockResolvedValue({
      "ip": "10.0.0.1",
      "domain": "west-aws.example.com",
      "namespace": "eks-boo"
    })

    const result = await fetchConfig();

    expect(startSessionMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      status: 200,
      statusText: 'fetch succesully',
      body: {
        "ip": "10.0.0.1",
        "domain": "west-aws.example.com",
        "namespace": "eks-boo"
      }
    })
  })

  it('a response with default config data would be return when start session token failed', async () => {
    startSessionMock.mockResolvedValue({
      status: 500,
      statusText: 'failed'
    })

    const result = await fetchConfig();
    expect(getLatestConfigurationMock).toHaveBeenCalledTimes(0)
    expect(result).toEqual({
      status: 200,
      statusText: "default config loaded",
      body: {
        "domain": "demo.example.com",
        "ip": "127.0.0.1",
        "namespace": "prefix"
      }
    })
  })

  it('a response with default config data would be return when get appConfig failed', async () => {
    startSessionMock.mockResolvedValue({
      InitialConfigurationToken: '8k3lkh'
    })

    getLatestConfigurationMock.mockResolvedValue(undefined)

    const result = await fetchConfig();
    expect(getLatestConfigurationMock).toHaveBeenCalled()
    expect(result).toEqual({
      status: 200,
      statusText: "default config loaded",
      body: {
        "domain": "demo.example.com",
        "ip": "127.0.0.1",
        "namespace": "prefix"
      }
    })
  })
})
