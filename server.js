"use strict";

require('dotenv').config();

const PORT            = process.env.PORT || 8080;
const express         = require("express");
const bodyParser      = require("body-parser");
const methodOverride  = require("method-override");
const sass            = require("node-sass-middleware");
const app             = express();


const morgan          = require('morgan');

// Seperated Routes for each Resource
const usersRoutes     = require("./routes/users");
const todosRoutes     = require("./routes/todos");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/users", usersRoutes);
app.use("/todos", todosRoutes);

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
