import BinarySearchTree from "@code/BinarySearchTree";

test("binary search array", function () {
  const tree = new BinarySearchTree<number>();

  for (let v of [81, 1337, 69, 99, 3, 90, 69420, 71, 4, 1, 420]) {
    tree.insert(v);
  }

  expect(tree.find(69)).toEqual(true);
  expect(tree.find(1336)).toEqual(false);
  expect(tree.find(69420)).toEqual(true);
  expect(tree.find(69421)).toEqual(false);
  expect(tree.find(1)).toEqual(true);
  expect(tree.find(0)).toEqual(false);

  // console.log(tree.toArray());
  // console.log(tree.toString());

  // Delete a node with no children.
  expect(tree.find(1)).toEqual(true);
  tree.delete(1);
  expect(tree.find(1)).toEqual(false);

  // Delete a node with one child.
  expect(tree.find(3)).toEqual(true);
  tree.delete(3);
  expect(tree.find(3)).toEqual(false);

  // Delete a node that has both children.
  expect(tree.find(99)).toEqual(true);
  tree.delete(99);
  expect(tree.find(99)).toEqual(false);

  // console.log(tree.toArray());
  // console.log(tree.toString());

  expect(tree.find(1337)).toEqual(true);
  tree.delete(1337);
  expect(tree.find(1337)).toEqual(false);
});
