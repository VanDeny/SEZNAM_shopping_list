const express = require('express')
const app = express()
const port = 3000

app.get('/shopping-list', (req, res) => {
    res.send('Hello World!')
})

app.get('/shopping-list/:id', (req, res) => {});

app.post('/shopping-list', (req, res) => {});

app.patch('/shopping-list/:id', (req, res) => {});

app.delete('/shopping-list/:id', (req, res) => {});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
