import React, { useState, useCallback, useRef } from 'react';
import { makeGrid, fillGrid, randInitCells, lifecycle } from './game-logic/functions'

import CellBtn from './components/CellBtn'

function App() {
  let numCols = 25
  let numRows = 25

  const initGrid = makeGrid(numCols, numRows)
  fillGrid(initGrid)

  const [grid, setGrid] = useState(initGrid)
  const [gameIsRunning, setGameIsRunning] = useState(false)
  const [genNum, setGenNum] = useState(0)

  const runningRef = useRef(gameIsRunning)
  runningRef.current = gameIsRunning

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return
    }

    setGenNum(g => g + 1)
    setGrid(g => lifecycle(g))

    setTimeout(runSimulation, 16.67)

  }, [])

  const clickPlay = e => {
    e.preventDefault()

    setGameIsRunning(!gameIsRunning)
    if (!gameIsRunning) {
      runningRef.current = true
      runSimulation()
    }
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
        <div className="game-window" style={{ gridTemplateRows: `repeat(${numCols}, 15px)` }}>
          {
            grid &&
            grid.map((col, x) => col.map((row, y) =>
              <CellBtn
                key={`${x}-${y}`}
                isAlive={row.isAlive}
                age={row.age}
                x={x}
                y={y}
                grid={grid}
                setGrid={setGrid}
                gameIsRunning={gameIsRunning}
              />))
          }
        </div>
        <div className="game-btns">
          <button onClick={clickPlay}>{gameIsRunning ? 'Pause' : 'Play'}</button>
          <button disabled={gameIsRunning} onClick={clickNextGen}>Next Gen</button>
          <button disabled={gameIsRunning} onClick={clickRandom}>Randomize</button>
          <button disabled={gameIsRunning} onClick={resetGame}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;
