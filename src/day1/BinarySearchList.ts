export default function bs_list(haystack: number[], needle: number): boolean {
  var lo = 0;
  var hi = haystack.length;

  while (lo < hi) {
    // let m = Math.floor(lo + (hi - lo) / 2);
    const m = Math.floor((lo + hi) / 2);
    const v = haystack[m];

    if (v == needle) {
      return true;
    } else if (v > needle) {
      hi = m;
    } else {
      lo = m + 1;
    }
  }

  return false;
}

// needle = 69
// (lo, hi]

//   0               5                              11
//  lo               m                             hi
// [1, 3, 4, 69, 71, 81, 90, 99, 420, 1337, 69420]

// m = floor(0 + (11 - 0) / 2) = floor (5.5) = 5
// v = 81

//   0    2          5
//  lo    m          hi
// [1, 3, 4, 69, 71, 81, 90, 99, 420, 1337, 69420]

// m = floor(0 + (5 - 0) / 2) = floor (2.5) = 2
// v = 4

//            3   4   5
//           lo   m  hi
// [1, 3, 4, 69, 71, 81, 90, 99, 420, 1337, 69420]

// m = floor(3 + (5 - 3) / 2) = 4
// v = 4

//            3   4
//           lo   hi
// [1, 3, 4, 69, 71, 81, 90, 99, 420, 1337, 69420]

// m = floor(3 + (4 - 3) / 2) = 3
// v = 69
