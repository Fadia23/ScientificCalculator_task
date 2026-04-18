let currentInput = "0";
const displayElement = document.getElementById("display");

function updateDisplay() {
  displayElement.innerText = currentInput;
  const updateDisplay = () => {
    let str = currentInput.toString();
    if (str.length > 12) {
      if (!isNaN(str) && str.includes(".")) {
        displayElement.innerText = parseFloat(str).toPrecision(8);
      } else {
        displayElement.innerText = str.substring(0, 12);
      }
    } else {
      displayElement.innerText = str;
    }
  };
}

function appendNumber(num) {
  if (currentInput === "0") currentInput = num.toString();
  else currentInput += num.toString();
  updateDisplay();
}

function appendOperator(op) {
  if (op === "sqrt") currentInput = Math.sqrt(eval(currentInput)).toString();
  else if (op === "1/x") currentInput = (1 / eval(currentInput)).toString();
  else if (op === "**2")
    currentInput = Math.pow(eval(currentInput), 2).toString();
  else if (op === "exp") currentInput += "*(10**";
  else currentInput += op;
  updateDisplay();
}

function scientific(func) {
  let val = eval(currentInput);
  try {
    switch (func) {
      case "abs":
        currentInput = Math.abs(val);
        break;
      case "log":
        currentInput = Math.log10(val);
        break;
      case "ln":
        currentInput = Math.log(val);
        break;
      case "10x":
        currentInput = Math.pow(10, val);
        break;
      case "fact":
        currentInput = factorial(val);
        break;
    }
  } catch (e) {
    currentInput = "Error";
  }
  updateDisplay();
}

function factorial(n) {
  if (n < 0) return "Error";
  if (n === 0) return 1;
  let res = 1;
  for (let i = 1; i <= n; i++) res *= i;
  return res;
}

function calculate() {
  try {
    let expression = currentInput.replace(/×/g, "*").replace(/÷/g, "/");

    let result = eval(expression);

    if (!isFinite(result)) {
      currentInput = "Error";
    } else {
      if (Math.abs(result) > 9999999999) {
        currentInput = result.toExponential(4).toString();
      } else {
        currentInput = parseFloat(result.toFixed(8)).toString();
      }
    }
  } catch (e) {
    currentInput = "Error";
  }
  updateDisplay();
}

function clearAll() {
  currentInput = "0";
  updateDisplay();
}
function deleteLast() {
  currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : "0";
  updateDisplay();
}
function toggleSign() {
  currentInput = (eval(currentInput) * -1).toString();
  updateDisplay();
}
function appendOperator(op) {
  if (currentInput === "Error") return;
  if (op === "**2") {
    currentInput = Math.pow(eval(currentInput), 2).toString();
  } else if (op === "sqrt") {
    currentInput = Math.sqrt(eval(currentInput)).toString();
  } else {
    const lastChar = currentInput.slice(-1);
    if (["+", "-", "*", "/", "%"].includes(lastChar)) {
      currentInput = currentInput.slice(0, -1) + op;
    } else {
      currentInput += op;
    }
  }
  updateDisplay();
}
function inverseNumber() {
  try {
    let val = eval(currentInput.replace(/×/g, "*").replace(/÷/g, "/"));
    if (val === 0) {
      currentInput = "Error";
    } else {
      let result = 1 / val;
      currentInput = parseFloat(result.toFixed(8)).toString();
    }
  } catch (e) {
    currentInput = "Error";
  }
  updateDisplay();
}

function appendE() {
  if (currentInput === "0" || currentInput === "Error") {
    currentInput = Math.E.toString();
  } else {
    const lastChar = currentInput.slice(-1);
    if (!isNaN(lastChar) && lastChar !== "") {
      currentInput += "*" + Math.E;
    } else {
      currentInput += Math.E;
    }
  }
  updateDisplay();
}
function calculatePercentage() {
  try {
    currentInput = (eval(currentInput) / 100).toString();
    updateDisplay();
  } catch {
    currentInput = "Error";
    updateDisplay();
  }
}
function appendExp() {
  const lastChar = currentInput.slice(-1);
  if (!isNaN(lastChar) && currentInput !== "0") {
    currentInput += "e+";
    updateDisplay();
  }
}
