const request = require('supertest')
const db = require('../data/db-config')
const server = require('./server')

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})
beforeEach(async () => {
    await db('cars').truncate()
})
afterAll(async () => {
    await db.destroy()
})

describe('[GET] /api/cars', () => {
    it('should return a 200 OK status', async () => {
        const res = await request(server).get('/api/cars')
        expect(res.status).toBe(200)
    })
    it('should return JSON', async () => {
        const res = await request(server).get('/api/cars')
        expect(res.type).toBe('application/json')
    })
})
describe('[POST] /api/cars', () => {
    it('responds with a 400 if no vin in payload', async () => {
        const res = await request(server).post('/api/cars')
        expect(res.status).toBe(400)
    })
    it('responds with a 400 if no make in payload', async () => {
        const res = await request(server).post('/api/cars')
        expect(res.status).toBe(400)
    })
    it('responds with a 400 if no model in payload', async () => {
        const res = await request(server).post('/api/cars')
        expect(res.status).toBe(400)
    })
    it('responds with a 400 if no mileage in payload', async () => {
        const res = await request(server).post('/api/cars')
        expect(res.status).toBe(400)
    })
    it('should return a 201 created status', async () => {
        const res = await request(server).post('/api/cars').send({ vin: 'JH4KA7630MC005945', make: 'Acura', model: 'Legend', mileage: 1200 })
        expect(res.status).toBe(201)
    })
    it('responds with the newly created car', async () => {
        let res = await request(server).post('/api/cars').send({ vin: 'JH4KA7630MC005945', make: 'Acura', model: 'Legend', mileage: 1200 })
        expect(res.body).toMatchObject({ vin: 'JH4KA7630MC005945', make: 'Acura', model: 'Legend', mileage: 1200 })
        res = await request(server).post('/api/cars').send({ vin: '1C3CDZBG8DN504146', make: 'Dodge', model: 'Avenger', mileage: 1500 })
        expect(res.body).toMatchObject({ vin: '1C3CDZBG8DN504146', make: 'Dodge', model: 'Avenger', mileage: 1500 })
    })
})