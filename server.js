//--------------------------------SETUP
//require express in our app
const express = require("express");
const bodyParser = require("body-parser");
let db = require("./models");
// generate a new express app and call it 'app'
const app = express();

//---------------------------------MIDDLEWARE

// serve static files in public
app.use(express.static("public"));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));

//-------------------------------CONFIGURATION VARIABLES
const PORT = process.env.PORT || 3000;

//----------------------------- TEMP DATA

let newBookUUID = 18;

// ----------------------------ROUTES

// define a root route: localhost:3000/
app.get("/", (req, res) => {
  res.sendFile("views/index.html", { root: __dirname });
});

// get all books
app.get("/api/books", (req, res) => {
  // send all books as JSON response
  db.Book.find((err, books) => {
    if (err) {
      console.log("index error: " + err);
      res.sendStatus(500);
    }
    res.json(books);
  });
  console.log("books index");
});

// get one book
app.get("/api/books/:id", (req, res) => {
  // find one book by its id
  console.log("books show", req.params);
  for (let i = 0; i < books.length; i++) {
    if (books[i]._id === req.params.id) {
      res.json(books[i]);
      break; // we found the right book, we can stop searching
    }
  }
});

// create new book
app.post("/api/books", (req, res) => {
  // create new book with form data (`req.body`)
  console.log("books create", req.body);
  const newBook = req.body;
  newBook._id = newBookUUID++;
  books.push(newBook);
  res.json(newBook);
});

// update book
app.put("/api/books/:id", (req, res) => {
  // get book id from url params (`req.params`)
  console.log("books update", req.params);
  const bookId = req.params.id;
  // find the index of the book we want to remove
  const updateBookIndex = books.findIndex((element, index) => {
    return element._id === parseInt(req.params.id); //params are strings
  });
  console.log("updating book with index", deleteBookIndex);
  const bookToUpdate = books[deleteBookIndex];
  books.splice(updateBookIndex, 1, req.params);
  res.json(req.params);
});

// delete book
app.delete("/api/books/:id", (req, res) => {
  // get book id from url params (`req.params`)
  console.log("books delete", req.params);
  const bookId = req.params.id;
  // find the index of the book we want to remove
  const deleteBookIndex = books.findIndex((element, index) => {
    return element._id === parseInt(req.params.id); //params are strings
  });
  console.log("deleting book with index", deleteBookIndex);
  const bookToDelete = books[deleteBookIndex];
  books.splice(deleteBookIndex, 1);
  res.json(bookToDelete);
});

// Start Server
app.listen(PORT, () =>
  console.log(`Book app listening at http://localhost:${PORT}/`)
);
