// Based on the idea x * y = x + [x * (y-1)]
function multiplyRecursion(x, y) {
  if (x === 0 || y === 0) return 0

  if (x < y) {
    return multiplyRecursion(y, x)
  }

  return x + multiplyRecursion(x, y - 1)
}

console.log(multiplyRecursion(3141592653589793238462643383279502884197169399375105820974944592, 2718281828459045235360287471352662497757247093699959574966967627))
