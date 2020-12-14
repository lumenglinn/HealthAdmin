export const fmoney = (num): any => {
  let number = num;
  number = (number || 0).toString();
  let result = "";

  if (number.indexOf(".") !== -1) {
    result = `.${number.split(".")[1]}`;
    number = number.split(".")[0];
  }
  while (number.length > 3) {
    result = `,${number.slice(-3)}${result}`;
    number = number.slice(0, number.length - 3);
  }
  if (number) {
    result = number + result;
  }

  return result;
};
