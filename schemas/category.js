let mongoose = require('mongoose');

let categorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isDelete: { type: Boolean, default: false }
}, {
    timeseries: true
})

module.exports = mongoose.model('category', categorySchema);