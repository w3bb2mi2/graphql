const express = require("express")
const app = express()
const PORT = 3000

const {graphqlHTTP} = require('express-graphql')

app.use('/graphql', graphqlHTTP({}))

app.listen(PORT, err => {
    err?console.log(error):console.log(`Server has been started on port: ${PORT}`)
})