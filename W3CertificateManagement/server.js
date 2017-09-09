const Hapi = require('hapi')
const db = require('./config/db')
const Constants = require('./helpers/constants')
const fs = require('fs')
const directory = require('./modules/directory')
const file = require('./modules/files')
const server = new Hapi.Server()

server.connection({
    host: 'localhost',
    port: '3000'

})

server.route({
    method: 'POST',
    path: '/create-dir',
    handler: function (request, reply) {
        let res = directory.createDirectory(request.params.directoryName)
        return reply(res)
    }
})

server.route({
    method: 'POST',
    path: '/create-video',
    config: {

        payload: {
            output: 'stream',
            parse: true,
            maxBytes: 5368709120,
            allow: 'multipart/form-data'
        },

        handler: function (request, reply) {
            let data = request.payload
            if (data.file) {
                let name = data.file.hapi.filename
                let path = data.directoryName
                let content = data.file._data

                let response = file.createVideo(path, name, content)

                reply(response)
            }

        }
    }
})

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
})
