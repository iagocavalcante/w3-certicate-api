const Mongoose = require('mongoose')

const dbName = 'mongodb://root-api:a1s2d3f4A!@ds129144.mlab.com:29144/heroku_wtlfkl14'

Mongoose.connect(dbName)
Mongoose.Promise = global.Promise
const db = Mongoose.connection

db.on('error', console.error.bind(console, 'Erro de conexão!'))

db.once('open', () => {
	console.log('Conexão com banco de dados realizada com sucesso!')
})

exports = db