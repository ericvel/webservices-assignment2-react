const express = require('express');
const router = express.Router();
global.ver = require('../../../config');
const jwt = require('jsonwebtoken');

// Array to store users
let users = [];

// Create User
router.post('/', (req, res) => 
{
    const user = req.body;

    users.push(user);
    res.status(200).json('User has been created ' + user.username);
});//POST request Create User

// Login
router.post('/login', (req, res) =>
{
    const user = req.body;
    let loginSuccess = false;

    // Find user in list of existing users
    users.forEach(u => 
    {
      if (u.username == user.username && u.password == user.password)
      {
        loginSuccess = true;
      }//if
    });//forEach loop

    if (loginSuccess)
    {
      // Generate a Json Web Token and store in global var
      ver.token = jwt.sign(user.username, 'shhhhh');
      res.status(200).send(ver.token);
      console.log(`Succesful login for user: ${user.username}`);
    }//if
    else
    {
      ver.token = '';
      res.status(403).json('Forbidden')
      console.log(`Login failed`);  
    }//else
});//POST request User Login


module.exports = router;
