function coinChange(coins, amount) {
  let dp = new Array(amount + 1).fill(Infinity)
  dp[0] = 0

  for (let i = 1; i <= amount; i++) {
    for (let c of coins) {
      if (i - c >= 0) {
        dp[i] = Math.min(dp[i], dp[i - c] + 1)
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount]
}

console.log(coinChange([1,2,5], 11)) 
console.log(coinChange([2], 3))      
console.log(coinChange([1,2,5,10,20,50,100], 67))      
