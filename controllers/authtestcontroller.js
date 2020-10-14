let router = require('express').Router();
let sequelize =  require('../db');
let User = require('../models/user')( sequelize, require('sequelize') );
let AuthTestModel = require('../models/authtest')( sequelize, require('sequelize') );

router.get('/getall', (req, res) => {
    let userid = req.user.id;

    AuthTestModel
        .findAll({ where: { owner: userid } })
        .then( 
            function Success(data){
                res.json(data);
            }, 
            function Error(err){
                res.send(500, err.message);
            } 
        );
});

router.post('/create', (req, res) => {
    console.log("in the /authtest/create route");
    let owner = req.user.id;
    AuthTestModel
        .create({ authtestdata: req.body.authtestdata.item, owner: owner })
        .then( 
            function Success(data){
                res.json({ authtestdata: data});
            }, 
            function Error(err){
                res.send(500, err.message);
            } 
        );
});

router.get('/:id', (req, res) => {
    let data = req.params.id;
    let userid = req.user.id;

    AuthTestModel
        .findAll({ where: { id: data, owner: userid } })
        .then( 
            function Success(d){
                res.json(d);
            }, 
            function Error(err){
                res.send(500, err.message);
            } 
        );
});

router.delete('/delete/:id', (req, res) => {
    let data = req.params.id;
    let userid = req.user.id;

    AuthTestModel
        .destroy({ where: { id: data, owner: userid } })
        .then( 
            function Success(dat){
                res.send("you removed a log");
            }, 
            function Error(err){
                res.send(500, err.message);
            } 
        );
});

router.put('/update/:id', (req, res) => {
    let data = req.params.id;
    let authtestdata = req.body.authtestdata.item;

    AuthTestModel
        .update({ authtestdata: authtestdata }, { where: {id: data} } )
        .then( 
            function Success(dat){
                res.json({ authtestdata: authtestdata });
            }, 
            function Error(err){
                res.send(500, err.message);
            } 
        );
});

module.exports = router;