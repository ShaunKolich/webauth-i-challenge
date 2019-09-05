const express = require('express');
const helmet = require('helmet');

// const db = require('./data/dbconfig');

const db = require('./data/dbconfig');
const Users = require('./data/users-model');

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
    res.send('<h2>Only two FILES lol I AM THE BOSS!</h2>')
})

server.post('/api/register', (req, res) => {
    let user = req.body;
  
    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  
  server.post('/api/login', (req, res) => {
      let { user_name, password } = req.body;
  
    Users.findBy({ user_name })
      .first()
      .then(user => {
        if (user) {
          res.status(200).json({ message: `Welcome ${user.user_name}!` });
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
        .catch(({ message }) => {
        res.status(500).json(message);
      });
  });
  
  server.get('/api/users', (req, res) => {
    Users.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  });

module.exports = server;