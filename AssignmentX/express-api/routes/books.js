const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

let books = [
    { id: 1, title: '1984', author: 'George Orwell' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' }
];

// Create - POST /books
router.post('/', auth, (req, res) => {
    const newBook = { id: books.length + 1, ...req.body };
    books.push(newBook);
    res.status(201).json(newBook);
});

// Read all - GET /books
router.get('/', auth, (req, res) => {
    res.json(books);
});

// Read one - GET /books/:id
router.get('/:id', auth, (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found');
    res.json(book);
});

// Update - PUT /books/:id
router.put('/:id', auth, (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Book not found');
    
    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    
    res.json(book);
});

// Delete - DELETE /books/:id
router.delete('/:id', auth, (req, res) => {
    books = books.filter(b => b.id !== parseInt(req.params.id));
    res.status(204).send();
});

module.exports = router;
