export default function bfs(head: BinaryNode<number>, needle: number): boolean {
  var queue: (BinaryNode<number> | null)[] = [head];

  while (queue.length > 0) {
    let node = queue.shift();

    if (!node) {
      break; // this will never run.
    }

    if (node.value == needle) {
      return true;
    }

    if (node.left) {
      queue.push(node.left);
    }

    if (node.right) {
      queue.push(node.right);
    }
  }

  return false;
}
