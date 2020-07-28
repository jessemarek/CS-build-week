import { Cell } from './Cell'

// export the functions
module.exports = {
    makeGrid,
    fillGrid
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
