const db = require('../../data/db-config')
const Cars = require('./cars-model')

test('it is the correct environment for the tests', () => {
    expect(process.env.NODE_ENV).toBe('testing')
})

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

describe('Cars db access functions', () => {

    describe('Cars.getAll', () => {
        it('resolves to all cars in the cars table', async () => {
            const car = await Cars.getAll()
            expect(car).toHaveLength(0)
        })
    })
})

    describe('Cars.create', () => {
        it('adds a new car to the table', async () => {
            await Cars.create({ vin: '2CTALDEW5A6370888', make: 'GMC', model: 'Terrain', mileage: 1000 })
            const rows = await db('cars')
            expect(rows).toHaveLength(1)
        })
        it('resolves to the newly created car', async () => {
            const carz = { vin: '4T3ZK3BB7BU042861', make: 'Toyota', model: 'VENZA', mileage: 1300 }
            const newCar = await Cars.create(carz)
            expect(newCar).toMatchObject({ id: 1, vin: '4T3ZK3BB7BU042861', make: 'Toyota', model: 'VENZA', mileage: 1300 })
        })
    })