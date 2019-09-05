const express = require('express');
const helmet = require('helmet');

// const db = require('./data/dbconfig');

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
    res.send('<h2>Only two FILES lol I AM THE BOSS!</h2>')
})

module.exports = server;