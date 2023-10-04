# Introduction
My first ever full website. It was my final project for CS50x. I didn't knew a lot of the things I know now and the code shows it but nevertheless the website has a bunch of really cool features like:

- **Chatroom**: all users have access to a global live chatroom where they can participate (I used socketIO)
- Registering and logging in/out (username and password, no email required)
- Restricted access to the webpage unless logged in
- Hability to search movies and series (trough the imdb API)
- Instant search results as you type (AJAX is called I believe)
- Keep track of movies per user and collection in an efficient way (the database will not repeat the same movies and will properly add and remove movies)
- Three collections to add movies to as a user
    - Seen (SAW): The movie has been watched by the user
    - Favorite (FAV): The movie is a favorite for the user
    - Pending (PEN): The movie is in the "to watch" list
- Placeholder images while fetching from the API
- Hability to filter user movies by collection
- Did both back-end and front-end
- Responsive design (Hey! it might be ugly but it works dammit!)