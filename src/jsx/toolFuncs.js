
// given a currLoc (a value in the Y axis), calculates how far that value is from the bottom of the screen, assuming the destination is targetLoc (value in the Y axis)
// it returns the distance of currLoc from the bottom of the screen in percentage. Meaning "20% away from the bottom of the screen to reaching targetLoc"
export function GetPerCurrToTarget_Bottom(currLoc, targetLoc) {

    const rangeVal = window.innerHeight - targetLoc;
    const valInRange = window.innerHeight - currLoc;
    const percentage = (100 / rangeVal) * valInRange;

    return percentage;
}