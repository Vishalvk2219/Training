function rob(nums) {
  let n = nums.length
  if (n === 0) return 0
  if (n === 1) return nums[0]

  let dp = new Array(n)
  dp[0] = nums[0]
  dp[1] = Math.max(nums[0], nums[1])

  for (let i = 2; i < n; i++) {
    dp[i] = Math.max(dp[i-1], dp[i-2] + nums[i])
  }

  return dp[n-1]
}

console.log(rob([1,2,3,1])) 
console.log(rob([2,7,9,3,1])) 
console.log(rob([2,1,1,2]))
