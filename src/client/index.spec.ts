import { client } from './index'

type TestResponse = {
  token: String
}

describe('method GET request from client', () => {
  const testUrl = new URL('http://foo.com')

  afterAll(() => {
    jest.restoreAllMocks()
  })

  it('a resolved response should be TestResponse type when init a get request from client', async () => {
    global.fetch = jest.fn(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          token: '9ifkfl'
        } as TestResponse)
      })
    ) as jest.Mock

    const response = await client<TestResponse>(testUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    expect(response).toEqual({
      token: '9ifkfl'
    })
  })
})