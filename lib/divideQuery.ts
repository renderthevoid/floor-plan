export const divideQuery = (query: number | string | null) => {
  let queryString = typeof query === "string" ? query : "";
  if (typeof query == null) {
    return null;
  }
  if (typeof query === "number") {
    queryString = query.toString();
  }
  let space = 0;
  let number = "";

  for (let i = queryString.length - 1; i >= 0; i--) {
    if (space === 3) {
      number = " " + number;
      space = 0;
    }
    number = queryString.charAt(i) + number;
    space++;
  }
  return number;
};

export default divideQuery;
