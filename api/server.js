const express = require("express")

const carRouter = require('./cars/cars-router');

const server = express()

server.use(express.json())

server.use("/api/cars", carRouter)

server.use("*", (req, res, next) => {
    next({status: 404, message: `car with id ${req.params.id} is not found`})
}) 

server.use((err, req, res, next) => {//eslint-disable-line
    res.status(err.status || 500).json({message: err.message || "Oops!"})
})

module.exports = server
