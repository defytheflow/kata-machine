export default function insertion_sort(arr: number[]): void {
  for (let i = 1; i < arr.length; i++) {
    let j = i;
    while (j > 0 && arr[j - 1] > arr[j]) {
      let tmp = arr[j - 1];
      arr[j - 1] = arr[j];
      arr[j] = tmp;
      j--;
    }
  }
}

