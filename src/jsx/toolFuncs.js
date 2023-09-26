import * as breakpoints from "./bsbp.jsx";


// given a currLoc (a value in the Y axis), calculates how far that value is from the bottom of the screen, assuming the destination is targetLoc (value in the Y axis)
// it returns the distance of currLoc from the bottom of the screen in percentage. Meaning "20% away from the bottom of the screen to reaching targetLoc"
export function GetPerCurrToTarget_Bottom(currLoc, targetLoc) {

    const rangeVal = window.innerHeight - targetLoc;
    const valInRange = window.innerHeight - currLoc;
    const percentage = (100 / rangeVal) * valInRange;

    return percentage;
}

/* calculates which general size the screen finds itself under: sm (xs, sm), md (md), lg (lg, xl ,xxl) */
export function GetCurrGeneralSize() {
    let currSize = window.innerWidth;

    if(currSize < breakpoints.md) {
        return breakpoints.sm;
    }
    else if(currSize < breakpoints.lg) {
        return breakpoints.md;
    }

    return breakpoints.lg;
}