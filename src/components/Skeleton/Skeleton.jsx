import { useContext, useEffect, useState } from "react";

import * as breakpoints from "./../../variables/bsbp.js";
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
            const cardsData = await(FetchCards());
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

                }).then(data => {

                    // set the card's description variable, previously a path to a .md file, to the 
                    // contents of that same .md file
                    card.description = data;

                }).catch(err => {

                    Error("cards");
                });

                // add the fetch promise to the promises array
                promises.push(req);
            });

            // once all fetch promises for all cards have been solved (card.description)
            const results = await (Promise.allSettled(promises));

            results.forEach(el => {
                if(el.status == "rejected") {
                    Error("card descriptions");
                }
            });

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
                            <Card card={card} dir={ index % 2 == 0 ? "left" : "right"}/>
                        </div>
                    );
                })}

            </div>
        </div>
    );
}

async function FetchCards(){

    const response = await (fetch(cardsJson));

    if(response.status == 200) {

        const data = await(response.json());

        return data;
    }
}

export default Skeleton;