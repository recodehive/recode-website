---
id: python-syntax
title: Python Syntax
sidebar_label: Python Syntax #displays in sidebar
sidebar_position: 2
tags: [Python, Introduction of python, Python Syntax]
---

# Python Syntax

Python is known for its clean and readable syntax. It emphasizes code readability and allows
developers to write fewer lines of code compared to other programming languages.

### Basic Syntax Structure

Python uses indentation instead of curly braces `{}` to define blocks of code.

### Example:

```python
if 5 > 2:
    print("Five is greater than two!")
```

- **Indentation** is crucial in Python. Missing or incorrect indentation will raise an error.

### Comments

### Single-line comment:

```python
# This is a comment
print("Hello, World!")
```

### Multi-line comment (using triple quotes):

```python
"""
This is a
multi-line comment
"""
print("Hello again!")
```

---

### Variables

Python does not require you to declare the type of a variable.

```python
x = 10         # integer
y = "Hello"    # string
z = 3.14       # float
```

### Multiple assignment:

```python
a, b, c = 1, 2, 3
```

---

### Data Types

Some common data types in Python:

- `int`: Integer
- `float`: Floating point
- `str`: String
- `bool`: Boolean
- `list`: List of items
- `tuple`: Immutable list
- `dict`: Key-value pair
- `set`: Unique unordered collection

```python
num = 10                 # int
name = "Alice"           # str
items = [1, 2, 3]        # list
person = {"name": "Bob", "age": 25}  # dict
```

---

### Conditionals

```python
age = 18

if age >= 18:
    print("Adult")
elif age > 12:
    print("Teenager")
else:
    print("Child")
```

---

### Loops

### `for` loop:

```python
for i in range(5):
    print(i)
```

### `while` loop:

```python
count = 0
while count < 5:
    print(count)
    count += 1
```

---

### Functions

Functions are defined using the `def` keyword.

```python
def greet(name):
    print("Hello, " + name)

greet("Alice")
```

### Return statement:

```python
def add(a, b):
    return a + b

result = add(2, 3)
print(result)  # Output: 5
```

---

### Modules and Imports

You can import built-in or custom modules.

```python
import math

print(math.sqrt(16))  # Output: 4.0
```

---

### Operators

### Arithmetic Operators:

```python
+  -  *  /  //  %  **
```

### Comparison Operators:

```python
==  !=  >  <  >=  <=
```

### Logical Operators:

```python
and  or  not
```

---

### Indentation Rules

Python uses **4 spaces** (by convention) for indentation. Do not mix tabs and spaces.

Incorrect:

```python
if True:
print("Hello")  # IndentationError
```

Correct:

```python
if True:
    print("Hello")
```

---

## Conclusion

Python syntax is simple, readable, and beginner-friendly. With its use of indentation and
minimalistic style, it allows you to focus on solving problems rather than worrying about complex
syntax rules.

---

> 📌 **Note**: Make sure your Python files have the `.py` extension and you're using Python 3.x
> version for compatibility with modern features.
