const express = require('express')

const cors = require('cors')

const projectRouter = require('./routes/projectRouter')
const actionRouter = require('./routes/actionRouter')
const server = express()

server.use(express.json())
server.use(cors())
server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter)

server.get('/', (req, res) => {
    res.send(`
        <h1>Sprint Challenge</h1>
    `)
})

module.exports = server