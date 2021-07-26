require("dotenv").config();
const express = require('express');
const path = require('path')
const corsSetup = require('./config/cors')
const bodyParser = require("body-parser");

// const db = require("./models");

// db.sequelize.sync();

const Upload = require("./controllers/upload");
const TrimMedia = require("./controllers/trimMedia");

const app = express();
const PORT = process.env.PORT || 8081;
app.use(bodyParser.json());
// set the view engine to ejs
app.use(express.static(__dirname + '/assets'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file
app.use(corsSetup())
// index page
app.get('/', function (req, res) {
    res.render('convertSvg');
});
app.get('/convert-svg', function (req, res) {
    res.render('convertSvg');
});
app.use(Upload);
app.use(TrimMedia)

// require("./controllers/mediaDb/index")(app);

app.listen(PORT, () => {
    console.log("Running")
});