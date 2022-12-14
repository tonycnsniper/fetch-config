import request from 'supertest'
import app from '../src/app'

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
    it('default endpoint /config should return code 200', async () => {
        const res = await request(app).get('/config')
        expect(res.status).toBe(200)
    })

    it('response for /config should not be empty', async () => {
        const res = await request(app).get('/config')
        expect(res.body).not.toBe(undefined);
    })
})