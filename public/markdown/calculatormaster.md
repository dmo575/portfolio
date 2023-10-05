# Introduction
A purely JS/CSS/HTML application with no extra libraries.

### Keeping the user updated
The application handles all possible edge cases gracefully, informing the user of everything that might happen. From the sate of the game to server operations and results.

### Client and server data validation
When sending data to the server, the client validates the data first to avoid overhead on the server. The data is however checked again in the server since the client side validation is just useful to avoid overhead when the user is interacting with the application in good faith (and because that is what happens most of the time, client side validation is actually important to not bother the server with wrong data send in good faith).

### Adaptive + Interactive
Works on all screen ratios and its filled with all kinds of animations to keep the user engaged.

### APIs
I use two APIs to render the user's country flag and also handle edge cases, plus my own API to send and get data related to the leaderboard.

**Custom API:** The server has several API endpoints to manage and access the leaderboard:
- **/send_score** - **POST**:
    - Body: { username: string, score: integer }
    - Returns: a stringyfied JSON containing data related to the user's score
- **/get_leaderboard?length=${ *leaderboardCapacity* }** - **GET**:
    - Returns: data on the top players, ordered

**Ipinfo.io API (used on the server):** I get the client's **direct IP** (The IP that is sent as the client IP in the HTTP request, if the client is using a proxy we wont be able to tell, we can only take the IP at face value) and send it to the **ipinfo** API to get the country code associated with it, I store that along the score and the username the client provided.

**Flagsapi.com API (used on the client):** I provide a country code to the **flagsapi** API in order to get a country flag. I handle edge cases when displaying the flags: If an error occurs during the fetching, I display a world icon instead of the flag.
Errors covered include:
- Providing "Unknown" as the country code (which happens for IP's that are not associated with a country like 127.0.0.1)
- Attempting to retrieve a flag that is not yet supported by the API (I havenst seen this one but its covered)
- A failed fetch for any other reason (connection issues with the API, anything)


### Database
I use SQLite for the database (via python's SQL_Alchemy module). Here is the .schema:


PLACE .schema HERE