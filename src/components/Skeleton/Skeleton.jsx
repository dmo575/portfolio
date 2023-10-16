import { useContext, useEffect, useState } from "react";

import * as breakpoints from "./../../js/bsbp.js";
import { cardsJson } from "../../js/paths.js";

import { appContext } from "./../App.jsx";
import Card from "./../Card/Card.jsx"


function Skeleton() {

    const {breakpointState, Error} = useContext(appContext);
    const [cardsArray, setCardsArray] = useState([]);

    
    useEffect(() => {
        
        //fetch the cards.json and pass the data to the cardsArray state
        const getCards = async () => {
            
            // fetch cards.json
            const cardsResponse = await (fetch(cardsJson));

            if(cardsResponse.status != 200) {
        
                Error("Cards");
                return;
            }

            const cardsData = await(cardsResponse.json());

            // will contain fetch promises for each card later
            const promises = [];

            // for each card:
            cardsData.cards.forEach(card => {

                // get a fetch promise for its card.description (contains the path to a .md file)
                const req = fetch(card.description)
                .then(response => {

                    // check response status, return text (the .md file)
                    if(response.status == 200) {
                        return response.text();
                    }

                    Error("card description");

                }).then(data => {

                    // set the card's description variable, previously a path to a .md file, to the 
                    // contents of that same .md file
                    card.description = data;

                }).catch(err => {

                    card.description = "";
                });

                // add the fetch promise to the promises array
                promises.push(req);
            });

            // once all fetch promises for all cards have been solved (card.description)
            await (Promise.allSettled(promises));


            // set the cardsData state to be the array of cards
            setCardsArray(cardsData.cards);
        };

        getCards();

    }, []);

    return (
        <div className="container">
            {/* ROW - project cards */}
            <div className={`row row-cols-${breakpointState == breakpoints.md ? '2': '1'} d-flex justify-content-center`}>

                {cardsArray.map((card, index) => {
                    return (
                        <div key={ card.title + index } className="col my-2">
                            <Card card={card} imgOrder={ index % 2 == 0 ? "first" : "last"}/>
                        </div>
                    );
                })}

            </div>
        </div>
    );
}

export default Skeleton;