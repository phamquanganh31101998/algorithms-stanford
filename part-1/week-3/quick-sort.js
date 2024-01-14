function swap([x, y]) {
  return [y, x]
}

// After partitioning, we got array like this: <p, p, >p
function partition(arr) {
  // we'll have a new effective choosing pivot procedure soon
  const pivot = arr[0]

  let i = 1;
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

  return arr
}

function quickSort(arr) {
  if (arr.length === 1) return arr

  // TODO: partition on 2 part around pivot
  return partition(arr)
}

console.log(quickSort([3, 8, 2, 5, 1, 4, 7, 6]))