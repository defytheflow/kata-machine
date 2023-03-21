type Node<T> = {
  value: T;
  prev?: Node<T>;
};

export default class Stack<T> {
  length = 0;
  private head?: Node<T>;

  push(item: T): void {
    var node = { value: item } as Node<T>;
    this.length++;

    if (!this.head) {
      this.head = node;
      return;
    }

    node.prev = this.head;
    this.head = node;
  }

  pop(): T | undefined {
    if (!this.head) {
      return undefined;
    }

    var head = this.head;
    this.head = this.head.prev;
    this.length--;
    head.prev = undefined;
    return head.value;
  }

  peek(): T | undefined {
    return this.head?.value;
  }
}
