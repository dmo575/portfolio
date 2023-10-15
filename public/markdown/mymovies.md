# Introduction
My first ever full website. It was my final project for CS50x. I didn't knew a lot of the things I know now and the code shows it but nevertheless the website has a bunch of really cool features.

### User collections:
Any user can mark any movie as "Seen", "Favorite" or "Pending".

- Seen (SAW): Marking a movie as "Seen" unmarks it from "Pending".
- Favorite (FAV): Marking a movie as "Favorite" unmarks it from "Pending" and marks it as "Saw" as well.
- Pending (PEN): Marking a movie as "Pending" unmarks it from both "Favorite" and "Saw"

### Searching for movies:
There are two places you can search movies from, one is the iMDB database, the other one is the application's own server.

**Searching for a movie:** Searching the iMDB works by first typing onto the search box and then hitting ENTER. This triggers the display of a placeholder for search results while the fetch takes place. Once the results come in the placeholders are taken down and the actual results displayed.

**Searching your collection:** As a user, you can search your own collection of movies. When you do this you are fetching to mymovies' databse itself. This allows the application to implement AJAX searching, which updated the search results at every change in the search box.

**Why two searching methods like that?:** At the beginning I wanted to implement AJAX for both of them but when I noticed that fetching to the iMDN API took so long, I decided to leave the AJAX for my server and put some placeholders for iMDB.

### Mixing user data with iMDB query results:
I make sure to scan the results of any iMDB query and update their collection statuses for the given user.

### How the database works:
The data base stores users, their passwords (they are hashed before being stored), and data regarding their collections.

Each time a movie is added to any collection, the server checks if that movie is part of its own movies list. If not, it gets added to it. This is what allows users to get instant results when searching their collection.

Since we add movies whenever a user interacts with them, we also remove them whenever they dont belong to anyone's collection anymore. This keeps the database clean of any "unused" movie.

We make sure to store movies once, we assign them with an ID and that ID is the one that links a movie to any ammount of user collections.

### Users only:
The website is only accessible to registered users, trying to access any of its routes without beign logged in will redirect you to the login screen.

### Global chatroom:
The webpage features a simple but functional chatroom availible to all its users.

### User settings:
Any user has the hability to clear the account's collections or delete the whole account from the server, its all in the user's setings.

### Client and server side checking:
We do client and server side checking for when we want to log in or register

### Database structure:
Heres the .schema: