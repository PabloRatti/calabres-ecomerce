const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: String,
    img: String,
    price : Number,
    company: String,
    info: String,
    inCart: Boolean,
    count : Number,
    total: Number,
    type: String,
    width : String

}, {
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);