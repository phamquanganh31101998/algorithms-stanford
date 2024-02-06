function swap([x, y]) {
  return [y, x]
}


// After partition procedure, we got array like this: [<p, p, >p]
function partition(arr) {
  // Choose first element as the pivot
  const pivot = arr[0]

  // position that all elements before it are smaller than the pivot
  let i = 1;

  // counter
  let j = 1;

  for (j; j < arr.length; j++) {
    // Note: no need to check arr[j] > pivot because they are in right position
    if(arr[j] < pivot) {
      // swap arr[j] with arr[i] when arr[j] < pivot (not in right position)
      const [valueAtJ, valueAtI] = swap([arr[i], arr[j]])
      arr[i] = valueAtJ
      arr[j] = valueAtI
      i++
    }
  }

  // swap pivot (at first entry) to the element at i - 1 to move pivot to its right place
  const [valueAtBeforeI, valueAtPivot] = swap([pivot, arr[i - 1]])
  arr[0] = valueAtBeforeI
  arr[i-1] = valueAtPivot

  return {
    partitionedArray: arr,
    pivotPosition: i - 1
  }
}

// find ith ordered from arr
function randomizedSelection(arr, i) {
  const length = arr.length
  if (arr.length === 0 || i > arr.length) return null

  // random select first element as the pivot
  const { partitionedArray, pivotPosition } = partition(arr)

  if (i === pivotPosition) return partitionedArray[i]

  if (i < pivotPosition) {
    const leftPart = partitionedArray.slice(0, pivotPosition)
    return randomizedSelection(leftPart, i)
  } else {
    const rightPart = partitionedArray.slice(pivotPosition + 1, length)
    return randomizedSelection(rightPart, i - pivotPosition - 1)
  }

}

function main() {
  const arr = [4, 6, 8, 2, 9, 0, 3, 7, 5, 1]
  const element = randomizedSelection(arr, 4)
  console.log(element)
}

main()