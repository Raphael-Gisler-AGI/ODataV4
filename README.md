# OData V4

All you need to know about how to use OData V4 with CAP and UI5

The website is hosted [here](https://raphael-gisler-agi.github.io/ODataV4/).

## Setting the Standard
When mentioning a function the function should be documented as:
```markdown
[**fnName()**](link_to_documentation)
```

## Getting Started

### Installation

1. Clone the Repository
   ```sh
   git clone https://github.com/Raphael-Gisler-AGI/ODataV4.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

### Commands

- The documentation (based on your markdown files) is run on your localhost[port:5173] and all changes will be displayed in real time

  ```sh
  npm run docs:dev
  ```

- Generates the website inside of your dist folder

  ```sh
  npm run docs:build
  ```

- The documentation (based on your previous build) is run on your localhost[port:4173]

  ```sh
  npm run docs:preview
  ```

## About
A documentation created by the academy for the academy
