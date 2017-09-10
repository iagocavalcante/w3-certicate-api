const Hapi = require('hapi')
const server = new Hapi.Server()
const db = require('./config/db')
const person = require('./routes/person')
const course = require('./routes/course')
const configjwt = require('./config/config-jwt')
const getToken = require('./routes/token')


server.connection({
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 3000,
    routes: { cors: true }
})

server.route(getToken)
server.register(require('hapi-auth-jwt2'), function (err) {

    if (err) {
        console.log(err);
    }

    server.auth.strategy('jwt', 'jwt',
        {
            key: configjwt.secret,          // Never Share your secret key
            validateFunc: configjwt.validate,            // validate function defined above
            verifyOptions: { algorithms: ['HS256'] } // pick a strong algorithm
        });

    //server.auth.default('jwt');

    server.route(person)
    server.route(course)
});



server.start((err) => {
    if (err) {
        throw err
    }

    console.log(`Servidor rodando em ${server.info.uri}`)
})