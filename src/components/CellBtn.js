import React from 'react'

const CellBtn = props => {

    const {
        isAlive,
        age,
        x,
        y

    } = props

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

    return (
        <div
            className={isAlive ? 'alive cell-btn' : 'cell-btn'}
            style={{ background: isAlive ? color : 'transparent' }}
        ></div>
    )
}

export default CellBtn