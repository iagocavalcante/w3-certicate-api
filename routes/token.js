const CONSTANTS = require('../helpers/constants')
const URI = `${CONSTANTS.URI}/token`
const configjwt = require('../config/config-jwt')

module.exports = [
    // Pega todos os alunos
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
                    statusText: 'NOK',
                }).code(401)
            } else {
                reply({
                    error: true,
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