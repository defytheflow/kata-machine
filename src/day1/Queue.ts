type Node<T> = {
  value: T;
  next?: Node<T>;
};

export default class Queue<T> {
  length = 0;
  #head?: Node<T>;
  #tail?: Node<T>;

  enqueue(item: T): void {
    var node = { value: item } as Node<T>;
    this.length++;

    if (!this.#tail) {
      this.#tail = this.#head = node;
      return;
    }

    this.#tail.next = node;
    this.#tail = node;
  }

  deque(): T | undefined {
    if (!this.#head) {
      return undefined;
    }

    {
      let head = this.#head;
      this.#head = this.#head.next;
      if (!this.#head) {
        this.#tail = undefined;
      }
      this.length--;
      head.next = undefined; // free, not needed because of gc
      return head.value;
    }
  }

  peek(): T | undefined {
    return this.#head?.value;
  }
}
