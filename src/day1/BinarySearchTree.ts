class BinaryNode<T> {
  left: BinaryNode<T> | null = null;
  right: BinaryNode<T> | null = null;

  constructor(public value: T) {}

  isLeaf(): boolean {
    return this.left == null && this.right == null;
  }

  hasOneChild(): boolean {
    return (
      (this.left != null && this.right == null) ||
      (this.left == null && this.right != null)
    );
  }

  getSmallestNode(): BinaryNode<T> {
    var curr = this as BinaryNode<T>;
    while (curr.left) {
      curr = curr.left;
    }
    return curr;
  }
}

export default class BinarySearchTree<T> {
  private root: BinaryNode<T> | null = null;

  toString(): string {
    return this.toStringHelper(this.root, "", true);
  }

  private toStringHelper(
    node: BinaryNode<T> | null,
    prefix: string,
    isTail: boolean,
  ): string {
    var str = "";

    if (node) {
      str += prefix + (isTail ? "└── " : "├── ") + String(node.value) + "\n";
      let newPrefix = prefix + (isTail ? "    " : "│   ");
      str += this.toStringHelper(node.left, newPrefix, node.right == null);
      str += this.toStringHelper(node.right, newPrefix, true);
    }

    return str;
  }

  toArray(): T[] {
    var arr: T[] = [];
    this.traverseInOrder(this.root, arr);
    return arr;
  }

  private traverseInOrder(node: BinaryNode<T> | null, arr: T[]): void {
    if (node) {
      this.traverseInOrder(node.left, arr);
      arr.push(node.value);
      this.traverseInOrder(node.right, arr);
    }
  }

  find(value: T): boolean {
    return this.findNode(this.root, value);
    // return this.findIter(value);
  }

  private findNode(node: BinaryNode<T> | null, needle: T): boolean {
    if (!node) {
      return false;
    }

    if (needle == node.value) {
      return true;
    } else if (needle < node.value) {
      return this.findNode(node.left, needle);
    } else {
      return this.findNode(node.right, needle);
    }
  }

  private findIter(value: T): boolean {
    var curr = this.root;

    while (curr) {
      if (value == curr.value) {
        return true;
      } else if (value < curr.value) {
        curr = curr.left;
      } else {
        curr = curr.right;
      }
    }

    return false;
  }

  insert(value: T): void {
    this.root = this.insertNode(this.root, value);
    // this.insertIter(value);
  }

  private insertNode(node: BinaryNode<T> | null, value: T): BinaryNode<T> {
    if (!node) {
      return new BinaryNode(value);
    }

    if (value == node.value) {
      return node;
    } else if (value < node.value) {
      node.left = this.insertNode(node.left, value);
    } else {
      node.right = this.insertNode(node.right, value);
    }

    return node;
  }

  private insertIter(value: T): void {
    var node = new BinaryNode(value);

    if (!this.root) {
      this.root = node;
      return;
    }

    var curr = this.root;
    while (true) {
      if (value == curr.value) {
        return;
      } else if (value < curr.value) {
        if (!curr.left) {
          curr.left = node;
          return;
        } else {
          curr = curr.left;
        }
      } else {
        if (!curr.right) {
          curr.right = node;
          return;
        } else {
          curr = curr.right;
        }
      }
    }
  }

  delete(value: T): void {
    this.root = this.deleteNode(this.root, value);
  }

  private deleteNode(
    node: BinaryNode<T> | null,
    value: T,
  ): BinaryNode<T> | null {
    if (!node) {
      return null;
    }

    if (value == node.value) {
      if (node.isLeaf()) {
        return null;
      } else if (node.hasOneChild()) {
        return node.left ?? node.right;
      } else {
        let smallestNode = node.right!.getSmallestNode();
        node.value = smallestNode.value;
        node.right = this.deleteNode(node.right, smallestNode.value);
      }
    } else if (value < node.value) {
      node.left = this.deleteNode(node.left, value);
    } else {
      node.right = this.deleteNode(node.right, value);
    }

    return node;
  }
}
