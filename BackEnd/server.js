// server.js

const express = require('express');
//Necessary to load html files
const app = express();
//Needed for interpreting post requests
const bodyParser = require('body-parser');
//Needed for Cross Origin Resource Sharing(CORS)
const PORT = 4000;
//Needed to connect to the mongo db
const cors = require('cors');
//Needed for interpreting post requests
const mongoose = require('mongoose');
//Connection string to mongodb
const mongoDB = 'mongodb+srv://Conor:mongodb123@cluster0-ndyqk.mongodb.net/test?retryWrites=true&w=majority'
//Connect to database
mongoose.connect(mongoDB, {useNewUrlParser:true});
//Needed for body parssing
const Schema = mongoose.Schema;
//Get reference to schema above

//Create new schema for books
const bookSchema = new Schema({
  title:String,
  year:String,
  author:String
});
//Create model for the database
const BookModel = mongoose.model('book',bookSchema);
//Use Cross reference Origin system
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Helps to avoid CORS errors
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
//Get the list of books from the mongo database
app.get('/api/books', (req,res,next) => {
//Retrieve the data from the books model
  console.log("get request")
  BookModel.find((err,data)=>{
    res.json({books:data});
  })
})
//delete model for the book
app.delete('/api/books/:id', (req,res) =>{
  console.log(req.params.id);

  BookModel.deleteOne({_id:req.params.id},(error,data)=>{
    if(error)
      res.json(error);
      
    res.json(data);
  })
})
//displays the books
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