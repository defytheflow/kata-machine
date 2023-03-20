export default function quick_sort(arr: number[]): void {
  qs(arr, 0, arr.length - 1);
}

function qs(arr: number[], low: number, high: number): void {
  if (low >= high) {
    return;
  }

  var pivotIdx = partition(arr, low, high);
  qs(arr, low, pivotIdx - 1);
  qs(arr, pivotIdx + 1, high);
}

function partition(arr: number[], low: number, high: number): number {
  var pivot = arr[high];
  var idx = low - 1;

  for (let i = low; i < high; i++) {
    if (arr[i] <= pivot) {
      idx++;
      let tmp = arr[i];
      arr[i] = arr[idx];
      arr[idx] = tmp;
    }
  }

  idx++;
  arr[high] = arr[idx];
  arr[idx] = pivot;

  return idx;
}
