// import places.js
const Place = require('./models/Place');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const url = 'mongodb://127.0.0.1:27017/places'


// dependencies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use(cors());
app.use(morgan('tiny'));

morgan.token('body', function getBody(req) {
    return JSON.stringify(req.body);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// READ operation that serves index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// post to index.php
app.post('/search', (req, res) => {
  console.log(req.body);
});

const db = mongoose.connection;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

db.once('open', () =>
 console.log('Connected to MongoDB')
);

db.on('error', err => {
  console.log('Error connecting to MongoDB:', err);
})

async function runCode() {
  const test = new Place({
    name: 'test',
    type: 'test',
    address: 'test',
  })
  const test2 = new Place({
    name: 'test2',
    type: 'test2',
    address: 'test2',
  })

  await Place.deleteMany({})
  const doc = await test.save();
  const doc2 = await test2.save();

  const x = await Place.findOneAndDelete({name: 'test'});
  const y = await Place.findOneAndDelete({name: 'test2'});
  const doc3 = await Place.find()
  console.log(doc3);

}

runCode()
  .catch(err => console.error(err))


