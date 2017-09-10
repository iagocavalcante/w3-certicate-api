const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const _schema = {
    name: { type: String, required: true }
    , total_hour: { type: String, required: true }
    , initial_date: Date
    , final_date: Date
    , created_at: Date
    , updated_at: Date
}

const CourseSchema = new Schema(_schema)

const Model = Mongoose.model('Course', CourseSchema)

module.exports = Model