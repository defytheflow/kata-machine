// TODO: finish this.
// add a private helper for traversing the single linked list, remove code duplication.
// maybe consider adding iterator protocol.
// make the this.length property management automatic.

class Node<T> {
  next?: Node<T>;
  constructor(public value: T) {}
}

export default class SinglyLinkedList<T> {
  private head?: Node<T>;
  private tail?: Node<T>;
  public length: number = 0;

  append(item: T): void {
    var node = new Node(item);
    this.length++;

    if (!this.tail) {
      this.tail = this.head = node;
      return;
    }

    this.tail.next = node;
    this.tail = node;
  }

  prepend(item: T): void {
    var node = new Node(item);
    this.length++;

    if (!this.head) {
      this.head = this.tail = node;
      return;
    }

    node.next = this.head;
    this.head = node;
  }

  insertAt(item: T, idx: number): void {
    // TODO:
  }

  remove(item: T): T | undefined {
    // is list empty?
    if (!this.head) {
      return undefined;
    }

    // are we removing the head?
    if (this.head.value == item) {
      return this.removeHead();
    }

    // the item is somewhere in between the head and tail
    {
      let curr;
      for (
        curr = this.head;
        curr.next && curr.next.value != item;
        curr = curr.next
      );

      if (!curr.next) {
        return undefined;
      }

      {
        let nodeToDelete = curr.next;
        curr.next = curr.next.next;

        // are we removing the tail?
        if (nodeToDelete == this.tail) {
          this.tail = curr;
        }

        this.length--;
        return nodeToDelete.value;
      }
    }
  }

  removeAt(idx: number): T | undefined {
    // is list empty?
    if (!this.head) {
      return undefined;
    }

    // is index out of bounds?
    if (idx >= this.length) {
      return undefined;
    }

    // are we removing the head?
    if (idx == 0) {
      return this.removeHead();
    }

    // the item is somewhere in between the head and tail
    {
      let curr = this.head;
      for (let i = 0; i < idx - 1 && curr.next; i++, curr = curr.next);

      if (!curr.next) {
        return undefined;
      }

      {
        let nodeToDelete = curr.next;
        curr.next = curr.next.next;

        // are we removing the tail?
        if (nodeToDelete == this.tail) {
          this.tail = curr;
        }

        this.length--;
        return nodeToDelete.value;
      }
    }
  }

  get(idx: number): T | undefined {
    // is list empty?
    if (!this.head) {
      return undefined;
    }

    // is index out of bounds?
    if (idx >= this.length) {
      return undefined;
    }

    {
      let curr = this.head as Node<T> | undefined;
      for (let i = 0; i < idx && curr; i++, curr = curr.next);
      return curr?.value;
    }
  }

  private removeHead(): T | undefined {
    if (!this.head) {
      return undefined;
    }

    var value = this.head.value;
    this.head = this.head.next;

    // update the tail
    if (this.length == 1) {
      this.tail = this.head;
    }

    this.length--;
    return value;
  }
}
