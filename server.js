const express = require('express')

const projectRouter = require('./routes/projectRouter')
const actionRouter = require('./routes/actionRouter')
const server = express()

server.use(express.json())
server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter)

server.get('/', (req, res) => {
    res.send(`
        <h1>Sprint Challenge</h1>
    `)
})

module.exports = server