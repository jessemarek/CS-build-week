import React, { useState, useEffect } from 'react';
import { makeGrid, fillGrid, randInitCells, lifecycle } from './game-logic/functions'
import { v4 as uuid } from 'uuid'

import CellBtn from './components/CellBtn'

function App() {
  const initGrid = makeGrid(25, 25)
  fillGrid(initGrid)

  const [grid, setGrid] = useState(initGrid)
  const [gameIsRunning, setGameIsRunning] = useState(false)
  const [genNum, setGenNum] = useState(0)

  /*   useEffect(() => {
  
    }, [grid, gameIsRunning]) */

  const playGame = e => {
    e.preventDefault()

    setGameIsRunning(!gameIsRunning)
  }

  const clickRandom = e => {
    e.preventDefault()

    setGrid(randInitCells(grid))
  }

  const clickNextGen = e => {
    e.preventDefault()

    setGrid(lifecycle(grid))
    setGenNum(genNum + 1)
  }

  const resetGame = e => {
    e.preventDefault()

    setGenNum(0)
    setGrid(initGrid)
  }

  return (
    <div className="App">
      <div>
        <h3>Generation #{genNum}</h3>
        <div className="game-window">
          {
            grid && grid.map((col, x) => col.map((row, y) => <CellBtn key={uuid()} isAlive={row.isAlive} age={row.age} x={x} y={y} />))
          }
        </div>
        <div className="game-btns">
          <button onClick={playGame}>{gameIsRunning ? 'Pause' : 'Play'}</button>
          <button disabled={gameIsRunning} onClick={clickNextGen}>Next Gen</button>
          <button disabled={gameIsRunning} onClick={clickRandom}>Randomize</button>
          <button disabled={gameIsRunning} onClick={resetGame}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;
