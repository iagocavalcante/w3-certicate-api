const CONSTANTS = require('../helpers/constants')
const URI = `${CONSTANTS.URI}/persons`
const CourseModel = require(`../models/Course`)

const Moment = require('moment')
const getCurrentDateWithoutTimezone = Moment().format('YYYY-MM-DDTHH:mm:ss')

module.exports = [
    // Pega todos os alunos
    {
        method: 'GET',
        path: URI,
        handler: (req, reply) => {
            CourseModel.find((error, data) => {
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
            CourseModel.findById(req.params.id, (error, data) => {
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
            const course = new CourseModel({
                name: request.payload.name
                , total_hour: request.payload.hours
                , initial_date: request.payload.initial_date
                , final_date: request.payload.final_date
                , created_at: getCurrentDateWithoutTimezone
            })

            course.save((error, data) => {
                if (error) {
                    if (error.index == 0) {
                        reply({
                            error: true,
                            data: 'Já existe uma pessoa registrada com esse nome!',
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
                        message: 'Nova pessoas cadastrada com sucesso!',
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
                , total_hour: request.payload.hours
                , initial_date: request.payload.initial_date
                , final_date: request.payload.final_date
                , updated_at: getCurrentDateWithoutTimezone
            }

            CourseModel.update(_id, person, { multi: false }, (error, data) => {
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
                        message: 'Pessoa editada com sucesso!',
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

            CourseModel.remove(_id, (error, data) => {
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
                        message: 'Pessoa deletada com sucesso!',
                        statusCode: 200,
                        statusText: 'OK'
                    }).code(200)
                }
            })
        }
    }
]