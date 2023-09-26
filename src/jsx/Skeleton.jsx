import { useState, useEffect, createContext, useRef } from "react";
import Item from "./Item.jsx";
import WorksTitle from "./WorksTitle.jsx";
import { GetPerCurrToTarget_Bottom } from "./toolFuncs.js";
import * as breakpoints from "./bsbp.jsx";


// provide a point in the screen (in percentage, bottom to top) by where all fade-in-actors should be completely opaque
const bottomPivotLocPercentage = 50;
export const PivotContext = createContext();

const data = {
    imgL: "https://fastly.picsum.photos/id/288/300/300.jpg?hmac=7RMC2BTzA6EpogvGf74Us4VguwkoeSsLzBARJbs5VOk",
    imgS: "https://fastly.picsum.photos/id/230/600/300.jpg?hmac=xaOtfLjlm4OwQVWYD4xcugIiy5Ebr_qNu7ymvmI2jv4",
    title: "Project Title",
    txt: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, cupiditate architecto obcaecati repellendus id ab tempore assumenda natus, voluptatem dolorem voluptas explicabo voluptates doloribus veniam! Assumenda optio tempora debitis dicta necessitatibus, dolore quasi similique reprehenderit illum sapiente provident cupiditate accusantium consectetur deleniti asperiores, itaque quam quos tempore. Unde, id dignissimos?"
}

/* calculates which general size the screen finds itself under: sm (xs, sm), md (md), lg (lg, xl ,xxl) */
function GetCurrGeneralSize() {
    let currSize = window.innerWidth;

    if(currSize < breakpoints.md) {
        return breakpoints.sm;
    }
    else if(currSize < breakpoints.lg) {
        return breakpoints.md;
    }

    return breakpoints.lg;
}

// converts the fadeInPoint from a percentage to a real pixel unit for the current screen
// aka: this number is a pixel, and any fade-in-actor element must be 100% opaque by the time their top reaches this pixel unit.
function GetFadeInPixelPos() {

    return  window.innerHeight - ((window.innerHeight / 100) * bottomPivotLocPercentage);
}

