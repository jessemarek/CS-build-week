import { Cell } from './Cell'

// export the functions
module.exports = {
    makeGrid,
    fillGrid,
    randInitCells,
    lifecycle
}

// constructs a grid (2d array) with x number of columns and y number of rows
const makeGrid = (cols, rows) => {
    // create the columns of our grid
    let arr = new Array(cols)

    // create the rows for our grid
    for (i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows)
    }

    // return the empty grid
    return arr
}

// fills the grid with Cell objects
const fillGrid = (grid) => {
    for (i = 0; i < grid.length; i++) {
        for (j = 0; j < grid[i].length; j++) {
            grid[i][j] = new Cell(i, j)
        }
    }
}

// Randomly sets the initial state of each Cell's isAlive to true or false 
const randInitCells = (grid) => {

    grid.forEach(col => col.forEach(row => {

        let num = Math.floor(Math.random() * 2)
        num ? row.isAlive = true : row.isAlive = false

    }))
}

// Calculate a new generation of Cells
const lifecycle = (grid) => {
    // get the number of neighbors for each Cell
    grid.forEach(col => col.forEach(row => row.countNeighbors(grid)))

    // return a new copy of the grid filled with the next generation
    return grid.map(col => col.map(row => row.next_gen()))
}
