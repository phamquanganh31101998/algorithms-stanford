function swap([x, y]) {
  return [y, x]
}

// After partition procedure, we got array like this: [<p, p, >p]
function partition(arr) {
  // Pivot should be chosen randomly
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
    pivot: arr[i-1],
    pivotPosition: i - 1
  }
}

function quickSort(arr) {
  if (arr.length <= 1) return arr

  const { partitionedArray , pivot, pivotPosition} =  partition(arr)
  const leftPart = partitionedArray.slice(0, pivotPosition)
  const rightPart = partitionedArray.slice(pivotPosition + 1, arr.length)

  return [...quickSort(leftPart), pivot, ...quickSort(rightPart)]
}

console.log(quickSort([31, 92, 41, 78, 18, 56, 32, 6, 86, 89, 91, 40, 77, 3, 9, 25, 26, 7, 94, 29, 5, 82, 97, 64, 62, 35, 20, 39, 17, 63, 90, 72, 43, 19, 76, 93, 69, 36, 44, 59, 27, 46, 88, 38, 28, 81, 54, 34, 8, 2, 95, 49, 57, 61, 1, 75, 24, 15, 16, 21, 30, 37, 71, 79, 22, 55, 73, 96, 100, 14, 48, 70, 50, 42, 4, 52, 58, 87, 74, 12, 23, 51, 11, 99, 68, 65, 84, 10, 80, 85, 53, 66, 45, 47, 33, 67, 13, 83, 60, 98]))
