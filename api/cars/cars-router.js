const router = require('express').Router()

const {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique
} = require('./cars-middleware')

const Cars = require('./cars-model')

router.get('/', async (req, res, next) => {
    try {
        const getCar = await Cars.getAll()
        res.json(getCar)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', checkCarId, async (req, res, next) => {
    res.json(req.car)
})

router.post('/', checkCarPayload, checkVinNumberUnique, checkVinNumberValid, async (req, res, next) => {
        try {
            const createCar = await Cars.create(req.body)
            res.status(201).json(createCar)
        } catch (err) {
            next(err)
        }
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack
    })
})

module.exports = router