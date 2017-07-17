const express = require('express');
const api = express.Router();


let message  =  [
  {name: 'remy', comment: 'Hello World 1'},
  {name: 'chau', comment: 'Hello World 2'},
  {name: 'nguyen', comment: 'Hello World 3'},
];

api.get('/message', (req,res) => {
  return res.json(message);
});

api.get('/message/:user',(req,res) => {
    let user = req.params.user
    let result = message.filter(item => item.name == user);
    return res.json(result);
});


module.exports = api;
