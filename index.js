const express = require('express');
const app = express();
const cors = require('cors');
const favesRecipes = require('./routes/favesRecipesRoute')
require('dotenv').config(); // load .env variables

const PORT = process.env.PORT || 5050;

//Middleware
app.use(express.json());  // adds required body (name: req.body.name) 
// app.use(express.static('public'));  // allows to serve the images in public folder.
app.use(cors()); // allow cross origin resource sharing

// home route
app.get('/', (req, res) => {
    res.send('Welcome to the super API');
});

// // routing
app.use('/recipe', favesRecipes);


app.get('/')


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});  