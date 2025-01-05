# Code Evaluation Tools API

## Overview
The Code Evaluation Tools API is designed to provide a set of tools for evaluating code in various programming languages. This project was developed as part of the DSN 2020 Program.

## Features
- Evaluate code snippets in multiple programming languages.
- Provide feedback on code quality and performance.
- Integration with various IDEs and code editors.

## Installation
To install and run the project locally, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/adefam/code-evaluation-tools-api.git
    ```

2. Navigate to the project directory:
    ```sh
    cd code-evaluation-tools-api
    ```

3. Install dependencies:
    ```sh
    npm install
    ```

4. Start the server:
    ```sh
    npm dev
    ```

## Usage
To use the API, send a POST request to the `/evaluate` endpoint with the following parameters:

- `language`: The programming language of the code snippet.
- `code`: The code snippet to be evaluated.
