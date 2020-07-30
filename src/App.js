import React, { useState, useCallback, useRef } from 'react';

// Game logic functions
import { makeGrid, fillGrid, randInitCells, lifecycle } from './game-logic/functions'

// Preset coordinates
import { preset_1, preset_2, preset_3, preset_4 } from './game-logic/presets'

// Components
import CellBtn from './components/CellBtn'
import GameRules from './components/GameRules'

function App() {
  // init variables
  const numCols = 40
  const numRows = 40

  // initial grid filled with cells in dead state
  const initGrid = makeGrid(numCols, numRows)
  fillGrid(initGrid)

  // STATE **********************************************************************************************************************
  const [grid, setGrid] = useState(initGrid)
  const [gameIsRunning, setGameIsRunning] = useState(false)
  const [genNum, setGenNum] = useState(0)
  const [gameSpeed, setGameSpeed] = useState(60)
  const [gridCoord, setGridCoord] = useState(['--', '--'])

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

  // Sets specific coordinates to alive for the initial state of the grid
  const loadPreset = (coords) => {

    // make a copy of the blank grid state
    let new_grid = [...initGrid]

    // loop through the coordinates that are given and set each cell to alive state
    coords.forEach(coord => {
      new_grid[coord[0]][coord[1]].isAlive = true
    })

    // reset the generation counter and set the new grid state
    setGenNum(0)
    setGrid(new_grid)
  }

  // ****************************************************************************************************************************

  return (
    <div className="App">
      <h1>Conway's Game of Life</h1>
      <div className="game-container">
        <h3>Generation #{genNum}</h3>

        <div className="game-window" style={{ gridTemplateRows: `repeat(${numCols}, 10px)` }}>
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
                setGridCoord={setGridCoord}
              />))
          }
        </div>
        <p className="coords">{gridCoord && `${gridCoord[0]}, ${gridCoord[1]}`}</p>

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

        <div className="game-btns">
          <button onClick={() => loadPreset(preset_1)}>Pre Set 1</button>
          <button onClick={() => loadPreset(preset_2)}>Pre Set 2</button>
          <button onClick={() => loadPreset(preset_3)}>Pre Set 3</button>
          <button onClick={() => loadPreset(preset_4)}>Pre Set 4</button>
        </div>


      </div>
      <GameRules />

    </div>
  );
}

export default App;
