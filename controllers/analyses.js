    //this file contains the endpoint to CRUD analyses in the database
const AnalyseSchema = require('../models/Analyse.js');
const passport = require('passport');

module.exports.controller = (app) => {
//fetch all Analyses
app.get('/analyses',passport.authenticate('jwt', { session: false }), (req, res) => {
    AnalyseSchema.find({}, 'name cases', (error,
    analyses) => {
    if (error) { console.log(error); }
    res.send({
        analyses,
    });
    });
    }); 


app.get('/analyses/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    AnalyseSchema.findOne({_id: req.params.id}, 'name cases', (error,
        analyses) => {
        if (error) { console.log(error); }
        res.send({
            analyses,
        });
        });
        }); 
    




    //delete a analyse from the database

app.delete('/analyses/:id',  passport.authenticate('jwt', { session: false }), (req, res) => {
    AnalyseSchema.remove({
        _id: req.params.id 
    }, function(error, ccase){
        if (error){console.error(error);}
        res.send({success:true})
    })
    }); 


// add a new analyse
app.post('/analyses',  passport.authenticate('jwt', { session: false }),(req, res) => {
const newAnalyse = new AnalyseSchema({
    
   name: req.body.name,
   cases: req.body.cases,

});

newAnalyse.save((error, analyse) => {
if (error) { console.log(error); }
res.send(analyse);
});
});
};