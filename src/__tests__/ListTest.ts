export function test_list(list: List<number>): void {
  list.append(5);
  list.append(7);
  list.append(9);

  // console.log(list.toString());

  expect(list.get(2)).toEqual(9);
  expect(list.removeAt(1)).toEqual(7);
  expect(list.length).toEqual(2);

  list.append(11);

  // console.log(list.toString());

  expect(list.removeAt(1)).toEqual(9);
  expect(list.remove(9)).toEqual(undefined);
  expect(list.removeAt(0)).toEqual(5);
  expect(list.removeAt(0)).toEqual(11);
  expect(list.length).toEqual(0);

  list.prepend(5);
  list.prepend(7);
  list.prepend(9);

  // console.log(list.toString());

  expect(list.get(2)).toEqual(5);
  expect(list.get(0)).toEqual(9);
  expect(list.remove(9)).toEqual(9);
  expect(list.length).toEqual(2);
  expect(list.get(0)).toEqual(7);

  list.insertAt(10, 2);

  // console.log(list.toString());

  expect(list.get(2)).toEqual(10);
  expect(list.length).toEqual(3);

  list.insertAt(-2, 1);
  list.insertAt(-3, 0);
  list.insertAt(5, 3);

  expect(list.length).toEqual(6);

  // console.log(list.toString());
}
