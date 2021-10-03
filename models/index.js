const mongoose = require("mongoose")

const indexSchema = mongoose.Schema({
    title: {type: String, required: true, unique: true},
    date: {type: Date, required: true, default: new Date(Date.now())},
    views: [
        {
            date: {type: Date, required: true, default: new Date(Date.now())},
            username: {type: String, required: true, default: null},
        }
    ],
    total_views: {type: Number, required: true, default: 0},
    file_link: {},
    ratings: [
        {
            username: {type: String, required: true, default: null},
            date: {type: Date, required: true, default: new Date(Date.now())}
        }
    ],
    thumbnail: {type: String, required: true},
    tags: {type: Array, default: []},
    author: {type: String, default: null}
})

module.exports = mongoose.model("data", indexSchema, "data")