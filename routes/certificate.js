const CONSTANTS = require('../helpers/constants')
const URI = `${CONSTANTS.URI}/token`
const CourseModel = require(`../models/Course`)
const PersonModel = require(`../models/Person`)

module.exports = [
    {
        method: 'GET',
        path: URI + `/{id}`,
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
    }
]