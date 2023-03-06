const db = require('../../data/db-config')

const getAll = () => {
  return db('cars');
}

const getById = (id) => {
  return db('cars').where("id", id).first()
}

const create = (part) => {
  const car = db('cars').insert(part)
  console.log(car)
  return car
}


module.exports ={
  getAll,
  getById,
  create
}
