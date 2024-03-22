const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentModel = new Schema({
    masv : {type: String, required: true, maxLength: 15, unique: true},
    name : {type: String, required: true},
    point : {type: Number, required: true},
    avatar : {type: String}
})

module.exports = mongoose.model('sinhvien', StudentModel)
