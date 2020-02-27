const express = require('express');
const db = require('./data/dbConfig.js');
const server = express();
const colors = require('colors');
const accountsRoutes = require('./accounts/accountsRoutes')

server.use(express.json());
server.use('/accounts', accountsRoutes)
server.use(req, res, next, () => {
    res.status(404).json({message: 'Route not found'})
})
server.use(err, req, res, next, () => {
    console.log('ERROR'.red, err)
    res.status(500).json({errMessage: 'Something went wrong'})
})
module.exports = server;