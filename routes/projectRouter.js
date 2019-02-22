const express = require('express')
const Projects = require('../data/helpers/projectModel')
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const projects = await Projects.get()
        return res.status(200).json(projects)
    } catch(error) {
        console.log(error)
        res.status(500).json({
            error: "There was an error retrieving the projects"
        })
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const project = await Projects.get(id)
        if (typeof project.description === "string") {
            return res.status(200).json(project)
        } else {
            return res.status(404).json({ message: "The project with the provided ID does not exist" })
        }
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: "There was a problem while trying to retrieve the project" })
    }
})

router.get('/:id/actions', async (req, res) => {
    const id = req.params.id
    try {
        const projectActions = await Projects.getProjectActions(id)
        console.log(projectActions)
        if (projectActions.length > 0) {
            return res.status(200).json(projectActions)
        } else {
            return res.status(404).json({ error: "There are no actions associated with this project" })
        }
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: "There was an error while trying to retrieve the projects actions" })
    }
})

router.post('/', async (req, res) => {
    const {name, description, completed} = req.body
    if (!name || !description) {
        return res.send({ status: 400, message: "Please provide name and description"})
    } else {
        try {
            const project = await Projects.insert(req.body)
            res.status(201).json(project)
        } catch(error) {
            console.log(error)
            res.status(500).json({ error: "There was an error adding this project" })
        }
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    const changes = req.body
    try {
        const project = await Projects.update(id, changes)
        if (typeof project.description === "string") {
            res.status(200).json(project)
        } else {
            res.status(404).json({ error: "No such project exists with this id" })
        }
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: "There was an error while trying to update this project" })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const deleted = await Projects.remove(id)
        console.log(deleted)
        if (deleted > 0) {
            res.status(200).json(deleted)
        } else {
            res.status(404).json({ error: "No such project with that ID exists" })
        }
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: "There was an error while trying to delete this project" })
    }
})


module.exports = router