import { useContext, useEffect, useState } from "react";

import * as breakpoints from "./../../variables/bsbp.js";

import { appContext } from "./../App.jsx";
import Card from "./../Card/Card.jsx"

const cardsJson = "./JSON/Cards.json";


function Skeleton() {

    const {breakpointState} = useContext(appContext);
    const [cardsArray, setCardsArray] = useState([]);

    
    useEffect(() => {
        
        const getCards = async () => {
            
            const cardsData = await(FetchCards());
            const promises = [];

            cardsData.cards.forEach(card => {

                const req = fetch(card.description)
                .then(response => {

                    if(response.status == 200) {
                        return response.text();
                    }

                }).then(data => {

                    card.description = data;

                }).catch(err => {

                    console.error('Error loading card description.');
                });

                promises.push(req);
            });

            
            await Promise.allSettled(promises);

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