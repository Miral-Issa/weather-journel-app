/*Global Variables*/
projectData = {};
//api variables


// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors')
app.use(cors())

// Initialize the main project folder
// app.use(express.static('website'));
app.use(express.static('frontendFiles'));

// Setup Server
const port = 8000;
const server = app.listen(port, listenning);

function listenning()
{
    console.log("server is ready");
    console.log(`listenning on port: ${port}`)
}

/*HTTP requests*/
//GET route that returns the projectData
app.get('/all',function(req, res)
{
    console.log("got a GET request")
    res.send(projectData);
})

//POST route that adds incoming data to projectData
app.post('/addEntry', function(req, res)
{
    console.log("got a POST request")
    const dataGot = req.body;

    const newData = 
    {
        key: Object.keys(projectData).length +1,
        temperature: dataGot.temperature,
        date: dataGot.date,
        userResponse: dataGot.userResponse
    }

    projectData = newData;
    console.log(projectData);

    res.send('POST received')
})