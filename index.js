const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config(); // load .env variables

const PORT = process.env.PORT || 5050;

//Middleware
app.use(express.json());  // adds required body (name: req.body.name) 
// app.use(express.static('public'));  // allows to serve the images in public folder.
app.use(cors()); // allow cross origin resource sharing





app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});  