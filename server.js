const express = require('express');
const helmet = require('helmet');
const bycrypt = require('bcryptjs');
// const db = require('./data/dbconfig');
const session = require('express-session');
const db = require('./data/dbconfig');
const Users = require('./data/users-model');

const server = express();

const sessionConfig = {
    name: 'trackpad life',
    secret: 'monsoon demons messing with my life',
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly:true
    },
    resave: false,
    saveUninitialized: false
}

server.use(helmet());
server.use(express.json());
server.use(session(sessionConfig));

server.get('/', (req, res) => {
    res.send('<h2>Only two FILES lol I AM THE BOSS!</h2>')
})

server.post('/api/register', (req, res) => {
    let user = req.body;

    user.password = bycrypt.hashSync(user.password, 10);

    Users.add(user)
        .then(saved => {
            req.session.user = saved;
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
            console.log(user);
            if (user && bycrypt.compareSync(password, user.password)) {
                req.session.user = user;
                res.status(200).json({ message: `Welcome ${user.user_name}!, have a cookie!` });
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