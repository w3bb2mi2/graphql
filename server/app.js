const express = require("express")
const app = express()
const PORT = 3000
const schema = require("../schema/schema")

const {graphqlHTTP} = require('express-graphql')
const movie = require("../models/movie")

const mongoose = require("mongoose").connect("mongodb://localhost/graphql")
  .then(()=>console.log("mongo success"))
  .catch(e=>console.log(e))

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}))



app.listen(PORT, err => {
    err?console.log(error):console.log(`Server has been started on port: ${PORT}`)
})