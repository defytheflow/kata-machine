type Node<T> = {
  value: T;
  next?: Node<T>;
  prev?: Node<T>;
};

export default class DoublyLinkedList<T> {
  length = 0;
  private head?: Node<T>;
  private tail?: Node<T>;

  toString(): string {
    return [...this].map(nodeToString).join(" <-> ");

    function nodeToString(node: Node<T>) {
      return `[${node.value}]`;
    }
  }

  *[Symbol.iterator]() {
    for (let curr = this.head; curr; curr = curr.next) {
      yield curr;
    }
  }

  *reverse() {
    for (let curr = this.tail; curr; curr = curr.prev) {
      yield curr;
    }
  }

  get(idx: number): T | undefined {
    return this.getAt(idx)?.value;
  }

  prepend(item: T): void {
    var node = { value: item } as Node<T>;
    this.length++;

    if (!this.head) {
      this.head = this.tail = node;
      return;
    }

    this.head.prev = node;
    node.next = this.head;
    this.head = node;
  }

  append(item: T): void {
    var node = { value: item } as Node<T>;
    this.length++;

    if (!this.tail) {
      this.tail = this.head = node;
      return;
    }

    node.prev = this.tail;
    this.tail.next = node;
    this.tail = node;
  }

  insertAt(item: T, idx: number): void {
    if (idx < 0 || idx > this.length) {
      throw new Error("Index out of range");
    }

    if (idx == 0) {
      return this.prepend(item);
    }

    if (idx == this.length) {
      return this.append(item);
    }

    var curr = this.getAt(idx);

    if (!curr || !curr.prev) {
      throw new Error("Length invariant failed");
    }

    var node = { value: item } as Node<T>;

    node.prev = curr.prev;
    node.next = curr;
    curr.prev.next = node;
    curr.prev = node;

    this.length++;
  }

  remove(item: T): T | undefined {
    for (let curr = this.head; curr; curr = curr.next) {
      if (curr.value == item) {
        return this.removeNode(curr);
      }
    }
    return undefined;
  }

  removeAt(idx: number): T | undefined {
    var node = this.getAt(idx);

    if (!node) {
      return undefined;
    }

    return this.removeNode(node);
  }

  private getAt(idx: number): Node<T> | undefined {
    if (idx < 0 || idx >= this.length) {
      return undefined;
    }

    var curr = this.head;

    for (let i = 0; i < idx && curr; i++) {
      curr = curr.next;
    }

    return curr;
  }

  private removeNode(node: Node<T>): T | undefined {
    this.length--;
    var value = node.value;

    if (this.length == 0) {
      this.head = this.tail = undefined;
      return value;
    }

    if (node.prev) {
      node.prev.next = node.next;
    }

    if (node.next) {
      node.next.prev = node.prev;
    }

    if (node == this.head) {
      this.head = node.next;
    }

    if (node == this.tail) {
      this.tail = node.prev;
    }

    return value;
  }
}
