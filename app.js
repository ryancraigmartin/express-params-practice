const express = require('express')
const app     = express()
const hbs     = require('hbs')
const path = require('path');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: {type: String, required: true},
  director: {type: String, required: true},
  year: {type: String, required: true},
  rate: {type: String, required: true},
  duration: {type: String, required: true},
  genre:[String]
});

const Movie = mongoose.model('Movie', movieSchema);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

mongoose.connect('mongodb://localhost/video')
  .then(() => {
    console.log('Connected to Mongo Database - video')
  }).catch(err => {
    console.error('Error connecting to  Mongo Database - video', err)
  });

app.get('/', function (req, res) {
  Movie.find()
  .then(movies => {
    let data = {};
    data.theList = movies;
    res.render('index', data);
  })
  .catch(theError => {
    console.log(theError);
  })
});

app.get('/movies/:id', function (req, res) {
  const theId = req.params.id;
  Movie.findById(theId)
  .then(movies => {
    let data = {};
    data.theMovie = movies;
    res.render('movieshow', data);
  })
  .catch(theError => {
    console.log(theError);
  })
});

app.get('/movies/director/:director', function (req, res) {
  const theDirector = req.params.director;
  Movie.find({director: theDirector})
  .then(movies => {
    let data = {};
    data.directorList = movies;
    data.directorName = theDirector;
    res.render('moviesbydirector', data);
  })
  .catch(theError => {
    console.log(theError);
  })
});

app.get('/movies/year/:year', function (req, res) {
  const theYear = req.params.year;
  Movie.find({year: theYear})
  .then(movies => {
    let data = {};
    data.yearList = movies;
    data.selectedYear = theYear;
    res.render('moviesbyyear', data);
  })
  .catch(theError => {
    console.log(theError);
  })
});

app.listen(3000, () => console.log('Server started - localhost:3000'))

//Closes the connection to the video database.
// mongoose.connection.close();