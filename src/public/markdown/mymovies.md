# Introduction
My first ever full website. It was my final project for CS50x. I didn't know a lot of the things I know now and the code shows it but, nevertheless, the website has a bunch of really mentionable features.

### User collections
Any user can mark any movie as "Seen", "Favorite" or "Pending".

- **Seen (SAW):** Marking a movie as "Seen" unmarks it from "Pending".
- **Favorite (FAV):** Marking a movie as "Favorite" unmarks it from "Pending" and marks it as "Saw" as well.
- **Pending (PEN):** Marking a movie as "Pending" unmarks it from both "Favorite" and "Saw".

### Searching for movies
There are two places you can search movies from: one is the iMDB database, the other one is the application's own server.

- **Searching for a movie (iMDB):** Searching the iMDB works by first typing into the search box and then hitting ENTER. This triggers the display of a placeholder for search results while the fetch takes place. Once the results come in, the placeholders are taken down and the actual results display.

- **Searching your collection:** As a user, you can search your own collection of movies. When you do this you are fetching from mymovies' database itself. This allows the application to implement **instant** AJAX searching, which updates the search results with every change in the search box, instead of waiting for the user to press the ENTER key.

**Why two searching methods like that?:** Getting a response from any fetch request from the iMBD API takes some time, so updating the results as the user types is not feasible. For this reason the application only uses instant AJAX for fetches done to the server and a more traditional form of search with placeholders for fetching from the iMDB.

![{"className": "img-md img-w-l"}](./images/markdown/mymovies/ajax.gif)
![{"className": "img-md img-w-l"}](./images/markdown/mymovies/search.gif)

### Mixing user data with iMDB query results
Whenever search results come up, the application scans them and updates each result item with the user's data. (Apply the favorite status to any item that the user has selected as favorite, etc...)

### How the database works
The data base stores users, their passwords (they are hashed with the `werkzeug` module before being stored) and data regarding their collections.

Each time a movie is added to any collection, the server checks if that movie is part of its own movies list. If not, it is added to it. This is what allows users to get instant results when searching their collection.

The server add movies whenever a user interacts with them and removes them whenever they don't belong to anyone's collection anymore. This keeps the database clean of any "unmarked" movies.

The server makes sure to store movies once by assigning them an ID which is the one that links a movie to any amount of user collections.

### Users only
The website is only accessible to registered users. Trying to access any of its routes without beign logged in will redirect you to the login screen.

### Global chatroom
The web-page features a simple but functional chatroom available to all its users.

![{"className": "img-md img-w-l"}](./images/markdown/mymovies/chatroom.gif)

### User settings
Any user can clear the account's collections or delete the whole account from the server via the user's settings.

### Client and server side checking
We do client and server side data validation each time someone logs in or registers.

### Database structure
I used SQLite for the database. Here is the .schema:

```
CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, hash TEXT);

CREATE TABLE user_movies (user_id INTEGER, movie_id TEXT, fav INTEGER, pen INTEGER, saw INTEGER, FOREIGN KEY (user_id) REFERENCES users(id), FOREIGN KEY (movie_id) REFERENCES movies(id));

CREATE TABLE movies (id TEXT PRIMARY KEY, title TEXT, curated_title TEXT, image TEXT, description TEXT);

CREATE TABLE chatroom (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, message TEXT, date TEXT);
```
