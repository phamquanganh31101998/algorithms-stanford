import { open } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// procedure to merge 2 sorted array into 1 sorted array
function mergeAndCount(arr1, arr2) {
  const mergedArray = []

  let i = 0;
  let j = 0;

  const resultSize = arr1.length + arr2.length

  let totalInversionCount = 0

  for (let k = 0; k < resultSize; k++) {
    // Check cases one pivot has travel to the end of its array
    if (i >= arr1.length) {
      mergedArray.push(arr2[j])
      j = j + 1
      continue
    }

    if (j >= arr2.length) {
      mergedArray.push(arr1[i])
      i = i + 1
      continue
    }


    if (arr1[i] < arr2[j]) {
      mergedArray.push(arr1[i])
      i = i + 1
    } else {
      // If arr1[i] >= arr2[j] => Inversions happen
      // Each inversion contains arr[2] and all the remaining arr[i]
      mergedArray.push(arr2[j])
      j = j + 1
      totalInversionCount += arr1.length - i
    }
  }

  return {
    mergedArray,
    totalInversionCount
  }
}

function countingInversions(arr) {
  const length = arr.length
  if (arr.length <= 1) return {
    mergedArray: arr,
    totalInversionCount: 0
  }

  // position to cut arr into 2 part
  const position = Math.ceil(length / 2)
  const { mergedArray: sortedLeftPart, totalInversionCount: totalLeft } = countingInversions(arr.slice(0, position))
  const { mergedArray: sortedRightPart, totalInversionCount: totalRight } = countingInversions(arr.slice(position, length))
  const { mergedArray, totalInversionCount: totalSplit} = mergeAndCount(sortedLeftPart, sortedRightPart)

  return {
    mergedArray,
    totalInversionCount: totalLeft + totalRight + totalSplit
  }
}

async function main() {
  const fileHandle = await open(path.join(__dirname, './large-array.txt'));
  const lines = await fileHandle.readLines();

  const originalArray = [];
  for await (const line of lines) {
    originalArray.push(parseInt(line));
  }

  await fileHandle.close();

  return countingInversions(originalArray)
}

main().then(res => console.log(res))
