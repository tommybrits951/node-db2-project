const Cars = require('./cars-model')
const vinValidator = require("vin-validator"); 

const checkCarId = async (req, res, next) => {
  try {
    const {id} = req.params;
    const car = await Cars.getById(id)
    if (!car) {
      res.status(404).json({message: `car with id ${id} is not found`})
    } else {
      req.id = id;
      req.car = car;
      next()
    }
  } catch (err) {
    next(err)
  }
}

const checkCarPayload = (req, res, next) => {
  const {vin, make, model, mileage} = req.body;
  if(!vin) {
    res.status(400).json({message: `vin is missing`})
  } else if (!make) {
    res.status(400).json({message: `make is missing`})
  } else if (!model) {
    res.status(400).json({message: `model is missing`})
  } else if (!mileage) {
    res.status(400).json({message: `mileage is missing`})
  } else {
    const car = {vin: vin, make: make, model: model, mileage: mileage}
    req.car = car;
    next()
  }
}

const checkVinNumberValid = async (req, res, next) => {
  const check = await vinValidator.validate(req.body.vin)
  if (check === true) {
    next()
  } else {
    res.status(400).json({message: `vin ${req.body.vin} is invalid`})
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  const {vin} = req.body
  const cars = await Cars.getAll();
  cars.map(car => {
    if (car.vin === vin) {
      res.status(400).json({message: `vin ${vin} already exists`})
    }
  })
  next()
}


module.exports = {
  checkCarId, 
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid
}