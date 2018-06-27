DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS todos CASCADE;
DROP TABLE IF EXISTS avatars CASCADE;
DROP TABLE IF EXISTS types CASCADE;

CREATE TABLE avatars (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  img BYTEA NOT NULL
);

CREATE TABLE types (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  avatar_id INTEGER REFERENCES avatars(id) ON DELETE CASCADE,
  creation_date timestamp
);

CREATE TABLE todos (
  id SERIAL PRIMARY KEY NOT NULL,
  type_id INTEGER REFERENCES types(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  is_done BOOL DEFAULT TRUE
);