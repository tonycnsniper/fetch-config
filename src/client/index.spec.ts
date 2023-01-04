import { client } from './index'

type TestResponse = {
  token: String
}

describe('method GET request from client', () => {
  const testUrl = new URL('http://foo.com')

  afterAll(() => {
    jest.restoreAllMocks()
  })

  it('a resolved response would be return when init a get request from client', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            token: '9ifkfl',
          } as TestResponse),
      })
    ) as jest.Mock

    const response = await client<TestResponse>(testUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    expect(response).toEqual({
      token: '9ifkfl',
    })
  })

  it('a response with error message would be return when fetch request failed', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject({
        statusText: 'failed',
      })
    ) as jest.Mock

    const response = await client<TestResponse>(testUrl, {
      method: 'GET',
    })

    expect(response).toEqual('failed')
  })

  it('a response with error message would be return when fetch request status is false', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve('failed'),
      })
    ) as jest.Mock

    const response = await client<TestResponse>(testUrl, {
      method: 'GET',
    })

    expect(response).toEqual('failed')
  })

  it('a response with success status would be return when a fetch send with correct body', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            token: 'jek883',
          }),
      })
    ) as jest.Mock

    const response = await client<TestResponse>(testUrl, {
      method: 'POST',
      body: JSON.stringify({
        app_id: '844j4',
      }),
    })

    expect(global.fetch).toHaveBeenCalledWith(testUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        app_id: '844j4',
      }),
    })

    expect(response).toEqual({
      token: 'jek883',
    })
  })
})
