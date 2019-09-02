// implement your API here

const db = require('./data/db.js')
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('its working')
})

app.listen(5500, () => {
  console.log(`The app is up and running on port 5500`)
})
