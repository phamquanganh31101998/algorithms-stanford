// find ith ordered from arr
function randomizedSelection(arr, i) {
  if (i > arr.length) return null

  return i
}

function main() {
  const arr = [0, 6, 8, 2, 5, 9, 3, 7, 5, 1]
  const element = randomizedSelection(arr, 3)
  console.log(element)
}

main()