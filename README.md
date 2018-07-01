# TODO BOT

Welcome to Todo Bot.

Todo Bot is a SMART todo list to keep track of restaurants, movies, books or purchases you want to keep track of.

Using Wolfram API to classify your todo item Todo Bot will then add your todo item to the appropriate category and provide  useful information.

For more detailed links like reviews or where to buy your purchase just click the picture of your todo and you will be redirected to the appropriate website.

If Todo Bot has classified your todo wrong you can click edit to choose the appropraite category.

To keep track of what you have done you can edit your item and select done and the colored bar at the bottom of the card will turn green to indict the todo is complete.

## Getting Started

1. Create the `.env` and enter your database parameters and API keys for running on local machine.
  - DB_HOST=localhost
  - DB_USER=
  - DB_PASS=
  - DB_NAME=
  - DB_PORT=
  - GOODREADSKEY=
  - YELPKEY=
  - WOLFRAMKEY=
  - IMDBKEY=
  - WALMARTKEY=

2. Install dependencies: `npm i`
3. Fix to binaries for sass: `npm rebuild node-sass`
4. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
5. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
6. Run the server: `npm run local`
7. Visit `http://localhost:8080/`

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
- body-parser 1.15.2 or above
- dotenv 2.0.0 or above
- ejs 2.4.1 or above
- express 4.13.4 or above
- google-search-scraper 0.1.0 or above
- knex 0.11.10 or above
- knex-logger 0.1.0 or above
- method-override 2.3.10 or above
- moment 2.22.2 or above
- morgan 1.7.0 or above
- node-sass 4.9.0 or above
- node-sass-middleware 0.11.0 or above
- pg 6.0.2 or above
- xml2js 0.4.1 or above
- nodemon" 1.17 or above

## Front Page

![index](https://github.com/leor8/midterm_todo_list/blob/master/Screenshots/Index.JPG)

## NewTodo

![newtodo](https://github.com/leor8/midterm_todo_list/blob/master/Screenshots/newtodo.JPG)
![newbook](https://github.com/leor8/midterm_todo_list/blob/master/Screenshots/newbook.JPG)

# Edit todo
* Movie Jurassic Park

![Jurassicpark Movie](https://github.com/leor8/midterm_todo_list/blob/master/Screenshots/edittodo.JPG)

* Jurrasic park movie deleted and the book is added

![Jurrasic park the book](https://github.com/leor8/midterm_todo_list/blob/master/Screenshots/editedbook.JPG)