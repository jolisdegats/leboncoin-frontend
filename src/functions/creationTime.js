const creationTime = (str) => {
  const arr = str.split("T");
  const dateArr = arr[0].split("-");
  const timeArr = arr[1].slice(0, 5);
  const newStr =
    dateArr[2] + "/" + dateArr[1] + "/" + dateArr[0] + " à " + timeArr;
  return newStr;
};

export { creationTime };
