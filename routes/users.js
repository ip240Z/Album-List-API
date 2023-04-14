var express = require('express');
var router = express.Router();
const fs = require('fs');

const USERS_FILE = './data/users.json'

/* GET users listing. */
router.get('/', function(req, res, next) {
  fs.readFile(USERS_FILE, 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
      res.status(500)
        .send("Error reading USER file")
    };
    res.json(JSON.parse(data));
  })
});


// POST new user to user list
router.post('/', (req, res) => {
  fs.readFile(USERS_FILE, 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
      res.status(500).send("Error reading the file");
      return;
    }
    const users = JSON.parse(data);

    const newUser = {userId: ((users.length + 1).toString() + Math.round(Math.random()*10)), name: req.body.name, albums: []};
    users.push(newUser);
    console.log(users)

    fs.writeFile(USERS_FILE, JSON.stringify(users), err => {
      if(err) {
        console.log(err);
        res.status(500).send("Couldn't write the user file")
        return;
      }
      res.json(users);
    })
  })
})

router.get('/:id', (req, res) => {
  const {id} = req.params;
  fs.readFile(USERS_FILE, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).send("Error reading the USER file");
    }
    let users = JSON.parse(data);
    let targetUser = users.find(user => user.userId === id.toString());
    if(targetUser) {
      res.json(targetUser);
    } else {
      res.status(404)
        .send(`<h1>That user never existed and will never exist, you crazy person</h1>
        <h3>*Unless you decided to do a post request at the root users directory...*</h3>`);
    }
  })
})

router.put('/:id', (req, res) => {
  const {id} = req.params;

  fs.readFile(USERS_FILE, 'utf-8', (err, data) => {
    if(err) {
      console.error(err)
      res.status(500).send("Error reading the USER file");
      return;
    }
    let users = JSON.parse(data);
    console.log(data)
    console.log(id)
    let updatedUser = users.find(user => user.userId === id.toString())
    updatedUser.name = req.body.name
    console.log(updatedUser);

    fs.writeFile(USERS_FILE, JSON.stringify(users), err => {
      if (err) {
        console.error(err)
        res.status(500).send("Error writing USER file");
        return;
      }
      // res.json(users);
    })
  })
  res.send("PUT req accepted for users")
});




router.delete('/:id', (req, res) => {
  const {id} = req.params;

  fs.readFile(USERS_FILE, 'utf-8', (err, data) => {
    if(err) {
      console.error(err)
      res.status(500).send("Error reading the USER file");
      return;
    }
    let users = JSON.parse(data);
    let targetUser = users.find(user => user.userId === id.toString());
    if(targetUser) {
      users.splice(users.indexOf(targetUser), 1);
    } else if (!targetUser) {
      console.error("No such user to delete");
      res.status(500).send("Error, no user with that ID found.")
      return;
    }

    fs.writeFile(USERS_FILE, JSON.stringify(users), err => {
      if(err) {
        console.error(err)
        return res.status(500).send("Error writing the USER file");
      }
    })
  })
    res.send("DELETE req accepted for users")
});


module.exports = router;
