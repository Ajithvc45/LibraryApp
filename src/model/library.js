const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }).then(()=>{
    console.log("Database connection successfull")
}).catch((err)=>{
    console.log(err)
});

mongoose.connection.on('connected', ()=>{
    console.log('connected to database mongodb @ 27017');
});

mongoose.connection.on('error',(err)=>{
    if(err){
        console.log('Error in Database connection:'+err)
    }
});

const Schema = mongoose.Schema;

var Library = new Schema({
    bookName: String,
    literature: String,
    story: String
})

const library = mongoose.model('library', Library);
module.exports = library;