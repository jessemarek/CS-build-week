import { Cell } from './Cell'

// constructs a grid (2d array) with x number of columns and y number of rows
export const makeGrid = (cols, rows) => {
    // create the columns of our grid
    let arr = new Array(cols)

    // create the rows for our grid
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows)
    }

    // return the empty grid
    return arr
}

// fills the grid with Cell objects
export const fillGrid = (grid) => {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j] = new Cell(i, j)
        }
    }
}

// Randomly sets the initial state of each Cell's isAlive to true or false 
export const randInitCells = (grid) => {

    return grid.map(col => col.map(row => {

        let num = Math.floor(Math.random() * 2)
        num ? row.isAlive = true : row.isAlive = false
        return row
    }))
}

// Calculate a new generation of Cells
export const lifecycle = (grid) => {
    // get the number of neighbors for each Cell
    grid.forEach(col => col.forEach(row => row.countNeighbors(grid)))

    // make a new copy of the grid filled with the next generation
    let next = grid.map(col => {
        return col.map(row => {
            // clone each Cell
            let clone = row.clone()
            clone.next_gen()

            return clone
        })
    })

    return next
}
