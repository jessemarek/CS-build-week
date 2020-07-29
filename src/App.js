import React, { useState, useCallback, useRef } from 'react';
import { makeGrid, fillGrid, randInitCells, lifecycle } from './game-logic/functions'

import CellBtn from './components/CellBtn'

function App() {
  // init variables
  let numCols = 25
  let numRows = 25

  const initGrid = makeGrid(numCols, numRows)
  fillGrid(initGrid)

  // STATE **********************************************************************************************************************
  const [grid, setGrid] = useState(initGrid)
  const [gameIsRunning, setGameIsRunning] = useState(false)
  const [genNum, setGenNum] = useState(0)
  const [gameSpeed, setGameSpeed] = useState(60)

  // REFS ***********************************************************************************************************************
  const runningRef = useRef(gameIsRunning)
  runningRef.current = gameIsRunning

  const speedRef = useRef(gameSpeed)
  speedRef.current = gameSpeed

  // CALLBACKS ******************************************************************************************************************
  const runSimulation = useCallback(() => {
    // if the stop button is clicked break out of the loop
    if (!runningRef.current) {
      return
    }
    // update the generation number
    setGenNum(g => g + 1)
    // advance the lifecycle
    setGrid(g => lifecycle(g))

    // run the simulation at the speed specififed
    setTimeout(runSimulation, (1000 / speedRef.current))

  }, [])

  // starts the simulation until the stop button is clicked
  const clickPlay = e => {
    e.preventDefault()

    // toggle to state to the opposite when start button is clicked
    setGameIsRunning(!gameIsRunning)

    // set the ref to true to prevent race case of new render beating the update of the state
    if (!gameIsRunning) {
      runningRef.current = true

      // start the simulation loop
      runSimulation()
    }
  }

  // Fills the grid with a random selection of alive cells
  const clickRandom = e => {
    e.preventDefault()

    setGrid(randInitCells(grid))
  }

  // Advances the game window to the next generation
  const clickNextGen = e => {
    e.preventDefault()

    setGrid(lifecycle(grid))
    setGenNum(genNum + 1)
  }

  // Clears the game window and resets the generation number
  const resetGame = e => {
    e.preventDefault()

    setGenNum(0)
    setGrid(initGrid)
  }

  // Adjusts simulation render speed (frame rate)
  const sliderChange = e => {
    e.preventDefault()

    setGameSpeed(e.target.value)
  }

  // ****************************************************************************************************************************

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
          <button onClick={clickPlay}>{gameIsRunning ? 'Stop' : 'Start'}</button>
          <button disabled={gameIsRunning} onClick={clickNextGen}>Next Gen</button>
          <button disabled={gameIsRunning} onClick={clickRandom}>Randomize</button>
          <button disabled={gameIsRunning} onClick={resetGame}>Reset</button>
        </div>
        <div className="speed-ctrl">
          <label>Simulation Speed
            <input type="range" min="1" max="120" value={gameSpeed} onChange={sliderChange} />
            <p>{`${gameSpeed} Frames per second`}</p>
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