function Skeleton() {

    const [generalSize, setGeneralSize] = useState(GetCurrGeneralSize());
    const generalSizeRef = useRef(generalSize);

    let bottomPivot = useRef(GetFadeInPixelPos());

    // updates all the fade-in-actor elements
    function handleFadeIn() {

        // get all fade-in-actors
        const actors = document.querySelectorAll(".fade-in-actor");
        
        // update their opacity based on current y offset
        actors.forEach((e) => {

            const currY = e.getBoundingClientRect().top;
            
            // if the top of this element is above the window's bottom edge:
            if(currY <= window.innerHeight) {
                
                const percentage = GetPerCurrToTarget_Bottom(currY, bottomPivot.current);
                const value = percentage / 100;
                
                e.style.opacity = value;
            }
        });
    };

    useEffect(() => {

        /* on resize, update the bottom pivot and */
        function handleResize() {

            // updates the general size state
            let currSize = GetCurrGeneralSize();
            
            if(generalSizeRef != currSize) {
                setGeneralSize(currSize);
            }
            
            // updates the bottom pivot and fade in actors and the works title
            bottomPivot.current = GetFadeInPixelPos();
            handleFadeIn();
        };

        handleFadeIn();

        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleFadeIn);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleFadeIn);
        };
    }, []);

    return (
        <div className="container">

            <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores odit harum perferendis quos enim natus quisquam error. Nihil, consequuntur accusamus? Eligendi aut similique id soluta asperiores blanditiis nisi praesentium possimus ipsa numquam unde nemo officia vitae eveniet et quibusdam est maiores, esse ea sed harum dignissimos fuga tempora consequatur! Cumque temporibus nulla eveniet quos incidunt in sapiente animi hic aspernatur obcaecati repellendus praesentium voluptatem accusamus vitae iusto, exercitationem delectus aut voluptate voluptates deleniti laudantium nostrum id saepe? Accusamus doloribus dolorum sapiente sed ex maiores soluta fugit cupiditate et debitis. Officia eligendi voluptatibus nihil porro voluptatum reprehenderit hic. Cumque pariatur delectus adipisci labore esse maxime consequuntur nam incidunt atque, nesciunt accusamus explicabo asperiores veniam eaque ratione? Consequuntur consectetur obcaecati quo sunt, aspernatur ipsa dicta minima odio doloremque eum tempora repudiandae laboriosam iste autem incidunt aperiam hic non, totam maxime nesciunt, itaque veniam voluptatem fuga. Debitis fuga perferendis consequatur rerum quod sed reiciendis qui temporibus cumque incidunt, illo omnis minus exercitationem eum eaque? Consectetur facilis provident quia accusamus, animi exercitationem perspiciatis nulla voluptates tempora quasi asperiores corrupti, deserunt amet, eum nostrum tempore soluta voluptatibus mollitia at. Ex odio nesciunt tempore rem voluptatum dicta itaque exercitationem debitis pariatur velit nemo optio nostrum totam dolor ullam numquam, quae illum doloribus provident fuga ipsa unde ducimus quidem quo? Esse necessitatibus perspiciatis atque tenetur quidem impedit ut rem architecto, sit, optio voluptas voluptatibus, iure cupiditate eius voluptatum odio. Quibusdam enim ducimus dolorum neque officia velit exercitationem cupiditate fugit ab dolores, sunt eveniet error est hic iusto porro tempora magnam quis numquam in dicta, consectetur eaque ad. Inventore similique quas excepturi ipsa, pariatur odio voluptates ex minus consectetur reprehenderit, neque facilis! Exercitationem iure cumque magnam, maxime unde cupiditate repellat ratione temporibus cum architecto laudantium? Earum necessitatibus minus totam tempore dolore alias esse aperiam qui voluptatum? Deleniti optio facilis hic tempore. Deleniti quas modi distinctio optio, ullam sunt excepturi quae voluptatibus architecto dolore sapiente beatae, repellendus porro vitae ipsum omnis temporibus nostrum nemo voluptates, fuga perspiciatis facilis possimus pariatur itaque? Natus eos recusandae delectus impedit. Quasi, officiis modi est libero eum consequuntur dolores expedita cupiditate perferendis nulla saepe veniam repudiandae voluptatum harum! Iste veniam quos tempore voluptate nesciunt consequatur mollitia cum nihil ipsam accusantium aspernatur pariatur quia at neque, veritatis sapiente natus, animi libero quod. Tempora minima nostrum maxime doloribus quo dolores expedita culpa explicabo voluptatem, laborum necessitatibus possimus debitis alias quae nesciunt blanditiis corrupti ab animi sed. Temporibus mollitia commodi itaque illo, voluptatem modi, hic provident corrupti eligendi id architecto a sequi molestias quam sed perferendis? Omnis odio voluptas dolorum deserunt eius temporibus assumenda illum beatae modi, aliquam reiciendis doloremque alias praesentium facere ipsum perferendis iusto magnam quasi blanditiis? Sapiente minima repellat provident harum incidunt porro earum, beatae nobis aperiam, omnis at unde corrupti explicabo laborum, impedit culpa deserunt nam! Doloribus id nam sed velit enim maxime. Officiis atque voluptatibus unde quia quis sequi? Quam veritatis eligendi nulla officia odio? Quas obcaecati, architecto consequatur illo nesciunt dignissimos saepe expedita exercitationem, nostrum sequi quos repudiandae error delectus tempora?</div>

            <PivotContext.Provider value={bottomPivot}>
            <WorksTitle/>
            </PivotContext.Provider>

            {/* ROW - project cards */}
            <div className={`row row-cols-${generalSize == breakpoints.md ? '2': '1'}`}>
                <div className="col card-separator">
                    <Item srcImg={generalSize <= breakpoints.md ? data.imgS : data.imgL} title={data.title} txt={data.txt} dir="left"/>
                </div>
                <div className="col card-separator">
                    <Item srcImg={generalSize <= breakpoints.md ? data.imgS : data.imgL} title={data.title} txt={data.txt + data.txt} dir="right"/>
                </div>
                <div className="col card-separator">
                    <Item srcImg={generalSize <= breakpoints.md ? data.imgS : data.imgL} title={data.title} txt={data.txt} dir="left"/>
                </div>
            </div>
       
        </div>
    );
}

export default Skeleton;