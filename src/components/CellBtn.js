import React from 'react'

const CellBtn = props => {

    const {
        isAlive,
        age,
        x,
        y,
        grid,
        setGrid,
        gameIsRunning,
        setGridCoord

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
        color = 'gold'
    }
    else if (age <= 16) {
        color = 'limegreen'
    }
    else if (age <= 32) {
        color = 'dodgerblue'
    }
    else {
        color = 'purple'
    }
    // ------------------------------------------------------------ //

    // toggle the alive state on mouse click
    const clickHandler = e => {
        e.preventDefault()

        if (!gameIsRunning) {
            // make a copy of the current grid
            let next = grid.map(col => col.map(row => row.clone()))
            // change the copy grid target cell to opposite of its previous state
            next[x][y].isAlive = !grid[x][y].isAlive

            // update the current grid with the new one
            setGrid(next)

        }
    }

    // update grid coordinates of this cell on mouse enter
    const onMouseEnter = e => {
        setGridCoord([
            x, y
        ])
    }

    // reset grid coordinates to default on mouse leave
    const onMouseLeave = e => {
        setGridCoord(['--', '--'])
    }

    return (
        <div
            className={isAlive ? 'alive cell-btn' : 'cell-btn'}
            style={{
                background: isAlive ? color : 'transparent',
                cursor: gameIsRunning ? 'default' : 'pointer'
            }}
            onClick={clickHandler}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        ></div>
    )
}

export default CellBtn