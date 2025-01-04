// Object mapping mathematical operators to their respective functions
const infixToFunction = {
    "+": (x, y) => x + y, // Addition function
    "-": (x, y) => x - y, // Subtraction function
    "*": (x, y) => x * y, // Multiplication function
    "/": (x, y) => x / y, // Division function
  }
  
  // Function to evaluate a string with infix operators using a regex
  const infixEval = (str, regex) => 
    str.replace(regex, (_match, arg1, operator, arg2) => 
      infixToFunction[operator](parseFloat(arg1), parseFloat(arg2)));
  
  // Function to evaluate high precedence operations (* and /) recursively
  const highPrecedence = str => {
    const regex = /([\d.]+)([*\/])([\d.]+)/; // Matches numbers with * or / operators
    const str2 = infixEval(str, regex);
    return str === str2 ? str : highPrecedence(str2); // Recursive evaluation until no more changes
  }
  
  // Helper function to check if a number is even
  const isEven = num => num % 2 === 0;
  
  // Function to calculate the sum of an array of numbers
  const sum = nums => nums.reduce((acc, el) => acc + el, 0);
  
  // Function to calculate the average of an array of numbers
  const average = nums => sum(nums) / nums.length;
  
  // Function to calculate the median of an array of numbers
  const median = nums => {
    const sorted = nums.slice().sort((a, b) => a - b); // Sort array in ascending order
    const length = sorted.length;
    const middle = length / 2 - 1;
    return isEven(length)
      ? average([sorted[middle], sorted[middle + 1]]) // Average of middle two for even length
      : sorted[Math.ceil(middle)]; // Middle value for odd length
  }
  
  // Object containing various spreadsheet-like utility functions
  const spreadsheetFunctions = {
    sum, // Sum of numbers
    average, // Average of numbers
    median, // Median of numbers
    even: nums => nums.filter(isEven), // Filter even numbers
    someeven: nums => nums.some(isEven), // Check if some numbers are even
    everyeven: nums => nums.every(isEven), // Check if all numbers are even
    firsttwo: nums => nums.slice(0, 2), // First two elements
    lasttwo: nums => nums.slice(-2), // Last two elements
    has2: nums => nums.includes(2), // Check if array includes 2
    increment: nums => nums.map(num => num + 1), // Increment each number by 1
    random: ([x, y]) => Math.floor(Math.random() * y + x), // Random number in range
    range: nums => range(...nums), // Generate a range
    nodupes: nums => [...new Set(nums).values()], // Remove duplicates
    '': arg => arg, // Identity function
  }
  
  // Apply a spreadsheet-like function to a string
  const applyFunction = str => {
    const noHigh = highPrecedence(str); // Evaluate high precedence operators first
    const infix = /([\d.]+)([+-])([\d.]+)/; // Regex for + and - operators
    const str2 = infixEval(noHigh, infix);
    const functionCall = /([a-z0-9]*)\(([0-9., ]*)\)(?!.*\()/i; // Regex for function calls
    const toNumberList = args => args.split(",").map(parseFloat); // Convert args to number array
    const apply = (fn, args) => spreadsheetFunctions[fn.toLowerCase()](toNumberList(args));
    return str2.replace(functionCall, (match, fn, args) => 
      spreadsheetFunctions.hasOwnProperty(fn.toLowerCase()) ? apply(fn, args) : match);
  }
  
  // Generate a numeric range array
  const range = (start, end) => 
    Array(end - start + 1).fill(start).map((element, index) => element + index);
  
  // Generate a character range array
  const charRange = (start, end) => 
    range(start.charCodeAt(0), end.charCodeAt(0)).map(code => String.fromCharCode(code));
  
  // Evaluate a spreadsheet-like formula
  const evalFormula = (x, cells) => {
    const idToText = id => cells.find(cell => cell.id === id).value; // Get cell value by ID
    const rangeRegex = /([A-J])([1-9][0-9]?):([A-J])([1-9][0-9]?)/gi; // Regex for cell ranges
    const rangeFromString = (num1, num2) => range(parseInt(num1), parseInt(num2));
    const elemValue = num => character => idToText(character + num);
    const addCharacters = character1 => character2 => num => 
      charRange(character1, character2).map(elemValue(num));
    const rangeExpanded = x.replace(rangeRegex, (_match, char1, num1, char2, num2) => 
      rangeFromString(num1, num2).map(addCharacters(char1)(char2)));
    const cellRegex = /[A-J][1-9][0-9]?/gi; // Regex for single cells
    const cellExpanded = rangeExpanded.replace(cellRegex, match => idToText(match.toUpperCase()));
    const functionExpanded = applyFunction(cellExpanded); // Apply functions
    return functionExpanded === x ? functionExpanded : evalFormula(functionExpanded, cells);
  }
  
  // Initialize the spreadsheet interface
  window.onload = () => {
    const container = document.getElementById("container");
    const createLabel = (name) => {
      const label = document.createElement("div"); // Create a div for labels
      label.className = "label"; // Assign class for styling
      label.textContent = name; // Set label text
      container.appendChild(label); // Add label to container
    }
    const letters = charRange("A", "J"); // Generate column labels A-J
    letters.forEach(createLabel); // Add column labels
    range(1, 99).forEach(number => { // Generate row labels 1-99
      createLabel(number); // Add row label
      letters.forEach(letter => { // Create cells for each column in the row
        const input = document.createElement("input");
        input.type = "text"; // Input field for cell
        input.id = letter + number; // Unique ID for cell
        input.ariaLabel = letter + number; // Accessibility label
        input.onchange = update; // Trigger update on value change
        container.appendChild(input); // Add input to container
      })
    })
  }
  
  // Update the cell value after evaluating the formula
  const update = event => {
    const element = event.target;
    const value = element.value.replace(/\s/g, ""); // Remove whitespace
    if (!value.includes(element.id) && value.startsWith('=')) { // Check for valid formula
      element.value = evalFormula(value.slice(1), Array.from(document.getElementById("container").children));
    }
  }
  