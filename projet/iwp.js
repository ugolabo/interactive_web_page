// variables
let inputSizeElRef = document.getElementById("inputSize")
let gridSizeElRef = document.getElementById("gridSize")
let pixelCanvasElRef = document.getElementById("pixelCanvas")
let customPalette = [] // starting empty

// events

// update the display when changing the grid
function updateValue(inputSizeElRef) {
    document.getElementById('newValue').innerHTML = `${inputSizeElRef}x${inputSizeElRef}`
    clearGrid()
    makeGrid()
}

// update the grid when changing the grid
gridSize.onsubmit = function(event) {
    // prévient les submit plus haut, bouton redevient normal
    event.preventDefault()
    clearGrid()
    makeGrid()
}

// clear a child of the table
// pixelCanvasElRef is <table>
// pixelCanvasElRef.firstChild is <tbody> (follows <tr>, then <td>)
// remove <tbody> from <table> 
function clearGrid() {
    while (pixelCanvasElRef.firstChild) {
    pixelCanvasElRef.removeChild(pixelCanvasElRef.firstChild) 
    }
}

// accumulate colors in an array
function getColors(e){
    // whenever a color is selected
    let colorPickerElRef = document.getElementById('colorPicker').value
    // push the color value (hexdec code) to the customPalette array
    customPalette.push(colorPickerElRef)
    // console checkpoint
    console.log(customPalette)
    // make the updated variable available outside the function
    return customPalette
}

// generate the grid
// generate r rows and c cells in each row
// then wait for events
function makeGrid() {
    for (let r=0; r < inputSizeElRef.value; r++) {
    // add rows
    const row = pixelCanvasElRef.insertRow(r)
        for (let c=0; c < inputSizeElRef.value; c++){
        // divide each row in cells
        const cell = row.insertCell(c)
    // event for mouses
    cell.addEventListener("mouseover", fillSquare)
    // event for touchscreens (and mouses)
    cell.addEventListener("click", fillSquare)
        }
    }
}

// fill the grid with one color Palette
function fillSquare() {
    // following what is above...
    // take the default mode (else)
    // or the customPalette if it exists
    if (customPalette.length > 0) {
    // pick a random color from the array
    // generate a, integer from 0 to 1 x number of elements (length)
    // for eg, an array of 5 items, 0 to 5 or 0, 1, 2, 3, 4
    let choice = Math.floor(Math.random() * customPalette.length)
    // extract the color from the array with the index
    // for eg, if the random number is 3, index 3
    let color = customPalette[choice]
    // apply the color
    this.setAttribute("style", `background-color: ${color}`)
    } else {
    // a string from 0 to F (hexadecimal sequence)
    let makeColorCode = '0123456789ABCDEF'
    // starting character for a color code
    let color = '#'
    // generate 6 hexadec integers predeeded by the starting character
    // for eg, #ff0055
    for (let count = 0; count < 6; count++) {
        color = color + makeColorCode[Math.floor(Math.random() * 16)]
        // console checkpoint
        console.log(color)
    }
    // apply the color
    this.setAttribute("style", `background-color: ${color}`)
    }
}
