require('dotenv').config();

let express = require('express');
let app = express();
let test = require('./controllers/testcontroller');
let authTest = require('./controllers/authtestcontroller');

let user = require('./controllers/usercontroller');
let sequelize = require('./db');

sequelize.sync();
//Middlewear
app.use(express.json()); //TODO: test out other middlewear functions https://expressjs.com/en/api.html#express.json
app.use( require('./middleware/headers') );

app.use('/api/test', function(req, res){
    res.send("This is data from the /api/test endpoint. It's from the server.");
})

app.use('/api/user', user);
app.use('/test', test);

app.use(require("./middleware/validate-session"));
app.use('/authtest', authTest);

app.listen( 3000, function(){
    console.log('App is listeneing on port 3000!');
});