const CONSTANTS = require('../helpers/constants')
const URI = `${CONSTANTS.URI}/token`
const configjwt = require('../config/config-jwt')

module.exports = [
    // Se as credenciais estiverem corretas, retorna token para ser usado no header
    {
        method: 'POST',
        path: URI,
        handler: (request, reply) => {
            const usuario = {
                usuario: request.payload.nome
                , senha: request.payload.senha
            }
            if (usuario.usuario != configjwt.usuario.nome) {
                reply({
                    error: true,
                    data: 'Credenciais incorretas',
                    statusCode: 401,
                    statusText: 'Not OK',
                }).code(401)
            } else {
                reply({
                    error: false,
                    data: {
                        token: configjwt.token
                    },
                    statusCode: 200,
                    statusText: 'OK',
                }).code(200)
            }
        }
    }
]