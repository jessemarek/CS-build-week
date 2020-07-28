export class Cell {
    constructor(x, y) {
        this.isAlive = Math.floor(Math.random() * 2)
        this.age = 0
        this.x = x
        this.y = y
        this.neighbors = 0

    }

    // count the number of alive neighbors
    countNeighbors(grid) {
        let count = 0
        let cols = grid.length
        let rows = grid[0].length

        // look at the neighboring cells and add them to the count if they're alive
        for (i = -1; i < 2; i++) {
            for (j = -1; j < 2; j++) {
                let col = (this.x + i + cols) % cols
                let row = (this.y + j + rows) % rows

                if (grid[col][row].isAlive) {
                    count++
                }
            }
        }

        // this cell will be included in the count if it was alive
        if (this.isAlive) {
            // if it was alive remove it from the count
            this.neighbors = count - 1
        }
        // otherwise it wasn't alive and not included in the count
        else {
            this.neighbors = count
        }
    }

    // Calculate the next generation
    next_gen() {
        if (this.isAlive) {
            // cell dies if either < 2 neighbors or > 3 neighbors
            if (this.neighbors < 2 || this.neighbors > 3) {
                this.isAlive = false
                this.age = 0
            }
            // if the cell is alive and doesn't die this generation its age increases
            else {
                this.age++
            }
        }
        // if a cell is dead but has exactly 3 neighbors it becomes alive
        else {
            if (this.neighbors === 3) {
                this.isAlive = true
            }
        }
    }
}