import React from 'react'

const GameRules = () => {

    return (
        <div className="game-rules">
            <h3>Game Rules</h3>
            <ol>
                <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
                <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
                <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
                <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
            </ol>
        </div>
    )
}

export default GameRules