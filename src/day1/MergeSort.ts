export default function merge_sort(arr: number[]): void {
  // console.log(`START merge_sort(${arr})`);
  if (arr.length <= 1) {
    return;
  }

  var mid = Math.floor(arr.length / 2);
  var left = arr.slice(0, mid);
  var right = arr.slice(mid);

  merge_sort(left);
  merge_sort(right);

  merge(arr, left, right);
  // console.log(`END merge_sort(${arr})`);
}

function merge(arr: number[], left: number[], right: number[]): void {
  var leftIdx = 0;
  var rightIdx = 0;
  var outIdx = 0;

  while (leftIdx < left.length && rightIdx < right.length) {
    if (left[leftIdx] <= right[rightIdx]) {
      arr[outIdx] = left[leftIdx];
      leftIdx++;
    } else {
      arr[outIdx] = right[rightIdx];
      rightIdx++;
    }
    outIdx++;
  }

  while (leftIdx < left.length) {
    arr[outIdx] = left[leftIdx];
    leftIdx++;
    outIdx++;
  }

  while (rightIdx < right.length) {
    arr[outIdx] = right[rightIdx];
    rightIdx++;
    outIdx++;
  }
}

