const express = require('express');
const library = require('./src/model/library')
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyparser = require('body-parser');
const { Router } = require('express');

const app = new express();
app.use(cors());
app.use(bodyparser.json());
username="admin"
password="1234"

function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split('')[1]
    if(token=='null'){
        return res.status(401).send('Unauthorized request')
    }
    let payload=jwt.verify(token,'secretkey')
    console.log(payload)
    if(!payload){
        return res.status(401).send('Unauthorized request')
    }
    req.userId=payload.subject
    next()
}

app.post('/login', (req, res) => {
    let userData = req.body

    if(!username) {
        res.status(401).send('Invalid Username')
    }else{
        if(password !== userData.password){
            res.status(401).send('Invalid password')
        }else{
            let payload = {subject:username+password}
            let token = jwt.sign(payload,'secretkey')
            res.status(200).send({token})
        }
    }
})

app.get('/library', (req, res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    library.find()
        .then(function (book) {
            res.send(book);
        })
})

app.post('/insert',verifyToken, (req, res) => {
    console.log('insert') 
    console.log(req.body);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

    var books = {
        bookName: req.body.item.bookName,
        literature: req.body.item.literature,
        story: req.body.item.story
    }

    var book = new library(books);
    book.save();
})

app.delete('/library/remove/:id', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    id = req.params.id;
    library.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log("Success")
        res.send();
    });
});




app.get('/library/:id', (req, res) => {
    const id = req.params.id;
    library.findOne({"_id":id})
    .then((book)=>{
        res.send(book);
    });
});

app.put('/update',(req, res) => {
    console.log(req.body)
    id=req.body._id,
    bookName=req.body.bookName,
    literature=req.body.literature,
    story=req.body.story
    library.findByIdAndUpdate({"_id":id},
                            {$set:{"bookName":bookName,
                                    "literature":literature,
                                    "story":story}})
    .then(function(){
        res.send
    })
})

app.listen(3000);