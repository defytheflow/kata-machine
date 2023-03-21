type Node<T> = {
  value: T;
  next?: Node<T>;
};

export default class SinglyLinkedList<T> {
  length = 0;
  private head?: Node<T>;
  private tail?: Node<T>;

  toString(): string {
    return [...this].map(nodeToString).join(" -> ");

    function nodeToString(node: Node<T>) {
      return `[${node.value}]`;
    }
  }

  *[Symbol.iterator]() {
    for (let curr = this.head; curr; curr = curr.next) {
      yield curr;
    }
  }

  get(idx: number): T | undefined {
    return this.getAt(idx)?.value;
  }

  append(item: T): void {
    var node = { value: item } as Node<T>;
    this.length++;

    if (!this.tail) {
      this.tail = this.head = node;
      return;
    }

    this.tail.next = node;
    this.tail = node;
  }

  prepend(item: T): void {
    var node = { value: item } as Node<T>;
    this.length++;

    if (!this.head) {
      this.head = this.tail = node;
      return;
    }

    node.next = this.head;
    this.head = node;
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

    var curr = this.getAt(idx - 1);

    if (!curr) {
      throw new Error("Length invariant failed");
    }

    var node = { value: item } as Node<T>;

    node.next = curr.next;
    curr.next = node;

    this.length++;
  }

  remove(item: T): T | undefined {
    if (!this.head) {
      return undefined;
    }

    if (this.head.value == item) {
      return this.removeHead();
    }

    for (let curr = this.head; curr.next; curr = curr.next) {
      if (curr.next.value == item) {
        return this.removeNextNode(curr);
      }
    }

    return undefined;
  }

  removeAt(idx: number): T | undefined {
    if (idx == 0) {
      return this.removeHead();
    }

    var node = this.getAt(idx - 1);

    if (!node) {
      return undefined;
    }

    return this.removeNextNode(node);
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

  private removeHead(): T | undefined {
    if (!this.head) {
      return undefined;
    }

    var value = this.head.value;
    this.head = this.head.next;

    if (this.length == 1) {
      this.tail = this.head;
    }

    this.length--;
    return value;
  }

  private removeNextNode(node: Node<T>): T | undefined {
    if (!node.next) {
      return undefined;
    }

    var nodeToDelete = node.next;
    node.next = node.next.next;

    if (nodeToDelete == this.tail) {
      this.tail = node;
    }

    this.length--;
    return nodeToDelete.value;
  }
}
