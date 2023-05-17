# Puppies API with Typescript

This is a project to build a RESTful API in typescript using Node.js. I created a database in MongoDB and protected sensitive information with env variables. The aim was to practice and refine my use of the tools outlined, as well as regex and the use of Express middleware.

The frontend UI can be found [here](https://github.com/SMooreSwe/puppies-frontend)

### The Endpoints

- GET: `api/puppies`. Returns an array of all puppies.
- GET: `api/puppies/:id`. Returns the identified puppy.
- POST: `api/puppies`. Creates and returns a newly added puppy.
- PUT: `api/puppies/:id`. Updates the specific puppy.
- DELETE: `api/puppies/:id`. Deletes the puppy from the database.

### The Puppies

Each `puppy` is a document in the database that has the following attributes: 
    - id (using MongoDB's ObjectId)
    - breed
    - name
    - birth date
    
### The Tools

As outlined above, I use ExpressJS, Node.Js and MongoDB as the database, which I accessed using Mongo Atlas online. The project is coded in TypeScript.
