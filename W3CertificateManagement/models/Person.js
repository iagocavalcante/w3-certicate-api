const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const _schema = {
	name: { type: String, required: true }
    , last_name: { type: String, required: true }
    , phone_number: { type: String, required: true }
    , type: [
        'Student',
        'Teacher'
    ]
	, created_at: Date
	, updated_at: Date
}

const PersonSchema = new Schema(_schema)

const Model = Mongoose.model('Person', PersonSchema)

module.exports = Model