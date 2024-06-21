export {
    addMovement
}
function addMovement(pressedElement,movementElement){
    addMovementForTouchedDevices(pressedElement,movementElement)
    addMovementForDesktopDevices(pressedElement,movementElement);
}