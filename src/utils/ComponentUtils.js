export function getTwoColumnGridArraySplitFromArray(list) {
  return list.reduce(
    (acc, curr, idx) => {
      if (idx % 2 === 0) {
        acc[0].push(curr);
      } else {
        acc[1].push(curr);
      }
      return acc;
    },
    [[], []]
  );
}
