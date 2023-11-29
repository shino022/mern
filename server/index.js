const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose');

// Connecting to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/test');

// Checking if connected to MongoDB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Init schema
const countSchema = new mongoose.Schema({
  value: { type: Number }
});

// Init model
const Count = mongoose.model('Count', countSchema);

// Create a new count document with the initial value of zero
const initialCount = new Count({value: 0});
initialCount
.save()
.then(() => {console.log('Count initialized to zero')})
.catch((err) => {console.error('Error initializing count:', err)});

// Handle requests for the count
app.get('/api', (req, res) => {
  // Find the count document in the database
  Count.findOne()
    .then(async (count) => {
      // Increment the count in the database
      count.value++;
      await count.save();

      // Return the incremented count to the client
      console.log(`Count incremented to ${count.value}!`)
      res.json({ count: count.value });
    })
    .catch((err) => {
      // Catch any errors
      console.error('Error incrementing count:', err);
      res.status(500).send('Error incrementing count');
    });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})