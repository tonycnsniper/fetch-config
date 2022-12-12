import request from 'supertest'
import app from '../src/app'

describe('App server default endpoint test', () => {
    it('default endpoint / should return code 200', async () => {
        const res = await request(app).get('/')
        expect(res.status).toBe(200)
    })

    it('default endpoint / should return text hello world', async () => {
        const res = await request(app).get('/')
        expect(res.text).toBe('Hello world')
    })
})