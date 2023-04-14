## Music Album Management API

This API aims to create a library of Music albums that includes basic

Within directory of /albums, here are the request methods:


`/albums/list` - GET
- Returns a list of all Albums in the API collection.

`/albums/list/:id` - GET
- Returns a single album by it's id
- Example response: 

```
    {
        "id": "1",
        "title": "Zeppelin I",
        "cover": "./images/LZ1.jpeg",
        "artist": "Led Zeppelin",
        "releaseYear": "1969"
    }
```

`/albums/search/?&s="search value"` - GET
- Returns a list of all albums that have the "search value" inside their title, cover, artist or releaseYear properties.
- Example response of /albums/search/?&s=mo
- These albums have the letters "mo" somewhere inside their key value pairs.

```
    {
        "id": "5",
        "title": "The Dark Side of the Moon",
        "artist": "Pink Floyd",
        "releaseYear": "1973"
    },
    {
        "id": "7",
        "title": "Rumours",
        "artist": "Fleetwood Mac",
        "releaseYear": "1977"
    }
```

`/albums/` - POST 
- POST request that allows you to create new albums. 
- The album id is generated automatically, so don't worry about that. 
- Be sure to follow this example object model for the POST request: 

```
    {
        "title": "",
        "artist": "",
        "releaseYear": ""
    } 
```


- This completes the Album lists album API functionalities. 



The following is documentation for the user side of the API, operating from /users/

Use front-end dev techniques to try and add albums to a users albumlist!




`/users/` - GET
- Returns a list of all users, displaying their name, userId and albums list.

`/users/` - POST
- Creates a new user with a unique id number and an empty array for their albums list
- Provide the "name" property with a username!

`/users/:id` - GET
- Returns a single user object based on their userId.
- Example return of `/users/1`:

```
  {
    "userId": "1",
    "name": "Ian",
    "albums": []
  }
```

`/users/:id` - PUT
- Selects a user by their userId and allows manipulation of that users "name" property
- Example of `/users/1` PUT request with "Blarg" as value for name:

```
  {
    "userId": "1",
    "name": "Ian",
    "albums": []
  }
```
- This will turn into: 

```
  {
    "userId": "1",
    "name": "Blarg",
    "albums": []
  }
```
 
`/users/:id` - DELETE
- Targets a user by userId and deletes that user from the database completely.
- Great for destroying the drum and bass mix tape you made for your girlfriend you had in the late 90's while you were chugging Mountain Dew and wearing JNCO jeans.

