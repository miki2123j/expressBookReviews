const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  books.push({"author": req.query.authour,"title": req.query.title, "reviews": req.query.reviews})
  return res.status(200).json({message: "Book has been added", books});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).send(JSON.stringify({books},null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const { isbn } = req.params.isbn;
  let filtered_book = books.filter((book) => book.isbn === isbn);

  if (!filtered_book) {
    return res.status(404).json({ message: "Book not found" });
  }

  return res.status(200).send(JSON.stringify({filtered_book},null,4));

 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const { author } = req.params.author;
  let filtered_book = books.filter((book) => book.author === author);

  if(!filtered_book){
    return res.status(404).json({message:"Author not found"});
  }
  return res.status(200).send(JSON.stringify({filtered_book},null,4));

});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const { title } = req.params.title;
  let filtered_book = books.filter((book) => book.title === title);

  if(!filtered_book){
    return res.status(404).json({message:"Title not found"});
  }
  return res.status(200).send(JSON.stringify({filtered_book},null,4));

});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const { isbn } = req.params.isbn;
  let filtered_reviews = reviews.filter((review) => review.isbn === isbn);
  if(!filtered_reviews){
    return res.status(404).json({message:"Review not found"});
  }
  return res.status(200).send(JSON.stringify({filtered_reviews},null,4));

});

module.exports.general = public_users;
