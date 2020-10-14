let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let Seq = require('sequelize');
let TestModel = require('../models/test')(sequelize, Seq); //sequelize.import deprecated!!!

//console.log(Seq.STRING);
router.post('/one', function(req, res){
    res.send("Test 1 went through!");
});

router.post('/two', (req, res) => {
    let testdata = "Test data for endpoint two.";
    
    TestModel.create({ testData: testdata }).then( dataFromDatabase => {
        res.send("Test two went through!");
    });
});

router.post(['/three', "/four"], (req, res) => {
    let testdata = req.body.testdata.item;

    TestModel.create({ testData: testdata }).then( () => {
        res.send("Test three OR four went through!");
    })
});

router.post('/five', (req, res) => {
    let testdata = req.body.testdata.item;

    TestModel.create({testData: testdata}).then( (data) => {
        res.send(data);
    });
});

router.post('/six', (req, res) => {
    let testdata = req.body.testdata.item;

    TestModel.create({testData: testdata}).then( (data) => {
        res.json({ testdata: data });
    });
});

router.post('/seven', (req, res) => {
    //console.log("info: ", req.body);
    let testdata = req.body.testdata.item;

    TestModel.create({testData: testdata}).then( 
        function success(data){
            res.json({ testdata: data });
        },
        function error(err){
            res.send(500, err.message)
        }
    );
});

router.get('/helloclient', (req, res) => {
    res.json({message: 'This is a message from the server!'});
});

router.get('/one', (req, res) => {
    TestModel.findAll({
        attributes: ['id', 'testData']
    })
    .then( 
    function success(data){
        console.log("Controller data: ", data);
        res.json(data);
    },
    function error(err) {
        res.send(500, err.message);
    });
})

module.exports = router;