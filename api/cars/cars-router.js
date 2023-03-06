const express = require('express');
const Cars = require('./cars-model');
const router = express.Router();
const {checkCarId, checkCarPayload, checkVinNumberUnique, checkVinNumberValid} = require('./cars-middleware')//eslint-disable-line

router.get('/', async (req, res, next) => {
    try {
        const cars = await Cars.getAll()
        res.status(200).json(cars);
    } catch (err) {
        next(err)
    }
})

router.get("/:id", checkCarId, async (req, res, next) => {//eslint-disable-line
    res.status(200).json(req.car)
})

router.post('/', checkCarPayload,  checkVinNumberUnique, checkVinNumberValid, async (req, res, next) => {
    try {
        const [id] = await Cars.create(req.body);
        const newCar = await Cars.getById(id)
        res.status(201).json(newCar)
    } catch (err) {
        next(err)
    }
})


module.exports = router;