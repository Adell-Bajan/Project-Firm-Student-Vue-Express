let express = require('express'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./config/database');
bodyParser = require('body-parser');

// Conect to DataBase
mongoose.connect(config.database);
const db = mongoose.connection;
db.on('error', console.error.bind('console', 'connection errpr'));
db.once('open', function() {
    console.log('Connected to MongoDB');
});

const studentAPI = require('../backend/routes/student.route')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

// API
app.use('/api', studentAPI)

// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})

// Find 404
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});