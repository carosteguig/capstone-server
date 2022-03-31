const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config(); // load .env variables

const PORT = process.env.PORT || 5050;