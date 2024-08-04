const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let books = [];

// Create a new book
app.post('/books', (req, res) => {
    const book = req.body;
    books.push(book);
    res.status(201).send(book);
});

// Get all books
app.get('/books', (req, res) => {
    res.send(books);
});

// Then adding CRUD routes we have...

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
