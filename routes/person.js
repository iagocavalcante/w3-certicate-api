﻿const CONSTANTS = require('../helpers/constants')
const URI = `${CONSTANTS.URI}/courses`
const PersonModel = require(`../models/Course`)

const Moment = require('moment')
const getCurrentDateWithoutTimezone = Moment().format('YYYY-MM-DDTHH:mm:ss')

module.exports = [
    // Pega todos os alunos
    {
        method: 'GET',
        path: URI,
        handler: (req, reply) => {
            PersonModel.find((error, data) => {
                if (error) {
                    reply({
                        error: true,
                        data: error,
                        statusCode: 401,
                        statusText: 'error',
                    }).code(401)
                } else {
                    reply({
                        error: false,
                        data: data,
                        statusCode: 200,
                        statusText: 'successful'
                    }).code(200)
                }
            })
        }
    },
    // Pega Pessoa por id
    {
        method: 'GET',
        path: URI + `/{id}`,
        config: {
            auth: 'jwt'
        },
        handler: (req, reply) => {
            PersonModel.findById(req.params.id, (error, data) => {
                if (error) {
                    reply({
                        error: true,
                        data: error,
                        statusCode: 401,
                        statusText: 'NOK',
                    }).code(401)
                } else {
                    reply({
                        error: false,
                        data: data,
                        statusCode: 200,
                        statusText: 'OK'
                    }).code(200)
                }
            })
        }
    },

    // Cria nova Pessoa
    {
        method: 'POST',
        path: URI,
        config: {
            auth: 'jwt'
        },
        handler: (request, reply) => {
            const person = new PersonModel({
                name: request.payload.name
                , last_name: request.payload.last_name
                , phone_number: request.payload.phone
                , type: request.payload.type
                , created_at: getCurrentDateWithoutTimezone
            })

            person.save((error, data) => {
                if (error) {
                    if (error.index == 0) {
                        reply({
                            error: true,
                            data: 'Já existe um curso registrada com esse nome!',
                            statusCode: 403,
                            statusText: 'NOK',
                        }).code(403)
                    } else {
                        reply({
                            error: true,
                            data: error,
                            statusCode: 401,
                            statusText: 'NOK',
                        })
                    }
                } else {
                    reply({
                        error: false,
                        data: data,
                        message: 'Novo curso cadastrada com sucesso!',
                        statusCode: 201,
                        statusText: 'OK'
                    }).code(201)
                }
            })
        }
    },

    //Atualiza pessoa por id
    {
        method: 'PUT',
        path: URI + `/{id}`,
        config: {
            auth: 'jwt'
        },
        handler: (request, reply) => {
            const _id = { _id: request.params.id }

            const person = {
                name: request.payload.name
                , last_name: request.payload.last_name
                , phone_number: request.payload.phone
                , type: request.payload.type
                , updated_at: getCurrentDateWithoutTimezone
            }

            PersonModel.update(_id, person, { multi: false }, (error, data) => {
                if (error) {
                    reply({
                        error: true,
                        data: error,
                        statusCode: 401,
                        statusText: 'NOK',
                    }).code(401)
                } else {
                    reply({
                        error: false,
                        data: data,
                        message: 'Curso editado com sucesso!',
                        statusCode: 204,
                        statusText: 'OK'
                    }).code(204)
                }
            })
        }
    },

    // Exclui pessoa
    {
        method: 'DELETE',
        path: URI + `/{id}`,
        config: {
            auth: 'jwt'
        },
        handler: (request, reply) => {
            const _id = { _id: request.params.id }

            PersonModel.remove(_id, (error, data) => {
                if (error) {
                    reply({
                        error: true,
                        data: error,
                        statusCode: 401,
                        statusText: 'NOK',
                    }).code(401)
                } else {
                    reply({
                        error: false,
                        data: data,
                        message: 'Curso deletado com sucesso!',
                        statusCode: 200,
                        statusText: 'OK'
                    }).code(200)
                }
            })
        }
    }
]