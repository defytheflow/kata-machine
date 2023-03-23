export default class ArrayList<T> {
  length = 0;
  private data: (T | undefined)[];

  constructor(private capacity = 10) {
    this.data = Array.from({ length: capacity }, () => undefined);
  }

  toString(): string {
    return "[" + this.data.slice(0, this.length).join(", ") + "]";
  }

  get(idx: number): T | undefined {
    if (idx < 0 || idx >= this.length) {
      return undefined;
    }
    return this.data[idx];
  }

  append(item: T): void {
    if (this.length == this.capacity) {
      this.grow();
    }
    this.data[this.length++] = item;
  }

  prepend(item: T): void {
    this.insertAt(item, 0);
  }

  insertAt(item: T, idx: number): void {
    if (idx < 0 || idx > this.length) {
      throw new Error("Index out of range");
    }

    if (this.length == this.capacity) {
      this.grow();
    }

    for (let i = this.length - 1; i >= 0; i--) {
      this.data[i + 1] = this.data[i];
    }

    this.data[idx] = item;
    this.length++;
  }

  remove(item: T): T | undefined {
    for (let i = 0; i < this.length; i++) {
      let value = this.data[i];
      if (value == item) {
        this.removeAt(i);
        return value;
      }
    }
    return undefined;
  }

  removeAt(idx: number): T | undefined {
    if (idx < 0 || idx > this.length) {
      return undefined;
    }

    var value = this.data[idx];
    for (let i = idx; i < this.length - 1; i++) {
      this.data[i] = this.data[i + 1];
    }
    this.data[this.length--] = undefined;
    return value;
  }

  private grow(): void {
    this.capacity *= 2;

    var data: (T | undefined)[] = Array.from(
      { length: this.capacity },
      () => undefined,
    );

    for (let i = 0; i < this.data.length; i++) {
      data[i] = this.data[i];
    }

    this.data = data;
  }
}
