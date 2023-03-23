export default class RingBuffer<T> {
  length = 0;
  private data: (T | undefined)[];
  private head = 0;
  private tail = 0;

  constructor(private capacity = 5) {
    this.data = Array.from({ length: capacity }, () => undefined);
  }

  push(item: T): void {
    this.data[this.tail] = item;
    this.tail = (this.tail + 1) % this.capacity;
    this.length = (this.length + 1) % this.capacity;
  }

  get(idx: number): T | undefined {
    if (idx < 0 || idx >= this.length) {
      return undefined;
    }
    return this.data[(this.head + idx) % this.capacity];
  }

  pop(): T | undefined {
    if (this.length == 0) {
      return undefined;
    }

    var item = this.data[this.head];
    this.data[this.head] = undefined;
    this.head = (this.head + 1) % this.capacity;
    this.length--;
    return item;
  }
}
