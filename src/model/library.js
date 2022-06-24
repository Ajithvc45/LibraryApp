const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/library');

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