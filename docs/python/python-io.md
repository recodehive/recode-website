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
```

### Modes:

| Mode  | Description                                          |
| ----- | ---------------------------------------------------- |
| `'r'` | Read (default). Fails if the file doesn't exist.     |
| `'w'` | Write. Creates a new file or truncates existing one. |
| `'a'` | Append. Adds content to the end of the file.         |
| `'b'` | Binary mode. Used with `'rb'`, `'wb'`, etc.          |
| `'x'` | Create. Fails if the file already exists.            |

---

## 🎯 Quiz 1: File Opening Modes

**Question 1:** What happens when you open a file with `'w'` mode if the file already exists?
<details>
<summary>Show Answer</summary>

The file is **truncated** (all existing content is deleted) and a new empty file is created. If you want to preserve existing content, use `'a'` (append) mode instead.
</details>

**Question 2:** What is the default mode when you use `open("file.txt")` without specifying a mode?
<details>
<summary>Show Answer</summary>

**`'r'` (read mode)** is the default. This means if you don't specify a mode, the file will be opened for reading only.
</details>

**Question 3:** Which mode would you use to add new content to the end of an existing file without deleting its current content?
<details>
<summary>Show Answer</summary>

**`'a'` (append mode)**

Example:
```python
with open("log.txt", "a") as file:
    file.write("New log entry\n")
```
This adds content to the end without removing existing data.
</details>

---

## Reading from a File

### `read()` – Reads entire content

```python
with open("example.txt", "r") as file:
    content = file.read()
    print(content)
```

### `readline()` – Reads one line at a time

```python
with open("example.txt", "r") as file:
    line = file.readline()
    print(line)
```

### `readlines()` – Reads all lines into a list

```python
with open("example.txt", "r") as file:
    lines = file.readlines()
    print(lines)
```

---

## 🎯 Quiz 2: Reading Methods

**Question 1:** What's the difference between `read()` and `readlines()`?
<details>
<summary>Show Answer</summary>

- **`read()`**: Returns the entire file content as a **single string**
- **`readlines()`**: Returns a **list** where each element is a line from the file (including `\n` characters)

Example:
```python
# File content: "Hello\nWorld\n"

# Using read()
content = file.read()  # Returns: "Hello\nWorld\n"

# Using readlines()
lines = file.readlines()  # Returns: ["Hello\n", "World\n"]
```
</details>

**Question 2:** If a file has 5 lines and you call `readline()` three times, what happens?
<details>
<summary>Show Answer</summary>

You will read the **first three lines** of the file, one at a time. Each call to `readline()` moves the file pointer to the next line.

```python
with open("file.txt", "r") as file:
    line1 = file.readline()  # First line
    line2 = file.readline()  # Second line
    line3 = file.readline()  # Third line
    # Lines 4 and 5 remain unread
```
</details>

**Question 3:** What will be the output?
```python
with open("test.txt", "r") as file:
    lines = file.readlines()
    print(type(lines))
```
<details>
<summary>Show Answer</summary>

**Output:** `<class 'list'>`

**Explanation:** `readlines()` always returns a list containing all lines from the file.
</details>

---

## Writing to a File

### `write()` – Write string to file

```python
with open("output.txt", "w") as file:
    file.write("Hello, world!")
```

### `writelines()` – Write list of strings

```python
lines = ["Line 1\n", "Line 2\n"]
with open("output.txt", "w") as file:
    file.writelines(lines)
```


## Using `with` Statement (Best Practice)

The `with` block ensures the file is automatically closed after use:

```python
with open("data.txt", "r") as file:
    data = file.read()
```

This is the **recommended way** to handle files in Python.

---

## 🎯 Quiz 3: Writing Files & Best Practices

**Question 1:** What's the difference between `write()` and `writelines()`?
<details>
<summary>Show Answer</summary>

- **`write(string)`**: Writes a single string to the file
- **`writelines(list)`**: Writes a list of strings to the file

**Important:** `writelines()` does NOT add newline characters automatically!

```python
# write()
file.write("Hello\n")  # Adds newline

# writelines()
file.writelines(["Hello", "World"])  # Writes: "HelloWorld"
file.writelines(["Hello\n", "World\n"])  # Writes on separate lines
```
</details>

**Question 2:** Why is using the `with` statement recommended for file operations?
<details>
<summary>Show Answer</summary>

The `with` statement **automatically closes the file** when the block is exited, even if an error occurs. This prevents:
- Memory leaks
- File corruption
- Resource locking issues

**Without `with`:**
```python
file = open("data.txt", "r")
data = file.read()
file.close()  # Must remember to close!
```

**With `with` (Better):**
```python
with open("data.txt", "r") as file:
    data = file.read()
# File automatically closed here
```
</details>

**Question 3:** What will happen after this code executes?
```python
with open("test.txt", "w") as file:
    file.write("First line\n")
    
with open("test.txt", "w") as file:
    file.write("Second line\n")
```
<details>
<summary>Show Answer</summary>

**The file will only contain:** `"Second line\n"`

**Explanation:** Opening a file in `'w'` mode **truncates** (clears) the file. The first write adds "First line\n", but the second `open()` with `'w'` mode clears everything and writes "Second line\n".

To keep both lines, use `'a'` (append) mode for the second operation.
</details>

---

## Error Handling in File I/O

Always handle file operations with care to avoid exceptions:

```python
try:
    with open("config.txt", "r") as file:
        config = file.read()
