## Features

- **Arithmetic Operations**: Supports basic operators like `+`, `-`, `*`, and `/`.
- **Custom Functions**: Includes functions such as `sum`, `average`, `median`, and more.
- **Dynamic Cell References**: Allows formulas to reference other cells (e.g., `=A1+B2`).
- **Cell Range Handling**: Supports operations over a range of cells (e.g., `A1:A5`).
- **Real-time Updates**: Automatically recalculates cell values when dependencies change.
- **Interactive UI**: Provides a dynamic grid interface for user interaction.

## Getting Started

### Prerequisites

To run this project, you only need a modern web browser (e.g., Chrome, Firefox, Edge).

### Installation

1. Clone the repository or download the source files.
2. Open the `index.html` file in your web browser.

### Usage

1. Enter values into the cells of the spreadsheet.
2. Use formulas to perform calculations. All formulas should start with an `=` sign.
3. Examples of formulas:
   - `=A1+B2`: Adds the values of cells `A1` and `B2`.
   - `=sum(1, 2, 3)`: Calculates the sum of the numbers `1`, `2`, and `3`.
   - `=average(A1:A5)`: Calculates the average of the range `A1` to `A5`.
   - `=median(A1:A5)`: Finds the median of the values in the range `A1` to `A5`.

## Functions List

| Function Name | Description |
|---------------|-------------|
| `sum`         | Adds a list of numbers. |
| `average`     | Calculates the average of a list of numbers. |
| `median`      | Finds the median of a list of numbers. |
| `even`        | Filters even numbers from a list. |
| `someeven`    | Checks if any number in the list is even. |
| `everyeven`   | Checks if all numbers in the list are even. |
| `firsttwo`    | Returns the first two elements of a list. |
| `lasttwo`     | Returns the last two elements of a list. |
| `has2`        | Checks if the list includes the number `2`. |
| `increment`   | Increments each number in the list by `1`. |
| `random`      | Generates a random number within a range. |
| `range`       | Generates a numeric range. |
| `nodupes`     | Removes duplicates from a list. |

## Code Structure

- **`infixToFunction`**: Maps basic operators to their respective functions.
- **`highPrecedence`**: Handles high-precedence operators like `*` and `/`.
- **`spreadsheetFunctions`**: Contains built-in spreadsheet-like functions.
- **`evalFormula`**: Evaluates formulas by parsing and calculating dependencies.
- **`window.onload`**: Dynamically creates the grid layout and initializes the UI.
- **`update`**: Updates cell values upon change and evaluates formulas.

## Example

### Input:

- Cell `A1`: `10`
- Cell `A2`: `20`
- Cell `B1`: `=A1+A2`

### Output:

- Cell `B1`: `30`

## Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests.

---

**Happy Coding!**
# spreadsheet
