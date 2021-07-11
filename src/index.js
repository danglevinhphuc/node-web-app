require("dotenv").config();
const express = require('express');
const path = require('path')
const cors = require("cors");
const bodyParser = require("body-parser");
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
app.use(cors("*"));
// index page
app.get('/', function (req, res) {
    res.render('index');
});

app.use(Upload);
app.use(TrimMedia)

app.listen(PORT, () => {
    console.log("Running")
});