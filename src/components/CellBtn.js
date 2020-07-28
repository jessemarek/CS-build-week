import React from 'react'

const CellBtn = props => {

    const {
        isAlive,
        age,
        x,
        y,
        grid,
        setGrid

    } = props

    // change color based on the age of the cell
    let color
    if (age <= 2) {
        color = 'crimson'
    }
    else if (age <= 4) {
        color = 'orange'
    }
    else if (age <= 8) {
        color = 'yellow'
    }
    else if (age <= 16) {
        color = 'green'
    }
    else if (age <= 32) {
        color = 'blue'
    }
    else {
        color = 'purple'
    }
    // ------------------------------------------------------------ //

    const clickHandler = e => {
        e.preventDefault()

        // make a copy of the current grid
        let next = grid.map(col => col.map(row => row.clone()))
        // change the copy grid target cell to opposite of its previous state
        next[x][y].isAlive = !grid[x][y].isAlive

        // update the current grid with the new one
        setGrid(next)
    }

    return (
        <div
            className={isAlive ? 'alive cell-btn' : 'cell-btn'}
            style={{ background: isAlive ? color : 'transparent' }}
            onClick={clickHandler}
        ></div>
    )
}

export default CellBtn