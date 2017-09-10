const Hapi = require('hapi')
const server = new Hapi.Server()

server.connection({
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 3000,
    routes: { cors: true }
})

server.start((err) => {
    if (err) {
        throw err
    }

    console.log(`Servidor rodando em ${server.info.uri}`)
})