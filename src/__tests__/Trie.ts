import Trie from "@code/Trie";

// TODO: handle ascii characters and upper case letters
test("Trie", function () {
  const trie = new Trie();

  trie.insert("foo");
  trie.insert("fool");
  trie.insert("foolish");
  trie.insert("bar");

  expect(trie.find("fo").sort()).toEqual(["foo", "fool", "foolish"]);

  trie.delete("fool");

  expect(trie.find("fo").sort()).toEqual(["foo", "foolish"]);
});

test("My Trie (deletes empty nodes without children)", function () {
  const trie = new Trie();

  trie.insert("fool");
  trie.insert("foolish");
  trie.insert("foolishness");

  expect(trie.find("fool").sort()).toEqual(["fool", "foolish", "foolishness"]);

  trie.delete("foolish");

  expect(trie.toArray().length).toEqual("foolishness".length + 1);

  trie.delete("foolishness");

  expect(trie.toArray().length).toEqual("fool".length + 1);

  trie.delete("fool");

  expect(trie.toArray().length).toEqual(1);
});
