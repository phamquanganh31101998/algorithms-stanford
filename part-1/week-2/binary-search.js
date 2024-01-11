// return index i where arr[i] = val
// arr is sorted

function binarySearch(arr, val) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.ceil((low + high) / 2)

    if (val === arr[mid]) {
      return mid
    } else if (val > arr[mid]) {
      low = mid + 1
    } else {
      high = mid - 1
    }
  }

  return -1
}

console.log(binarySearch([0, 1, 2, 3, 4, 5, 6], 2))