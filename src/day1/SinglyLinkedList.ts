class Node<T> {
  next?: Node<T>;
  constructor(public value: T) {}
}

export default class SinglyLinkedList<T> {
  length = 0;
  #head?: Node<T>;
  #tail?: Node<T>;

  toString() {
    return [...this].map(nodeToString).join(" <-> ");

    function nodeToString(node: Node<T>) {
      return `[${node.value}]`;
    }
  }

  *[Symbol.iterator]() {
    for (let curr = this.#head; curr; curr = curr.next) {
      yield curr;
    }
  }

  get(idx: number): T | undefined {
    if (idx >= this.length) {
      return undefined;
    }

    {
      let curr = this.#head;
      for (let i = 0; i < idx && curr; i++) {
        curr = curr.next;
      }
      return curr?.value;
    }
  }

  append(item: T): void {
    var node = new Node(item);
    this.length++;

    if (!this.#tail) {
      this.#tail = this.#head = node;
      return;
    }

    this.#tail.next = node;
    this.#tail = node;
  }

  prepend(item: T): void {
    var node = new Node(item);
    this.length++;

    if (!this.#head) {
      this.#head = this.#tail = node;
      return;
    }

    node.next = this.#head;
    this.#head = node;
  }

  insertAt(item: T, idx: number): void {
    if (!this.#head) {
      return undefined;
    }

    if (idx > this.length) {
      return undefined;
    }

    if (idx == 0) {
      return this.prepend(item);
    }

    if (idx == this.length) {
      return this.append(item);
    }

    {
      let curr = this.#head;
      for (let i = 0; i < idx - 1 && curr.next; i++) {
        curr = curr.next;
      }

      {
        let node = new Node(item);
        node.next = curr.next;

        curr.next = node;
        this.length++;
      }
    }
  }

  remove(item: T): T | undefined {
    if (!this.#head) {
      return undefined;
    }

    if (this.#head.value == item) {
      return this.#removeHead();
    }

    for (let curr = this.#head; curr.next; curr = curr.next) {
      if (curr.next.value == item) {
        return this.#removeNextNode(curr);
      }
    }

    return undefined;
  }

  removeAt(idx: number): T | undefined {
    if (!this.#head) {
      return undefined;
    }

    if (idx >= this.length) {
      return undefined;
    }

    if (idx == 0) {
      return this.#removeHead();
    }

    {
      let curr = this.#head;
      for (let i = 0, curr = this.#head; i < idx - 1 && curr.next; i++) {
        curr = curr.next;
      }
      return this.#removeNextNode(curr);
    }
  }

  #removeHead(): T | undefined {
    if (!this.#head) {
      return undefined;
    }

    {
      let value = this.#head.value;
      this.#head = this.#head.next;

      if (this.length == 1) {
        this.#tail = this.#head;
      }

      this.length--;
      return value;
    }
  }

  #removeNextNode(node: Node<T>): T | undefined {
    if (!node.next) {
      return undefined;
    }

    {
      let nodeToDelete = node.next;
      node.next = node.next.next;

      if (nodeToDelete == this.#tail) {
        this.#tail = node;
      }

      this.length--;
      return nodeToDelete.value;
    }
  }
}
