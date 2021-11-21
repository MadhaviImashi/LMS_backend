//import express pckg
const express = require("express");

//create a server using Express.js
const server = express();

server.listen(3000, () => {
  console.log("Server running on port 3000");
});

//hence post request URL is encoded, we need to first decode them
server.use(express.urlencoded({ extended: true }));
//specify the type of request data as JSON
server.use(express.json());

let books = [
  {
    id: "1",
    title: "Harry Potter",
    author: "J. K. Rowling",
    isAvailable: true,
    burrowedMemberId: "",
    burrowedDate: "",
  },
  {
    id: "2",
    title: "Charlie and the Chocolate Factory",
    author: "Roald Dahl",
    isAvailable: true,
    burrowedMemberId: "",
    burrowedDate: "",
  },
];

// /book :View all books
server.get("/book", (req, res) => {
  res.send(books);
});

// /book/:id : get single book
server.get("/book/:id", (req, res) => {
  const id = req.params.id;
  const book = books.find((book) => book.id === id);
  res.send(book);
});

// /book: add book
server.post("/book", (req, res) => {
  const { title, author } = req.body;

  const book = {
    id: Math.random().toString(16).slice(2),
    title,
    author,
    isAvailable: true,
    burrowedMemberId: "",
    burrowedDate: "",
  };
  books.push(book);
  res.send(book);
});

// /book/:id/burrow : burrow book
// book/1/burrow
// burrowedMemberId, burrowedDate
server.put("/book/:id/burrow", (req, res) => {
  const id = req.params.id;
  const { burrowedMemberId, burrowedDate } = req.body;

  const bookIndex = books.findIndex((book) => book.id === id);
  books[bookIndex] = {
    ...books[bookIndex],
    isAvailable: false,
    burrowedMemberId,
    burrowedDate,
  };

  res.send(books[bookIndex]);
});

// /book/:id/return : return book
// /book/1/return
server.put("/book/:id/return", (req, res) => {
  const id = req.params.id;

  const bookIndex = books.findIndex((book) => book.id === id);
  books[bookIndex] = {
    ...books[bookIndex],
    isAvailable: true,
    burrowedMemberId: "",
    burrowedDate: "",
  };

  res.send(books[bookIndex]);
});

// /book/:id Put: Edit a book
// title, autor
server.put("/book/:id", (req, res) => {
  const id = req.params.id;
  const { title, author } = req.body;

  const bookIndex = books.findIndex((book) => book.id === id);
  books[bookIndex] = {
    ...books[bookIndex],
    title,
    author,
  };

  res.send(books[bookIndex]);
});

// /book/:id :Delete: Delete book
// /book/1
server.delete("/book/:id", (req, res) => {
  const id = req.params.id;

  books = books.filter((book) => book.id !== id);
  res.send(id);
});

//---------------------------------------------------------------------for Members--------------------------------------------------------

let members = [
  {
    id: "1",
    firstName: "Imashi",
    lastName: "Uyanahewa",
    phone: "+94 77 123 5869",
    address: "dkdkdk",
    nic: "995079223v",
    userType: "",
    isAvailable: true,
  },
  {
    id: "2",
    firstName: "Pavani",
    lastName: "Fernando",
    phone: "+94 77 123 5869",
    address: "dkdkdk",
    nic: "995279223v",
    userType: "",
    isAvailable: true,
  },
  {
    id: "3",
    firstName: "Hashani",
    lastName: "Gamage",
    phone: "+94 77 123 5869",
    address: "dkddfdkdk",
    nic: "995073223v",
    userType: "",
    isAvailable: true,
  },
  {
    id: "4",
    firstName: "Sahasra",
    lastName: "Withanage",
    phone: "+94 77 123 5869",
    address: "dkdkdf dk",
    nic: "998079223v",
    userType: "",
    isAvailable: true,
  },
];

// /member : view all members
server.get("/member", (req, res) => {
  res.send(members);
});

// /member/:id : view single member
// /member/1
server.get("/member/:id", (req, res) => {
  const id = req.params.id;
  const member = members.find((member) => member.id === id);
  res.send(member);
});

// /member : add new member
server.post("/member", (req, res) => {
  const { firstName, lastName, phone, address, nic, userType } = req.body;

  const member = {
    id: Math.random().toString(16).slice(2),
    firstName,
    lastName,
    phone,
    address,
    nic,
    userType,
    isAvailable: true,
  };
  members.push(member);
  res.send(member);
});

// /member/:id : edit member details
// /member/1
server.put("/member/:id", (req, res) => {
  const id = req.params.id;
  const { firstName, lastName, phone, address, nic, userType} = req.body;

  const memberIndex = members.findIndex((member) => member.id === id);
  members[memberIndex] = {
    ...members[memberIndex],
    firstName,
    lastName,
    phone,
    address,
    nic,
    userType,
  };

  res.send(members[memberIndex]);
});

// /member/:id : delete member
// /member/1
server.delete("/member/:id", (req, res) => {
  const id = req.params.id;

  //filter function will iterate the members array and filter the members of which the id is not equal to the param.id
  // which simply replace the old array with a new one which doesn't contain the member of which the id is equal to param.id
  members = members.filter((member) => member.id !== id);
  res.send(id);
});


//set 404 msg as the default route
server.use((req, res) => {
    res.type("txt");
    res.send("404 not found");
});