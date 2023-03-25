// TODO: organize this as a module. Do it as professionally as you can.
const ALPHABET_SIZE = 26;

class TrieNode {
  children: (TrieNode | undefined)[] = Array.from(
    { length: ALPHABET_SIZE },
    () => undefined,
  );
  isEndOfWord = false;

  constructor(public value: string) {}

  hasChildren(): boolean {
    return this.children.some(Boolean);
  }
}

// TODO: handle ascii characters and upper case letters
export default class Trie {
  private root = new TrieNode("");

  toArray(): string[] {
    return (function traverse(node: TrieNode, nodes: string[]) {
      nodes.push(node.value);

      for (let child of node.children) {
        if (child) {
          traverse(child, nodes);
        }
      }

      return nodes;
    })(this.root, []);
  }

  insert(word: string): void {
    var curr = this.root;

    for (let char of word) {
      let idx = Trie.getIdx(char);
      let node = curr.children[idx];
      if (!node) {
        node = curr.children[idx] = new TrieNode(char);
      }
      curr = node;
    }

    curr.isEndOfWord = true;
  }

  delete(word: string): boolean {
    var curr = this.root;
    var nodes = [curr];

    for (let char of word) {
      let idx = Trie.getIdx(char);
      let node = curr.children[idx];
      if (!node) {
        return false;
      }
      nodes.push(node);
      curr = node;
    }

    if (!curr.isEndOfWord) {
      return false;
    }

    curr.isEndOfWord = false;

    for (let i = nodes.length - 2; i >= 0; i--) {
      let parent = nodes[i];
      let child = nodes[i + 1];
      if (child.isEndOfWord || child.hasChildren()) {
        break;
      }
      let idx = Trie.getIdx(child.value);
      parent.children[idx] = undefined;
    }

    return true;
  }

  find(prefix: string): string[] {
    var curr = this.root;

    for (let char of prefix) {
      let idx = Trie.getIdx(char);
      let node = curr.children[idx];
      if (!node) {
        return [];
      }
      curr = node;
    }

    return (function traverse(
      node: TrieNode,
      prefix: string,
      results: string[],
    ) {
      if (node.isEndOfWord) {
        results.push(prefix);
      }

      for (let child of node.children) {
        if (child) {
          traverse(child, prefix + child.value, results);
        }
      }

      return results;
    })(curr, prefix, []);
  }

  private static getIdx(ch: string): number {
    const ZERO = "a".charCodeAt(0);
    return ch.toLowerCase().charCodeAt(0) - ZERO;
  }
}
