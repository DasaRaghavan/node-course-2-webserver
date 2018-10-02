const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//logger middleware
app.use((req, res, next)=> {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log(`Error writing to server.log`);
    }
  });
  next();
});

//maintenance middleware.
// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'Under Construction',
//     message: 'We will be right back'
//   });
// });

//help URL -- for static pages
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});


//route for root
app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    message: 'Welcome to my website!',
    name: 'Dasa',
    likes: ['Travel',
            'Running',
            'Biking']

  });
});

//route for about
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    message: 'About Page'
  });
});

//route for a bad request
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

//bind the port on which to listen for requests
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
