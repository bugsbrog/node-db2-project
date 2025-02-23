const Car = require('./cars-model')
const vinValidate = require('vin-validator')

const checkCarId = async (req, res, next) => {
    const { id } = req.params
        try {
            const carId = await Car.getById(id)
                if (!carId) {
                    next({
                        status: 404,
                        message: `car with id ${id} is not found`
                    })
                } else {
                    req.car = carId
                    next()
                }
        } catch (err) {
            next(err)
        }
}

const checkCarPayload = (req, res, next) => {
    const { vin, make, model, mileage } = req.body
        if (!vin) {
            next({
                status: 400,
                message: 'vin is missing'
            })
        } else if (!make) {
            next({
                status: 400,
                message: 'make is missing'
            })
        } else if (!model) {
            next({
                status: 400,
                message: 'model is missing'
            })
        } else if (!mileage) {
            next({
                status: 400,
                message: 'mileage is missing'
            })
        } else {
            next()
        }
}

const checkVinNumberValid = (req, res, next) => {
    const { vin } = req.body
        if (!vinValidate.validate(vin)) {
            next({
                status: 400,
                message: `vin ${vin} is invalid`
            })
        } else {
            next()
        }
}

const checkVinNumberUnique = async (req, res, next) => {
    const { vin } = req.body
        try {
            const vinNum = await Car.getByVin(vin)
                if (vinNum) {
                    next({
                        status: 400,
                        message: `vin ${vin} already exists`
                    })
                } else {
                    next()
                }
        } catch (err) {
            next(err)
        }
}

module.exports = {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique
}