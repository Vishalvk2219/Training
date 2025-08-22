function myPow(x, n) {
  if (n === 0) return 1
  if (n < 0) return 1 / myPow(x, -n)

  if (n % 2 === 0) {
    let half = myPow(x, n / 2)
    return half * half
  } else {
    return x * myPow(x, n - 1)
  }
}

console.log(myPow(2, 10))  
console.log(myPow(2.1, 3)) 
console.log(myPow(2, -2)) 
