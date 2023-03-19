export default function in_order_search(head: BinaryNode<number>): number[] {
  return walk(head, []);
}

function walk(node: BinaryNode<number> | null, path: number[]): number[] {
  if (!node) {
    return path;
  }
  walk(node.left, path);
  path.push(node.value);
  walk(node.right, path);
  return path;
}
