---
id: python-io
title: File Input and Output (I/O) in Python
description: Learn how to read from and write to files using Python's built-in I/O functions.
sidebar_label: File I/O in Python
sidebar_position: 13
tags:
  [
    Python,
    List in Python,
    Introduction of python,
    Python Syntax,
    Variables,
    Operators,
    Type Casting,
    String,
    Tuple in Python
    Array in Python
    Functions in Python
    Recursion in Python
    Opps in Python
  ]
---

# File Input and Output (I/O) in Python

In Python, file I/O is used to read from or write to files. This is an essential part of any programming language when it comes to data processing, logging, or configuration.


## Opening Files

To work with files in Python, you use the built-in `open()` function.

```python
file = open("example.txt", "r")  # Open for reading
````

### Modes:

| Mode  | Description                                          |
| ----- | ---------------------------------------------------- |
| `'r'` | Read (default). Fails if the file doesn’t exist.     |
| `'w'` | Write. Creates a new file or truncates existing one. |
| `'a'` | Append. Adds content to the end of the file.         |
| `'b'` | Binary mode. Used with `'rb'`, `'wb'`, etc.          |
| `'x'` | Create. Fails if the file already exists.            |


## Reading from a File

### `read()` – Reads entire content

````python
with open("example.txt", "r") as file:
    content = file.read()
    print(content)
````

### `readline()` – Reads one line at a time

````python
with open("example.txt", "r") as file:
    line = file.readline()
    print(line)
````

### `readlines()` – Reads all lines into a list

````python
with open("example.txt", "r") as file:
    lines = file.readlines()
    print(lines)
````

## Writing to a File

### `write()` – Write string to file

````python
with open("output.txt", "w") as file:
    file.write("Hello, world!")
````

### `writelines()` – Write list of strings

````python
lines = ["Line 1\n", "Line 2\n"]
with open("output.txt", "w") as file:
    file.writelines(lines)
````


## Using `with` Statement (Best Practice)

The `with` block ensures the file is automatically closed after use:

````python
with open("data.txt", "r") as file:
    data = file.read()
````

This is the **recommended way** to handle files in Python.


## Error Handling in File I/O

Always handle file operations with care to avoid exceptions:

````python
try:
    with open("config.txt", "r") as file:
        config = file.read()
except FileNotFoundError:
    print("File not found.")
except IOError:
    print("Error while handling the file.")
````


## File Paths

You can also handle file paths using the `os` or `pathlib` module:

````python
from pathlib import Path

file_path = Path("docs") / "myfile.txt"
with open(file_path, "r") as file:
    print(file.read())
````


## Example: Reading & Writing

````python
# Write to a file
with open("sample.txt", "w") as file:
    file.write("This is a test.")

# Read the file
with open("sample.txt", "r") as file:
    print(file.read())
````


##  Summary

* Use `open()` to access files.
* Use `read()`, `readline()`, or `readlines()` to read.
* Use `write()` or `writelines()` to write.
* Always use `with` to handle files safely.
* Handle exceptions for robustness.