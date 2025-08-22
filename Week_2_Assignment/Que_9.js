function exist(board, word) {
  let rows = board.length
  let cols = board[0].length

  function dfs(r, c, idx) {
    if (idx === word.length) return true
    if (r < 0 || c < 0 || r >= rows || c >= cols) return false
    if (board[r][c] !== word[idx]) return false

    let temp = board[r][c]
    board[r][c] = "#"

    let found = dfs(r+1, c, idx+1) || dfs(r-1, c, idx+1) || dfs(r, c+1, idx+1) || dfs(r, c-1, idx+1)

    board[r][c] = temp
    return found
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (dfs(i, j, 0)) return true
    }
  }
  return false
}

let board = [
  ["A","B","C","E"],
  ["S","F","C","S"],
  ["A","D","E","E"]
]

console.log(exist(board, "ABCCED")) 
console.log(exist(board, "SEE"))    
console.log(exist(board, "ABCB"))   
