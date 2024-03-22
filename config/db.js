const mongoose = require('mongoose');

const uri = "mongodb+srv://khanhsnph43678:khanhsnph43678@cluster0.s2dwghm.mongodb.net/SinhVien"


const connect = async () => {
    try{
        await mongoose.connect(uri);
        console.log('connect success')
    }catch(err){
        console.log(err);
        console.log('connect fail')
    }
}

module.exports = {connect}