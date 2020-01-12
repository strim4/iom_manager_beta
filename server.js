//this file contains the configuration for the backend express server

//Load all required modules
const express = require('express');
//To parse incoming requests
const bodyParser = require('body-parser');
//Object modeling for MongoDB
const mongoose = require('mongoose');
//To handle cross-origin requests between frontend and backend
const cors = require('cors');
//HTTP request logger
const morgan = require('morgan');
const fs = require('fs');
// passport.js configuration
const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'iomapplicationsecretkey';

const R = require('r-script');
const edfName = '';
const csvName = '';









//tell express to use the imported modules
const app = express();
const router = express.Router();
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));
app.use(passport.initialize());



//connect to mongodb
mongoose.connect('mongodb+srv://iommanager:Dezember2019@cluster0-vjmex.mongodb.net/test?retryWrites=true&w=majority', function() {
console.log('Connection has been made');
})
.catch(err => {
console.error('App starting error:', err.stack);
process.exit(1);
});

// Include all controllers, so that no every controller has to be importet individualy 
fs.readdirSync("controllers").forEach(function (file) {
    if(file.substr(-3) == ".js") {
    const route = require("./controllers/" + file)
    route.controller(app)
    }
    })
    app.use(history());
    
    app.use(serveStatic(__dirname + "/dist"));

router.get('/', function(req, res) {
res.json({ message: 'API Initialized!'});
});


//Method to call EDF.R Script
function executeExAsync(callback) {
	const inSig = [
	
    ];

    

// the path to R bin must be added to the systemenvironment variables
// the directory r library mus be writeable 
    R('static/EDF.R').data({ df: inSig,  name: this.edfName }).call(function(error, result) {
		if (error) {
			//console.error('ex-async throws error', error);
			return callback(error, null);
		}
		console.error('ex-async success result', result);
		return callback(null, result);
	});
}; 



//call async EDF R function
app.post('/ex-async', function(req, res) {
    this.edfName =req.body.name;
	executeExAsync(function(error, result) {
		if (error) {
			return res.status(500).send(error);
        }
        
        
        console.log(edfName);
		return res.status(200).send(result);
	});
});


//Method to call CSV.R Script
function executeExAsyncCsv(callback) {
	const inSig = [
	
    ];

    

// the path to R bin must be added to the systemenvironment variables
// the directory r library mus be writeable 
    R('static/CSV.R').data({ df: inSig,  name: this.csvName }).call(function(error, result) {
		if (error) {
			//console.error('ex-async throws error', error);
			return callback(error, null);
		}
		console.error('ex-async success result', result);
		return callback(null, result);
	});
}; 

//call async CSV R function
app.post('/ex-asyncCsv', function(req, res) {
    this.csvName =req.body.name;
	executeExAsyncCsv(function(error, result) {
		if (error) {
			return res.status(500).send(error);
        }
        
        
        console.log(edfName);
		return res.status(200).send(result);
	});
});

//user management

//logout
router.get('/logout', function(req, res){
      req.logout();
    res.send();
    });

//get currentuser
router.get('/current_user', passport.authenticate('jwt', { session: false }), isLoggedIn, function (req, res) {
    if (req.user) {
        res.send({ current_user: req.user })
    } else {
        res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
});

//check if user is loggged in. if not redirect to login page
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
    console.log('error! auth failed')
};

//Tell express server to use port 8081
const port = process.env.PORT || 8081;
app.use('/', router);
app.listen(port, function() {
console.log(`api running on port ${port}`);
});