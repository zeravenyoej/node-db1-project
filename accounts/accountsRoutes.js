const express = require('express')
const route = express.Router()
const db = require('../data/dbConfig')

route.get('/', async (req, res, next) => {
    try {
        const accounts = await db.select("*").from("accounts")
        res.json(accounts)
    } catch(err) {
        next(err)
    }
})

route.get('/:id', async (req, res, next) => {
    try {
        const account = await db.first("*").from("accounts").where({ id: req.params.id })
        res.json(account)
    } catch(err) {
        next(err)
    }
})

route.post('/', async (req, res, next) => {
    try {
        const payload = {
            name: req.body.name,
            budget: req.body.budget
        }
        const [id] = await db("accounts").insert(payload)
        const newPost = await db("accounts").where({id: id})
        res.status(201).json(newPost)

        // const payload = {
        //     name: req.body.name,
        //     budget: req.body.budget
        // }
        // const newPost = await db("accounts").insert(payload)
        // res.status(201).json(newPost)

    } catch(err) {
        next(err)
    }
})

route.put('/:id', async (req, res, next) => {
    try {
        const payload = {
            name: req.body.name,
            budget: req.body.budget
        }
        //We can update an account with only one asych function, but dividing 'update' into a separate one 
        // will only return a number, not the actual object, so doing that first and THEN querrying it 
        // will allow us to return a complete json object
        await db("accounts").where({id: req.params.id}).update(payload)
        const updatedAcc = await db("accounts").where({id: req.params.id}).first()
        res.json(updatedAcc)

    } catch(err) {
        next(err)
    }
})

route.delete('/:id', async (req, res, next) => {
    try {
        await db("accounts").where({id: req.params.id}).del()
        res.status(404).end()
    } catch(err) {
        next(err)
    }
})

module.exports = route