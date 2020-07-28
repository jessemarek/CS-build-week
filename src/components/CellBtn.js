import React from 'react'

const CellBtn = props => {

    const {
        isAlive,
        age,
        x,
        y

    } = props

    let color
    switch (age) {
        case 0:
            color = 'crimson'
            break;
        case 1:
            color = 'orange'
            break;

        case 2:
            color = 'yellow'
            break;

        case 3:
            color = 'green'
            break;

        case 4:
            color = 'blue'
            break;

        case 5:
            color = 'purple'
            break;

        default:
            color = 'purple'
            break;
    }

    return (
        <div
            className={isAlive ? 'alive cell-btn' : 'cell-btn'}
            style={{ background: isAlive ? color : 'transparent' }}
        ></div>
    )
}

export default CellBtn