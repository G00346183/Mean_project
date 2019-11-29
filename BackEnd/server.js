// server.js

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose');

const mongoDB = 'mongodb+srv://Conor:mongodb123@cluster0-ndyqk.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(mongoDB, {useNewUrlParser:true});

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title:String,
  year:String,
  author:String
});

const BookModel = mongoose.model('book',bookSchema);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept");
  next();
  });

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world');
})

app.get('/api/books', (req,res,next) => {

  console.log("get request")
  BookModel.find((err,data)=>{
    res.json({books:data});
  })
})

app.delete('/api/books/:id', (req,res) =>{
  console.log(req.params.id);

  BookModel.deleteOne({_id:req.params.id},(error,data)=>{
    if(error)
      res.json(error);
      
    res.json(data);
  })
})

app.get('/api/books/search/:title/:criteria', (req,res)=>{
  console.log(req.params.title);
  console.log(req.params.criteria);
if(req.params.criteria == 'title')
  {
  BookModel.find({ 'title': req.params.title},
(error,data) =>{
  res.json(data);
})
  }
})


app.post('/api/books', (req,res) =>{
console.log('post Sucessfull');
console.log(req.body)
console.log(req.body.title);
console.log(req.body.year);
console.log(req.body.author);

BookModel.create({
  title: req.body.title,
  year: req.body.year,
  author: req.body.author
});
res.json('data uploaded')


})

app.get('/api/books/:id',(req,res)=>{
  console.log(req.params.id);

  BookModel.findById(req.params.id, (err, data)=>{
    res.json(data);
  })
})


app.put('/api/books/:id', (req, res)=>{
  console.log(req.body);
  console.log("Edit "+req.params.id);

  BookModel.findByIdAndUpdate(req.params.id,
    req.body, {new:true}, (error, data)=>{
      res.send(data);
    })
})

app.listen(PORT, function () {
  console.log('Server is running on Port: ', PORT);
});