// procedure to merge 2 sorted array into 1 sorted array
function merge(arr1, arr2) {
  const result = []

  let i = 0;
  let j = 0;

  const resultSize = arr1.length + arr2.length

  for (let k = 0; k < resultSize; k++) {
    // Check cases one pivot has travel to the end of its array
    if (i >= arr1.length) {
      result.push(arr2[j])
      j = j + 1
      continue
    }

    if (j >= arr2.length) {
      result.push(arr1[i])
      i = i + 1
      continue
    }


    if (arr1[i] < arr2[j]) {
      result.push(arr1[i])
      i = i + 1
    } else {
      result.push(arr2[j])
      j = j + 1
    }
  }

  return result
}

function mergeSort(arr) {
  const length = arr.length
  if (arr.length <= 1) return arr

  // position to cut arr into 2 part
  const position = Math.ceil(length / 2)
  const sortedLeftPart = mergeSort(arr.slice(0, position))
  const sortedRightPart = mergeSort(arr.slice(position, length))

  return merge(sortedLeftPart, sortedRightPart)
}

console.log(mergeSort([31, 92, 41, 78, 18, 56, 32, 6, 86, 89, 91, 40, 77, 3, 9, 25, 26, 7, 94, 29, 5, 82, 97, 64, 62, 35, 20, 39, 17, 63, 90, 72, 43, 19, 76, 93, 69, 36, 44, 59, 27, 46, 88, 38, 28, 81, 54, 34, 8, 2, 95, 49, 57, 61, 1, 75, 24, 15, 16, 21, 30, 37, 71, 79, 22, 55, 73, 96, 100, 14, 48, 70, 50, 42, 4, 52, 58, 87, 74, 12, 23, 51, 11, 99, 68, 65, 84, 10, 80, 85, 53, 66, 45, 47, 33, 67, 13, 83, 60, 98]))