import request from 'supertest'
import app from './app'
import { fetchConfig } from './controllers/config'

jest.mock('../src/controllers/config');

describe('default endpoint test', () => {
    it('default endpoint / should return code 200', async () => {
        const res = await request(app).get('/')
        expect(res.status).toBe(200)
    })

    it('default endpoint / should return text Welcome!', async () => {
        const res = await request(app).get('/')
        expect(res.text).toBe('Welcome!')
    })
})

describe('config endpoint test', () => {

    let mockFetchConfig: jest.MockedFunction<typeof fetchConfig>

    beforeAll (() => {
        mockFetchConfig = fetchConfig as jest.MockedFunction<typeof fetchConfig>;
    })

    afterAll(() => {
        jest.restoreAllMocks()
    })

    it('default endpoint /config should return code 200', async () => {
        const res = await request(app).get('/config')
        expect(res.status).toBe(200)
    })

    it('response for /config should not be empty', async () => {
        const res = await request(app).get('/config')
        expect(res.body).not.toBe(undefined);
    })

    it('fetchConfig should be called at once when /config is requested', async () => {
        mockFetchConfig.mockReturnValue({
            message: 'hi',
            status: 200
        })

        await request(app).get('/config')
        expect(mockFetchConfig).toHaveBeenCalled();
    })
})