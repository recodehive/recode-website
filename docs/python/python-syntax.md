---
id: python-syntax
title: Python Syntax
sidebar_label: Python Syntax #displays in sidebar
sidebar_position: 2
tags:
  [
    Python,
    Introduction of python,
    Python Syntax,

  ]

---

# Python Syntax

Python is known for its clean and readable syntax. It emphasizes code readability and allows developers to write fewer lines of code compared to other programming languages.

### Basic Syntax Structure

Python uses indentation instead of curly braces `{}` to define blocks of code.

### Example:

```python
if 5 > 2:
    print("Five is greater than two!")
```

* **Indentation** is crucial in Python. Missing or incorrect indentation will raise an error.


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

## 📝 Quiz 1: Basics and Syntax

**Q1. What does Python use to define blocks of code?**
- A) Curly braces `{}`
- B) Parentheses `()`
- C) Indentation
- D) Semicolons `;`

<details>
<summary>Show Answer</summary>
**Answer: C) Indentation**

Python uses indentation (typically 4 spaces) to define code blocks, unlike many other languages that use curly braces.
</details>

**Q2. Which of the following is a valid way to create a multi-line comment in Python?**
- A) `// comment //`
- B) `/* comment */`
- C) `""" comment """`
- D) `<!-- comment -->`

<details>
<summary>Show Answer</summary>
**Answer: C) `""" comment """`**

Triple quotes (single or double) are used for multi-line comments in Python.
</details>

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

* `int`: Integer
* `float`: Floating point
* `str`: String
* `bool`: Boolean
* `list`: List of items
* `tuple`: Immutable list
* `dict`: Key-value pair
* `set`: Unique unordered collection

```python
num = 10                 # int
name = "Alice"           # str
items = [1, 2, 3]        # list
person = {"name": "Bob", "age": 25}  # dict
```

---

## 📝 Quiz 2: Variables and Data Types

**Q1. What will be the data type of `x` after this assignment: `x = 3.14`?**
- A) int
- B) float
- C) str
- D) bool

<details>
<summary>Show Answer</summary>
**Answer: B) float**

Numbers with decimal points are automatically assigned the `float` data type in Python.
</details>

**Q2. Which data type stores unique unordered collections?**
- A) list
- B) tuple
- C) dict
- D) set

<details>
<summary>Show Answer</summary>
**Answer: D) set**

Sets store unique elements in an unordered collection, automatically removing duplicates.
</details>

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

## 📝 Quiz 3: Conditionals and Loops

**Q1. What will be the output of this code?**
```python
age = 15
if age >= 18:
    print("Adult")
elif age > 12:
    print("Teenager")
else:
    print("Child")
```
- A) Adult
- B) Teenager
- C) Child
- D) Error

<details>
<summary>Show Answer</summary>
**Answer: B) Teenager**

Since age is 15, it doesn't satisfy the first condition (>= 18) but satisfies the second condition (> 12).
</details>

**Q2. How many times will this loop execute?**
```python
for i in range(5):
    print(i)
```
- A) 4 times
- B) 5 times
- C) 6 times
- D) Infinite times

<details>
<summary>Show Answer</summary>
**Answer: B) 5 times**

`range(5)` generates numbers from 0 to 4, resulting in 5 iterations.
</details>

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

## 📝 Quiz 4: Functions

**Q1. What keyword is used to define a function in Python?**
- A) function
- B) def
- C) func
- D) define

<details>
<summary>Show Answer</summary>
**Answer: B) def**

The `def` keyword is used to define functions in Python.
</details>

**Q2. What will be the value of `result` after executing this code?**
```python
def multiply(x, y):
    return x * y

result = multiply(3, 4)
```
- A) 7
- B) 12
- C) 34
- D) None

<details>
<summary>Show Answer</summary>
**Answer: B) 12**

The function multiplies 3 and 4, returning 12.
</details>

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

## 📝 Quiz 5: Operators

**Q1. What is the result of `10 // 3` in Python?**
- A) 3.33
- B) 3
- C) 4
- D) 3.0

<details>
<summary>Show Answer</summary>
**Answer: B) 3**

The `//` operator performs floor division, returning only the integer part of the division.
</details>

**Q2. Which operator is used for exponentiation in Python?**
- A) ^
- B) **
- C) ^^
- D) pow

<details>
<summary>Show Answer</summary>
**Answer: B) `**`**

The `**` operator is used for exponentiation (e.g., `2**3` equals 8).
</details>

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

Python syntax is simple, readable, and beginner-friendly. With its use of indentation and minimalistic style, it allows you to focus on solving problems rather than worrying about complex syntax rules.

---

## 📝 Final Quiz: Comprehensive Review

**Q1. What will happen if you mix tabs and spaces for indentation in Python?**
- A) Nothing, it works fine
- B) Python will automatically convert them
- C) It may cause IndentationError or inconsistent behavior
- D) Python will use the first type it encounters

<details>
<summary>Show Answer</summary>
**Answer: C) It may cause IndentationError or inconsistent behavior**

Python requires consistent indentation. Mixing tabs and spaces can lead to errors and is considered bad practice.
</details>

**Q2. Which of the following statements is TRUE about Python?**
- A) Python requires semicolons at the end of each statement
- B) Python is case-sensitive
- C) Python requires variable type declarations
- D) Python uses curly braces for code blocks

<details>
<summary>Show Answer</summary>
**Answer: B) Python is case-sensitive**

Python is case-sensitive (e.g., `variable` and `Variable` are different), doesn't require semicolons or type declarations, and uses indentation instead of curly braces.
</details>

**Q3. What is the correct file extension for Python files?**
- A) .python
- B) .pt
- C) .py
- D) .pyt

<details>
<summary>Show Answer</summary>
**Answer: C) .py**

Python files use the `.py` extension.
</details>

---

> 📌 **Note**: Make sure your Python files have the `.py` extension and you're using Python 3.x version for compatibility with modern features.