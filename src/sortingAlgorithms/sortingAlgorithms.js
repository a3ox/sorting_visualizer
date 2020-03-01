export function genBubbleSortAnimations(array) {
  const animations = [];
  return bubbleSortHelper(array, animations);
}

function bubbleSortHelper(array, animations) {
  var n = array.length - 1;

  do {
    var sort = false;
    for (let i = 0; i < n; i++) {
      if (array[i] > array[i + 1]) {
        const temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
        sort = true;
        animations.push([i, i + 1]);
      }
    }
    n--;
  } while (sort);

  return animations;
}
