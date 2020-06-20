const express = require('express');

const SchemeRouter = require('./schemes/scheme-router.js');

const server = express();

server.use(express.json());
server.use('/api/schemes', SchemeRouter);

server.get('/', (req,res) => {
    res.send(`
    <h2>Node API 3</h2>
    <p>Welcome to Project 3</p>
        `
    )
});


module.exports = server;