const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connect to MongoDB (creates 'bookstore' DB if not exists)
mongoose.connect('mongodb://127.0.0.1:27017/bookstore')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Book schema and model
const bookSchema = new mongoose.Schema({
  title:   { type: String, required: true },
  author:  { type: String, required: true },
  price:   { type: Number, required: true },
  genre:   { type: String, required: true }
});
const Book = mongoose.model('Book', bookSchema, 'books');

// Insert one initial book if collection is empty
async function insertInitialBook() {
  const count = await Book.countDocuments();
  if (count === 0) {
    await Book.create({
      title: "The Alchemist",
      author: "Paulo Coelho",
      price: 299,
      genre: "Fiction"
    });
    console.log('Inserted initial book.');
  }
}
insertInitialBook();

// Retrieve all books (styled HTML table)
app.get('/books', async (req, res) => {
  const books = await Book.find();
  let html = `
  <style>
    body { font-family: Arial, sans-serif; background: #f7f7f7; }
    h2 { color: #333; }
    table { border-collapse: collapse; margin: 20px 0; width: 90%; background: #fff; }
    th, td { padding: 10px 15px; text-align: center; }
    th { background: #0074D9; color: #fff; }
    tr:nth-child(even) { background: #f2f2f2; }
    tr:hover { background: #e6f7ff; }
    td { border-bottom: 1px solid #ddd; }
    .id { font-size: 0.9em; color: #555; }
  </style>
  <h2>Book List (${books.length})</h2>
  <table>
    <tr>
      <th>Book ID</th>
      <th>Title</th>
      <th>Author</th>
      <th>Price</th>
      <th>Genre</th>
    </tr>`;
  books.forEach(book => {
    html += `<tr>
      <td class="id">${book._id}</td>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.price}</td>
      <td>${book.genre}</td>
    </tr>`;
  });
  html += '</table>';
  res.send(html);
});

// Add a new book
app.post('/books', async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.send('Book added!');
  } catch (err) {
    res.status(400).send('Error adding book: ' + err.message);
  }
});

// Update book details by ID
app.put('/books/:id', async (req, res) => {
  try {
    const result = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (result) {
      res.send('Book updated!');
    } else {
      res.status(404).send('Book not found.');
    }
  } catch (err) {
    res.status(400).send('Error updating book: ' + err.message);
  }
});

// Delete a book by ID
app.delete('/books/:id', async (req, res) => {
  try {
    const result = await Book.findByIdAndDelete(req.params.id);
    if (result) {
      res.send('Book deleted.');
    } else {
      res.status(404).send('Book not found.');
    }
  } catch (err) {
    res.status(400).send('Error deleting book: ' + err.message);
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
