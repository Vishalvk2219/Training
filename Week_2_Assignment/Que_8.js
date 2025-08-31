function combinationSum(candidates, target) {
  let res = []

  function backtrack(start, curr, sum) {
    if (sum === target) {
      res.push([...curr])
      return
    }
    if (sum > target) return

    for (let i = start; i < candidates.length; i++) {
      curr.push(candidates[i])
      backtrack(i, curr, sum + candidates[i])
      curr.pop()
    }
  }
  
  backtrack(0, [], 0)
  return res
}

console.log(combinationSum([2,3,6,7], 7))
