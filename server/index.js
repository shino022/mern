const express = require('express')
const app = express()
const port = 5000

let count = 0;

app.get('/api', (req, res) => {
  res.json({ count: count++ });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})