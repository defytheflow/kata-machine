export default function dfs(head: BinaryNode<number>, needle: number): boolean {
  if (head.value == needle) {
    return true;
  }

  if (head.value > needle) {
    return head.left != null && dfs(head.left, needle);
  }

  return head.right != null && dfs(head.right, needle);
}
