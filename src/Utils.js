export const getMostSharedNode = (nodes) =>
  nodes.reduce(
    (prev, curr, i, arr) => {
      prev[curr] = (prev[curr] || 0) + 1;
      prev.max = prev[curr] > prev.max ? prev[curr] : prev.max;
      if (i == arr.length - 1) {
        prev = Object.entries(prev).filter(
          ([k, v]) => v == prev.max && k != "max"
        );
        return prev.map((x) => x[0]);
      }
      return prev;
    },
    { max: 0 }
  );

export const getUniqueNodes = (nodes) => [...new Set(nodes)].length;
