const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public/dist/public' )));
app.use(express.static(__dirname + 'public/dist/public' ));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/product_manager');
require('./server/config/mongoose.js')

require('./server/config/routes.js')(app)

app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./public/dist/public/index.html"))
});

app.listen(8000, () => {
    console.log("listening on port 8000");
})