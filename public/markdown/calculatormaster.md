# Introduction
A purely JS/CSS/HTML application with no extra libraries.

## Overview
- Makes use of a database for the leaderboard (SQLite3)
- Adaptive design, works on both PC and mobile screens (portrait and landscape)
- Interacts with two APIs.
    -  **ipinfo.io** (*server-side*) : for info on the client's **direct** IP (The IP that initiates the connection with the server, if the client is using a third party app like a VPN we wont be able to tell)
    -  **flagsapi.com** (*client-side*) : for fetching country flags based on a country code
- Custom API made on the back-end to retrieve Leaderboard
    - **/get_leaderboard?length=${leaderboardCapacity}**
- Uses Github for both pushing from my PC to the repo and pulling latest from repo onto the server.
- Makes heavy use of ES6 promises and other JS asynchronous functions
- Animations: Combining CSS properties and JavaScript's intervals to create stimulating visual animations and liven up the game's experience
- Wrote both the back-end and front-end
- Full Server set up (Im using Flask's dev server app on the server)

### Keeping the user in the known
The application handles all possible edge cases gracefully, informing the user of everything that might happen.

### Client and server data validation
When sending data to the server, the client validates the data first to avoid overhead on the server. The data is however checked again in the server since the client side validation is just useful to avoid overhead when the user is interacting with the application in good faith.

### Adaptive + Interactive
Works on all screen ratios and its filled with all kinds of animations to keep the user engaged.


### APIs
I use two APIs to render the user's country flag and also handle edge cases.

When recording a user's score, we send their IP trough the **ipinfo.io** API in the back-end. I then get back a JSON with the IP's country code among other IP related data, which I save along the user's score and username.

When retrieving the leaderboard, I first have the client ask for the data of the top players before displaying it. Once that is done I ask for the flags of each player by using the country code information I was provided along the players data. If an error occurs during the fetching of the flag, I instead display a world icon. This could be a connection issue with the API or the API not being able to locate the flag with the country code given.

I also have my own implementation of a single API endpoint that allows me to retrieve the top X players:

**/get_leaderboard?length=${leaderboardCapacity}**

```
# GET take-in:
#   length (number): how many score items of the leaderboard you want back
# About:
#   takes in a length and returns a leaderboard with that many score items
#   [{username, score, countryCode}]
#   the rank is implicit in the order of the returned list
@app.route("/get_leaderboard", methods=["GET"])
def get_leaderboard():

    # GET data validation
    scoreboard_length = request.args.get("length")
    if scoreboard_length is None:
        return "length not found", 400

    # return the first 'scoreboard_length' players, ordered by score DESC then name ASC
    scoreboard_cursor = db.session.execute(text("SELECT username, score, country_code FROM leaderboard ORDER BY score DESC, username ASC LIMIT :length"), {"length": scoreboard_length})
    scoreboard = scoreboard_cursor.fetchall()
    scoreboard_cursor.close()

    # for each element in data, create a dictionary with keys username/score/countryCode and their
    # values, and make a list that contains all of those dictionaries:
    scoreboard_list = [{"username": el[0], "score": el[1], "countryCode": el[2]} for el in scoreboard]

    return jsonify({"message": "scoreboard list", "data": scoreboard_list})
```

### Database tables


PLACE .schema HERE