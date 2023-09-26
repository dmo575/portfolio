import { useEffect, useContext } from "react";
import { GetPerCurrToTarget_Bottom } from "./toolFuncs";
import { PivotContext } from "./Skeleton";
import * as breakpoints from "./bsbp.jsx";

// how much should the works title translate upwards, in rem. One for md+, other for sm-
const worksTitleMovMdPlus = 12;
const worksTitleMovSm = 7;

function WorksTitle() {

    const bottomPivot = useContext(PivotContext);

    function handleWorksTitle() {
        const titleCont = document.querySelector("#works-title-cont");

        const currY = titleCont.getBoundingClientRect().bottom;

        if(currY <= window.innerHeight) {

            const moveVal = window.innerWidth >= breakpoints.md ? worksTitleMovMdPlus : worksTitleMovSm;
            const percentage = GetPerCurrToTarget_Bottom(currY, bottomPivot.current);
            const value = moveVal / 100 * percentage;

            titleCont.style.height = `${value <= moveVal ? value : moveVal }rem`;
        }
    };


    useEffect(() => {
        window.addEventListener("scroll", handleWorksTitle);
        window.addEventListener("resize", handleWorksTitle);


        return () => {
            window.removeEventListener("scroll", handleWorksTitle);
            window.removeEventListener("resize", handleWorksTitle);
        };
    }, []);


    return (
        <>
            {/* ROW - "works" title element */}
            <div id="works" className="row">
                <div id="works-title-col" className="col">
                    <div id="works-title-cont">
                        <p id="works-title">Works</p>
                    </div>
                </div>

                {/* ROW - separator element */}
                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <div className="separator"></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WorksTitle;