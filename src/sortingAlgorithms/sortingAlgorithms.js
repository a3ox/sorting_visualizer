export function genBubbleSortAnimations(array) {
  const animations = [];
  return bubbleSortHelper(array, array.length - 1, animations);
}

function bubbleSortHelper(array, size, animations) {
  do {
    var sort = false;
    for (let i = 0; i < size; i++) {
      var compare = [i, i + 1, false];
      if (array[i] > array[i + 1]) {
        const temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
        sort = true;
        compare[2] = true;
      }
      animations.push(compare);
    }
    size--;
  } while (sort);

  return animations;
}

export function genInsertionSortAnimations(array) {
  const animations = [];
  return insertionSortHelper(array, array.length, animations);
}

function insertionSortHelper(array, size, animations) {
  for (let i = 1; i < size; i++) {
    var key = array[i];
    var j = i - 1;
    while (j >= 0 && array[j] > key) {
      animations.push([j + 1, j]);
      array[j + 1] = array[j];
      j = j - 1;
    }
    array[j + 1] = key;
  }
  console.log(array);
  return animations;
}

export function genMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    animations.push([i, j]);
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}
