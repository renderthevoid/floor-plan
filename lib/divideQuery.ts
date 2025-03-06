export const divideQuery = (query: string) => {
  let space = 0;
  let number = "";

  for (let i = query.length - 1; i >= 0; i--) {
    if (space === 3) {
      number = " " + number;
      space = 0;
    }
    number = query.charAt(i) + number;
    space++;
  }
  return number;
};

export default divideQuery;

