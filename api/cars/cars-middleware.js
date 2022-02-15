const Car = require('./cars-model')

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
                    next()
                }
        } catch (err) {
            next(err)
        }
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
}

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

module.exports = {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique
}