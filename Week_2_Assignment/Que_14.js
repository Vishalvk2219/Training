function orangesRotting(grid) {
  let rows = grid.length
  let cols = grid[0].length
  let queue = []
  let fresh = 0

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 2) queue.push([i, j, 0])
      if (grid[i][j] === 1) fresh++
    }
  }

  let time = 0
  let dirs = [[1,0],[-1,0],[0,1],[0,-1]]

  while (queue.length) {
    let [r, c, t] = queue.shift()
    time = Math.max(time, t)

    for (let [dr, dc] of dirs) {
      let nr = r + dr, nc = c + dc
      if (nr >= 0 && nc >= 0 && nr < rows && nc < cols && grid[nr][nc] === 1) {
        grid[nr][nc] = 2
        fresh--
        queue.push([nr, nc, t + 1])
      }
    }
  }

  return fresh === 0 ? time : -1
}

let grid1 = [
  [2,1,1],
  [1,1,0],
  [0,1,1]
]
console.log(orangesRotting(grid1)) 

let grid2 = [
  [2,1,1],
  [0,1,1],
  [1,0,1]
]
console.log(orangesRotting(grid2)) 