except FileNotFoundError:
    print("File not found.")
except IOError:
    print("Error while handling the file.")
```


## File Paths

You can also handle file paths using the `os` or `pathlib` module:

```python
from pathlib import Path

file_path = Path("docs") / "myfile.txt"
with open(file_path, "r") as file:
    print(file.read())
```

---

## 🎯 Quiz 4: Error Handling & File Paths

**Question 1:** What exception is raised when you try to open a file that doesn't exist in read mode?
<details>
<summary>Show Answer</summary>

**`FileNotFoundError`**

Example:
```python
try:
    with open("nonexistent.txt", "r") as file:
        content = file.read()
except FileNotFoundError:
    print("The file doesn't exist!")
```
</details>

**Question 2:** What happens if you try to open a file in `'x'` mode and the file already exists?
<details>
<summary>Show Answer</summary>

A **`FileExistsError`** is raised. The `'x'` mode is used to create a new file and will fail if the file already exists, preventing accidental overwrites.

```python
try:
    with open("existing.txt", "x") as file:
        file.write("New content")
except FileExistsError:
    print("File already exists!")
```
</details>

**Question 3:** Which module provides a more modern, object-oriented approach to handling file paths?
<details>
<summary>Show Answer</summary>

**`pathlib`** module (specifically the `Path` class)

```python
from pathlib import Path

# Modern approach
file_path = Path("folder") / "subfolder" / "file.txt"

# Old approach
import os
file_path = os.path.join("folder", "subfolder", "file.txt")
```

The `pathlib` approach is more readable and cross-platform compatible.
</details>

---

## Example: Reading & Writing

```python
# Write to a file
with open("sample.txt", "w") as file:
    file.write("This is a test.")

# Read the file
with open("sample.txt", "r") as file:
    print(file.read())
```


## Summary

* Use `open()` to access files.
* Use `read()`, `readline()`, or `readlines()` to read.
* Use `write()` or `writelines()` to write.
* Always use `with` to handle files safely.
* Handle exceptions for robustness.

---

## 🎯 Final Quiz: Comprehensive File I/O Challenge

**Question 1:** Write code to read a file line by line and print only non-empty lines.
<details>
<summary>Show Answer</summary>

```python
with open("data.txt", "r") as file:
    for line in file:
        if line.strip():  # Check if line is not empty
            print(line.strip())
```

**Alternative using `readlines()`:**
```python
with open("data.txt", "r") as file:
    lines = file.readlines()
    for line in lines:
        if line.strip():
            print(line.strip())
```
</details>

**Question 2:** What's wrong with this code?
```python
file = open("log.txt", "a")
file.write("Error occurred\n")
file.write("System crashed\n")
```
<details>
<summary>Show Answer</summary>

**Problems:**
1. File is never closed (resource leak)
2. No error handling
3. Not using `with` statement

**Corrected version:**
```python
try:
    with open("log.txt", "a") as file:
        file.write("Error occurred\n")
        file.write("System crashed\n")
except IOError as e:
    print(f"Error writing to file: {e}")
```
</details>

**Question 3:** How would you copy the contents of one file to another?
<details>
<summary>Show Answer</summary>

```python
try:
    with open("source.txt", "r") as source:
        content = source.read()
    
    with open("destination.txt", "w") as dest:
        dest.write(content)
    
    print("File copied successfully!")
except FileNotFoundError:
    print("Source file not found!")
except IOError as e:
    print(f"Error during file operation: {e}")
```

**Alternative (line by line):**
```python
with open("source.txt", "r") as source:
    with open("destination.txt", "w") as dest:
        for line in source:
            dest.write(line)
```
</details>

**Question 4:** Create a function that counts the number of lines, words, and characters in a file.
<details>
<summary>Show Answer</summary>

```python
def count_file_stats(filename):
    """Count lines, words, and characters in a file."""
    try:
        with open(filename, "r") as file:
            lines = file.readlines()
            
            line_count = len(lines)
            word_count = sum(len(line.split()) for line in lines)
            char_count = sum(len(line) for line in lines)
            
            return {
                "lines": line_count,
                "words": word_count,
                "characters": char_count
            }
    except FileNotFoundError:
        print(f"File '{filename}' not found!")
        return None

# Usage
stats = count_file_stats("document.txt")
if stats:
    print(f"Lines: {stats['lines']}")
    print(f"Words: {stats['words']}")
    print(f"Characters: {stats['characters']}")
```
</details>

**Question 5:** What mode combination would you use to read and write to a binary file?
<details>
<summary>Show Answer</summary>

**`'rb+'` or `'wb+'`**

- **`'rb+'`**: Read and write binary (file must exist)
- **`'wb+'`**: Write and read binary (creates new file or truncates)
- **`'ab+'`**: Append and read binary

**Example - Working with binary files:**
```python
# Write binary data
with open("data.bin", "wb") as file:
    file.write(b'\x00\x01\x02\x03')

# Read binary data
with open("data.bin", "rb") as file:
    data = file.read()
    print(data)  # Output: b'\x00\x01\x02\x03'
```

Common use cases: images, audio files, encrypted data, etc.
</details>

---

🎉 **Congratulations!** You've mastered File I/O in Python. Practice with real files to reinforce these concepts!