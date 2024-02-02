import { open } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function swap([x, y]) {
  return [y, x]
}

// After partition procedure, we got array like this: [<p, p, >p]
function partition(arr) {
  // Choose last element as the pivot
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

  return {
    partitionedArray: arr,
    pivotPosition: i - 1
  }
}

function quickSort(arr) {
  if (arr.length <= 1) return {
    sortedArray: arr,
    totalComparisonCount: 0
  }

  const { partitionedArray , pivot, pivotPosition} =  partition(arr)
  const leftPart = partitionedArray.slice(0, pivotPosition)
  const rightPart = partitionedArray.slice(pivotPosition + 1, arr.length)

  const leftResult = quickSort(leftPart);
  const rightResult = quickSort(rightPart)

  return {
    sortedArray: [...leftResult.sortedArray, partitionedArray[pivotPosition], ...rightResult.sortedArray],
    totalComparisonCount: leftPart.length + rightPart.length + leftResult.totalComparisonCount + rightResult.totalComparisonCount
  }
}

async function main() {
  const fileHandle = await open(path.join(__dirname, './quick-sort-data.txt'));
  console.log({__filename, __dirname})

  const lines = await fileHandle.readLines();

  const originalArray = [];
  for await (const line of lines) {
    originalArray.push(parseInt(line));
  }

  await fileHandle.close();

  return quickSort(originalArray)
}

main().then(res => console.log(res))