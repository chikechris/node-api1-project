// implement your API here

const db = require('./data/db.js');
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('its working');
});

//Post Request
app.post('/api/users', (req, res) => {
  const user = req.body;
  if (user.name && user.bio) {
    db.insert(user)
      .then(user => res.status(201).json(user))
      .catch(err => {
        return res.status(500).json({
          error: 'There was an error while saving the user to the database',
        });
      });
  } else {
    return res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user.' });
  }
});

//Get request
app.get('/api/users', (req, res) => {
  db.find()
    .then(users => res.status(200).json(users))
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The users information could not be retrieved' });
    });
});

//Get request by Id
app.get('/api/users/:id', (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(user => {
      if (user === undefined) {
        res
          .status(404)
          .json({ message: 'The user with the specified id dose not exit' });
      }
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: 'The user information could not be retrieved.' });
    });
});

//Delete request by Id
app.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(deleted => {
      console.log(deleted);
      if (deleted === 0) {
        return res
          .status(404)
          .json({ message: 'The user with the specified id dose not exit' });
      }
      res.status(204).end();
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: 'The user information could not be retrieved.' });
    });
});

//Put request by Id
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const edits = req.body;

  if (!edits.name || !edits.bio) {
    return res
      .status(400)
      .json({ message: 'The user with the specified ID does not exist.' });
  }

  db.update(id, edits)
    .then(updated => {
      if (!updated) {
        return res
          .status(404)
          .json({ message: 'The user with the specified id dose not exit' });
      } else {
        res.status(200).json(updated);
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: 'The user information could not be retrieved.' });
    });
});

app.listen(5500, () => {
  console.log(`The app is up and running on port 5500`);
});
