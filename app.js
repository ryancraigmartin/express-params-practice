// app.js
const express = require('express')
const app     = express()
const hbs     = require('hbs')
const path = require('path');

mongoose.connect('mongodb://localhost/video')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/', function (req, res) {

});

app.get('/movies/:director', function (req, res) {

});

app.get('/movies/:year', function (req, res) {
  res.send(req.query)
});



// app.get('/users/:username', function (req, res) {
//   let theUserName = req.params.username;
//   // let theUser = User.find({username: theUserName})this is how we will query the database
//   let data = {theActualUserName: theUserName }
//   res.render('userpage', data)
// })


// app.get('/search', function (req, res) {
//   res.send(req.query)
// })



app.listen(3000, () => console.log('Example app listening on port 3000!'))
