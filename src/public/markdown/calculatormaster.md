# Introduction
A purely JS/CSS/HTML application with no extra libraries.

### Rules of the game !
In this minigame, your task is to input the given equation on the calculator. But the one you are using is not a simple calculator, it keeps on morphing before your very own eyes, and to top it all, any mistakes resets your console!

Every time you complete an equation the calculator layout will change, and every time it will get weirder. The equation will also get harder at each new iteration.

![{"className": "img-md img-w-s"}](./images/markdown/calculatormaster/buttons.gif)


### Keeping the user updated
The application handles all possible edge cases gracefully and matains the user informed of what is happening at all times; from fetching statuses to connection errors.

### Client and server data validation
When sending data to the server, the client validates the data first to avoid overhead on the server. The data is however checked again in the server since the client side validation is only useful to avoid overhead when the user is interacting with the application in good faith (and because that is what happens most of the time, client side validation is actually important to not bother the server with wrong data sent in good faith).

### Global Leaderboard:
The game features a global leaderboard where all players can record their score and compare how well they did with everyone else:

![{"className": "img-md img-w-m"}](./images/markdown/calculatormaster/leaderboard.gif)

### Adaptive & Interactive
Works on all screen ratios and its filled with all kinds of animations to keep the user engaged.

![{"className": "img-md img-w-m"}](./images/markdown/calculatormaster/responsive.gif)

### APIs
I use two APIs to render the user's country flag and also handle edge cases, plus my own API to send and get data related to the leaderboard.

**Custom API:** The server has several API endpoints to manage and access the leaderboard:
- **/send_score** - **POST**:
    - Takes: { username: string, score: integer }
    - Returns: a stringyfied JSON containing data related to the user's score.
- **/get_leaderboard?length=${ *leaderboardCapacity* }** - **GET**:
    - Returns: ordered data on the top players.

**Ipinfo.io API (used on the server):** I get the client's **direct IP** and send it to the **ipinfo** API to get the country code associated with it. I store the country code along the score and the username provided by the client.

![{"className": "img-md float-none img-w-m"}](./images/markdown/calculatormaster/apis.png)

**Flagsapi.com API (used on the client):** I provide a country code to the **flagsapi** API in order to get a country flag. I handle edge cases when displaying the flags by providing a world icon whenever an error occurs, like:

- Providing "Unknown" as the country code (which happens for IP's that are not associated with a country like 127.0.0.1)
- Attempting to retrieve a flag that is not yet supported by the API
- A failed fetch for any other reason (connection issues with the API, etc...)


### Database
I use SQLite for the database. Here is the .schema:

```
CREATE TABLE sqlite_sequence(name,seq);
CREATE TABLE leaderboard (id INTEGER PRIMARY KEY AUTOINCREMENT,  username TEXT, score INTEGER, country_code TEXT);
```