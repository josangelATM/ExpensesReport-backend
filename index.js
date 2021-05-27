const express = require('express')
const app = express()
require('dotenv').config()
 
app.get('/', function (req, res) {
  res.send('Hello World')
})
 
const port = process.env.port || 3000

app.listen(port)