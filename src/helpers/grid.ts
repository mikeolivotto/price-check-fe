export const priceComparator = (a: string, b: string) => {
  const priceA = parseInt(a);
  const priceB = parseInt(b);

  if (priceA < priceB) {
    return -1;
  }
  if (priceA > priceB) {
    return 1;
  }
  return 0;
};
