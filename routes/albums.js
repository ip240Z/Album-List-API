const express = require('express');
const router = express.Router();
const fs = require('fs');

let USERS_FILE = './data/users.json';
const ALBUMS_FILE = './data/albums.json'

// router.get('/', (req, res) => {
//     res.send(`<h1>Welcome to the albums list</h1>
//     <h2>/albums/list to get a list of all albums in database</h2>`)
// });

router.get('/list', (req, res) => {
    fs.readFile(ALBUMS_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            res.status(500)
                .send("Error reading that file.")
            return;    
        } else {
            res.json(JSON.parse(data));
        }
    })
});

router.get('/list/:id', (req, res) => {
    const {id} = req.params;
    fs.readFile(ALBUMS_FILE, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send("Error reading the file")
            return;
        } else {
            data = JSON.parse(data);
            let targetAlbum = data.find(album => album.id === id);
            if(targetAlbum) {
                res.json(targetAlbum);
            } else {
                res.status(404)
                .send(`<h1>Error, Unknown album...</h1>`);
            }
        }
    })
})

router.get('/search/', (req, res) => {
    const searchString = req.query.s;    
    fs.readFile(ALBUMS_FILE, 'utf-8', (err, data) => {
                if (err) {
            res.status(500).send("Error reading the file")
            return;
        } else {
            data = JSON.parse(data);
            console.log(data);
            let searchResults = data.filter(album => {
                return album.title.toLowerCase().includes(searchString.toLowerCase()) || 
                       album.artist.toLowerCase().includes(searchString.toLowerCase()) ||
                       album.releaseYear.includes(searchString);
            });
            console.log(searchResults)
            res.json(searchResults);
        }
    })    
})

router.post('/', (req, res) => {
    fs.readFile(ALBUMS_FILE, 'utf-8', (err, data) => {
        if (err) {
            console.error(err)
            res.status(500).send('Error reading the file');
            return;
        } 
        const albums = JSON.parse(data);

        //create a new album with data given from request
        const newAlbum = {id: (albums.length +1).toString(), title: req.body.title, cover: req.body.cover, artist: req.body.artist, releaseYear: req.body.releaseYear};
        albums.push(newAlbum);
        console.log(newAlbum);
        console.log(albums)


        // Here we write the updated album array back into the ALBUMS FILE page with the album array JSON stringified
        fs.writeFile(ALBUMS_FILE, JSON.stringify(albums), err => {
            if (err) {
                console.error(err)
                res.status(500).send('Error writing the file');
                return;
            } 
            // res.json(albums)
        })

    })
    res.send('post req accepted for albums')  
})

module.exports = router