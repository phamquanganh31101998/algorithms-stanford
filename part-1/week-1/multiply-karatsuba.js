function lengthOfNumber(num) {
  return num.toString().length
}

function multiplyKaratsuba(x, y) {
  if (lengthOfNumber(x) === 1 && lengthOfNumber(y)) return x*y

  const positionX = Math.ceil(lengthOfNumber(x) / 2)
  const a = parseInt(x.toString().slice(0, positionX))
  const b = parseInt(x.toString().slice(positionX, lengthOfNumber(x)))

  const positionY = Math.ceil(lengthOfNumber(y) / 2)
  const c = parseInt(y.toString().slice(0, positionY))
  const d = parseInt(y.toString().slice(positionY, lengthOfNumber(y)))

  const step1 = multiplyKaratsuba(a, c)
  const step2 = multiplyKaratsuba(b, d)
  const step3 = multiplyKaratsuba(a+b, c+d)

  return Math.pow(10, lengthOfNumber(x)) * step1
    + Math.pow(10, lengthOfNumber(x) / 2 ) * (step3 - step1 - step2)
    + step2

}

console.log(multiplyKaratsuba(12, 20))
// console.log(multiplyKaratsuba(3141592653589793238462643383279502884197169399375105820974944592, 2718281828459045235360287471352662497757247093699959574966967627))
