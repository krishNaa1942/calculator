const themeSwitcher = document.getElementById("themeSwitcher");
let currentTheme = "royal";

function switchTheme(theme) {
  document.body.classList.remove("royal-theme", "light-theme", "dark-theme");
  document.body.classList.add(`${theme}-theme`);
  currentTheme = theme;
}

themeSwitcher.addEventListener("click", function () {
  if (currentTheme === "royal") {
    switchTheme("light");
  } else if (currentTheme === "light") {
    switchTheme("dark");
  } else {
    switchTheme("royal");
  }
});

// Keyboard shortcuts for themes
document.addEventListener("keydown", function (event) {
  if (event.key === "r" || event.key === "R") {
    switchTheme("royal");
  } else if (event.key === "l" || event.key === "L") {
    switchTheme("light");
  } else if (event.key === "d" || event.key === "D") {
    switchTheme("dark");
  }
});

// Calculator logic
const display = document.getElementById("display");
let currentInput = "";
let previousInput = "";
let operator = null;

const buttons = document.querySelectorAll(".btn");
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    const value = this.getAttribute("data-value");

    if (value === "C") {
      clearDisplay();
    } else if (value === "=") {
      calculate();
    } else if (["+", "-", "*", "/"].includes(value)) {
      handleOperator(value);
    } else {
      handleNumber(value);
    }
  });
});

function handleNumber(value) {
  if (currentInput.length < 10) {
    currentInput += value;
    updateDisplay(currentInput);
  }
}

function handleOperator(value) {
  if (currentInput === "" && value === "-") {
    currentInput = "-";
    updateDisplay(currentInput);
    return;
  }
  if (currentInput !== "") {
    if (operator === null) {
      previousInput = currentInput;
    } else {
      calculate();
    }
    operator = value;
    currentInput = "";
  }
}

function calculate() {
  if (previousInput !== "" && currentInput !== "") {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch (operator) {
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      case "*":
        result = prev * current;
        break;
      case "/":
        result = prev / current;
        break;
    }

    updateDisplay(result);
    previousInput = result.toString();
    currentInput = "";
    operator = null;
  }
}

function clearDisplay() {
  currentInput = "";
  previousInput = "";
  operator = null;
  updateDisplay("0");
}

function updateDisplay(value) {
  display.textContent = value.length > 10 ? value.slice(0, 10) : value;
}
