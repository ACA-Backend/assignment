// routes/books.js
const express = require('express');
const router = express.Router();

let books = []; // In-memory data storage

// Create a new book
router.post('/', (req, res) => {
    const book = req.body;
    books.push(book);
    res.status(201).send(book);
});

router.get('/', (req, res) => {
    res.status(200).json(books);
});

router.get('/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found');
    res.status(200).json(book);
});

router.put('/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found');

    Object.assign(book, req.body);
    res.status(200).send(book);
});

router.delete('/:id', (req, res) => {
    const index = books.findIndex(b => b.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Book not found');

    const deletedBook = books.splice(index, 1);
    res.status(200).send(deletedBook);
});

module.exports = router;
