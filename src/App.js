import React, { useState, useEffect } from 'react';
import { makeGrid, fillGrid, randInitCells, lifecycle } from './game-logic/functions'
import { v4 as uuid } from 'uuid'

import CellBtn from './components/CellBtn'

function App() {
  const initGrid = makeGrid(25, 25)
  fillGrid(initGrid)
  //randInitCells(initGrid)

  const [grid, setGrid] = useState(initGrid)

  /* useEffect(() => {
    setGrid(lifecycle(grid))
  }, []) */

  const clickRandom = e => {
    e.preventDefault()

    setGrid(randInitCells(grid))
  }

  return (
    <div className="App">
      <div>
        <div className="game-window">
          {
            grid && grid.map((col, x) => col.map((row, y) => <CellBtn key={uuid()} isAlive={row.isAlive} age={row.age} x={x} y={y} />))
          }
        </div>
        <div className="game-btns">
          <button>play / pause</button>
          <button>Next Generation</button>
          <button onClick={clickRandom}>Randomize</button>
        </div>
      </div>
    </div>
  );
}

export default App;
