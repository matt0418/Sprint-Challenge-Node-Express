const express = require('express')
const Actions = require('../data/helpers/actionModel')
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const actions = await Actions.get()
        return res.status(200).json(actions)
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: "There was an error retrieving the actions" })
    }
})

router.get('/:id', async(req, res) => {
    const id = req.params.id
    try {
        const action = await Actions.get(id)
        console.log(action.description.length)
        if (action.description.length > 0) {
            return res.status(200).json(action)
        } else {
            return res.status(404).json({ error: "No actions exist with this id" })
        }
        
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: "There was an error while trying to retrieve the action" })
    }
})

router.post('/', async(req, res) => {
    const {project_id, description, notes, completed} = req.body
    if (!project_id || !description || description.length > 128 || !notes) {
        return res.send({ status: 400, message: "Please make sure you provide all neccesary field" })
    } else {
        try {
            const action = await Actions.insert(req.body)
            res.status(200).json(action)
        } catch(error) {
            console.log(error)
            res.send(500).json({ error: "There was an error trying to post this action" })
        }
    }
})

router.put('/:id', async(req, res) => {
    const id = req.params.id
    const changes = req.body
    try {
        const action = await Actions.update(id, changes)
        res.status(200).json(action)
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: "There was an error while trying to update the action" })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const count = await Actions.remove(id)
        if (count > 0) {
            res.status(200).json(count)
        } else {
            res.status(404).json({ error: "No action with this id exists" })
        }
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: "There was an error while trying to delete this action" })
    }
})

module.exports = router