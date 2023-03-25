export default class MinHeap {
  length = 0;
  private data: number[] = [];

  insert(value: number): void {
    this.data[this.length] = value;
    this.heapifyUp(this.length);
    this.length++;
  }

  delete(): number {
    if (this.length == 0) {
      return -1;
    }

    var value = this.data[0];

    if (this.length == 1) {
      this.data = [];
      this.length--;
      return value;
    }

    this.data[0] = this.data[this.length - 1];
    this.length--;
    this.heapifyDown(0);
    return value;
  }

  private heapifyDown(idx: number): void {
    if (idx >= this.length) {
      return;
    }

    var leftIdx = MinHeap.leftChildIdx(idx);
    var rightIdx = MinHeap.rightChildIdx(idx);

    if (leftIdx >= this.length) {
      return;
    }

    var leftValue = this.data[leftIdx];
    var rightValue = this.data[rightIdx];
    var value = this.data[idx];

    if (leftValue > rightValue && value > rightValue) {
      this.data[rightIdx] = value;
      this.data[idx] = rightValue;
      this.heapifyDown(rightIdx);
    } else if (rightValue > leftValue && value > leftValue) {
      this.data[leftIdx] = value;
      this.data[idx] = leftValue;
      this.heapifyDown(leftIdx);
    }
  }

  private heapifyUp(idx: number): void {
    if (idx == 0) {
      return;
    }

    var parentIdx = MinHeap.parentIdx(idx);
    var parentValue = this.data[parentIdx];
    var value = this.data[idx];

    if (parentValue > value) {
      this.data[parentIdx] = value;
      this.data[idx] = parentValue;
      this.heapifyUp(parentIdx);
    }
  }

  private static parentIdx(idx: number): number {
    return Math.floor((idx - 1) / 2);
  }

  private static leftChildIdx(idx: number): number {
    return idx * 2 + 1;
  }

  private static rightChildIdx(idx: number): number {
    return idx * 2 + 2;
  }
}
