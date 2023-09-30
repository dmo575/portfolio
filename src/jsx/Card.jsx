import * as breakpoints from "./bsbp.js";
import Skill from "./Skill.jsx";

function Card({card, dir}) {

    const img = <img className={`card-img-${dir}`} src={window.innerWidth < breakpoints.lg ? card.srcS : card.srcL}/>;

    return (
        <div id="test" className="card flex-lg-row h-100 fade-in-actor">
            {dir === "left" || window.innerWidth < breakpoints.lg ? img : <></>}
            <div className="card-body d-flex flex-column">
                <h1 className="card-title">{card.title}</h1>
                <p className="card-text flex-grow-1">{card.description}</p>
                <div className="card-text d-flex justify-content-between">
                    <div className="d-flex justify-content-start align-items-center">
                        {card.tech.map(el => {
                            return (
                                <Skill src={el.src} name={el.name}/>
                            );
                        })}
                    </div>                                
                    <a className="btn rounded-5 btn-dark">Links + Info</a>
                </div>
            </div>
            {dir === "right" && window.innerWidth >= breakpoints.lg ? img : <></>}
        </div>
    );
}

export default Card;