const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');

app.use(session({ cookie: { maxAge: 60000 }, 
                  secret: 'woot',
                  resave: false, 
                  saveUninitialized: true}));
app.use(flash());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public/dist/public' )));
app.use(express.static(__dirname + 'public/dist/public' ));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/message_board');
// require('./server/models/message.js')(mongoose)
// require('./server/models/user.js')(mongoose)
require('./server/config/mongoose.js')

require('./server/config/routes.js')(app)

app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./public/dist/public/index.html"))
});

app.listen(8000, () => {
    console.log("listening on port 8000");
})