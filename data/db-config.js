// no need to change this file
const knex = require('knex')
const configs = require('../knexfile.js')
const environment = 'development'

module.exports = knex(configs[environment])
