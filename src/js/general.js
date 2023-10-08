import * as breakpoints from "../variables/bsbp.js";

// given a currLoc (a value in the Y axis), calculates how far that value is from the bottom of the screen, assuming the destination is targetLoc (value in the Y axis)
// it returns the distance of currLoc from the bottom of the screen in percentage. Meaning "20% away from the bottom of the screen to reaching targetLoc"
export function GetPerCurrToTarget_Bottom(currLoc, targetLoc) {

    const rangeVal = window.innerHeight - targetLoc;// range
    const valInRange = window.innerHeight - currLoc;// where currLoc is
    const percentage = (100 / rangeVal) * valInRange;

    return percentage;
}

export function GetSectionSize(currentBp) {

    if(currentBp == breakpoints.sm) {
        return "section-size-sm";
    }
    else if(currentBp == breakpoints.md) {
        return "section-size-md";
    }

    return "section-size-lg";
}

export function GetTitleSize(currentBp) {

    if(currentBp == breakpoints.sm) {
        return "title-size-sm";
    }
    else if(currentBp == breakpoints.md) {
        return "title-size-md";
    }

    return "title-size-lg";
}