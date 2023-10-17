let celsius = document.getElementById("celsius");
let fahrenheight = document.getElementById("fahrenheight");

const debounce = (func, wait) => {
  let timer = null;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(func, wait);
  };
};

celsius.addEventListener(
  "input",
  debounce(() => {
    if (celsius.value.length != 0) {
      fahrenheight.value = convertToFahrenheight(celsius.value);
    } else {
      fahrenheight.value = "";
    }
  }, 500)
);

fahrenheight.addEventListener(
  "input",
  debounce(() => {
    if (fahrenheight.value.length != 0) {
      celsius.value = convertToCelsius(fahrenheight.value);
    } else {
      celsius.value = "";
    }
  }, 500)
);

const convertToFahrenheight = (celsius) => (Number(celsius) * 9) / 5 + 32;
const convertToCelsius = (celsius) => ((Number(celsius) - 32) * 5) / 9;
