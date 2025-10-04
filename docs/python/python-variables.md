---
id: python-variables
title: Python Variables
sidebar_label: Python Variables #displays in sidebar
sidebar_position: 3
tags:
  [
    Python,
    Introduction of python,
    Python Syntax,
    Python Variables,

  ]

---

# Python Variables

In Python, variables are used to store data that can be referenced and manipulated during program execution. A variable is essentially a name that is assigned to a value. Unlike many other programming languages, Python variables do not require explicit declaration of type. The type of the variable is inferred based on the value assigned.

Variables act as placeholders for data. They allow us to store and reuse values in our program.


### 1. What is a Variable?

A variable is like a container for storing data values. You don't need to declare its type explicitly — Python handles it dynamically.

```python
x = 5
y = "Hello"
```

Here:

* `x` is of type `int`
* `y` is of type `str`



### 2. How to Declare and Assign Variables

You simply write a variable name, use the `=` sign, and assign a value.

```python
a = 10
name = "GeeksForGeeks"
price = 99.99
is_active = True
```

Python automatically understands the type of variable.


### 3. Multiple Assignments in One Line

Python allows assigning values to multiple variables in a single line.

```python
x, y, z = 1, 2, 3
```

You can also assign the **same value to multiple variables**:

```python
a = b = c = 100
```

---

## 📝 Quiz 1: Variable Basics

**Q1. What happens when you assign a value to a variable in Python?**
- A) You must declare the variable type first
- B) Python automatically infers the variable type
- C) The variable must be initialized with a default value
- D) You need to use a special keyword like `var`

<details>
<summary>Show Answer</summary>
**Answer: B) Python automatically infers the variable type**

Python uses dynamic typing, meaning the type is determined automatically based on the value assigned.
</details>

**Q2. What will be the result of this assignment: `a = b = c = 50`?**
- A) Only `a` gets the value 50
- B) Error: multiple assignment not allowed
- C) All three variables (`a`, `b`, `c`) get the value 50
- D) Only the last variable `c` gets the value 50

<details>
<summary>Show Answer</summary>
**Answer: C) All three variables (`a`, `b`, `c`) get the value 50**

Python allows chained assignment, where the same value is assigned to multiple variables.
</details>

---

### 4. Variable Naming Rules

* Must start with a letter (a–z, A–Z) or an underscore (\_)
* Can contain letters, digits, and underscores
* Are case-sensitive (`name` and `Name` are different)
* Cannot use reserved keywords like `if`, `class`, `def`, etc.

```python
# Valid
my_var = 1
_var = 2
var3 = 3

# Invalid
3var = 10       # starts with digit
my-var = 20     # hyphen not allowed
def = 30        # 'def' is a keyword
```

---

## 📝 Quiz 2: Naming Rules

**Q1. Which of the following is a valid variable name in Python?**
- A) `2fast`
- B) `my-variable`
- C) `_private_var`
- D) `class`

<details>
<summary>Show Answer</summary>
**Answer: C) `_private_var`**

Variable names can start with an underscore. Option A starts with a digit, B contains a hyphen (not allowed), and D is a reserved keyword.
</details>

**Q2. Are `name` and `Name` the same variable in Python?**
- A) Yes, Python is case-insensitive
- B) No, Python is case-sensitive
- C) They are the same only for strings
- D) It depends on the Python version

<details>
<summary>Show Answer</summary>
**Answer: B) No, Python is case-sensitive**

Variable names in Python are case-sensitive, so `name` and `Name` are treated as different variables.
</details>

---

### 5. Standard Data Types in Python

Python variables can hold different types of data:


  <img src="./assets/data-type.png" alt="data-type table" />

### 6. Type Checking with `type()`

```python
x = 10
print(type(x))   # <class 'int'>
```



### 7. Changing Variable Type Dynamically

Python allows dynamic typing:

```python
x = 5
print(type(x))  # <class 'int'>

x = "Hello"
print(type(x))  # <class 'str'>
```

---

## 📝 Quiz 3: Data Types and Dynamic Typing

**Q1. What will be the output of `type(x)` after executing `x = 5` and then `x = "Hello"`?**
- A) `<class 'int'>`
- B) `<class 'str'>`
- C) Error: cannot change variable type
- D) `<class 'mixed'>`

<details>
<summary>Show Answer</summary>
**Answer: B) `<class 'str'>`**

Python allows dynamic typing, so the variable type changes to string after the second assignment.
</details>

**Q2. Which function is used to check the data type of a variable?**
- A) `typeof()`
- B) `datatype()`
- C) `type()`
- D) `check_type()`

<details>
<summary>Show Answer</summary>
**Answer: C) `type()`**

The built-in `type()` function returns the data type of a variable in Python.
</details>

---

### 8. Deleting a Variable with `del`

You can remove a variable from memory using `del`.

```python
x = 100
del x

print(x)  # Raises NameError
```


### 9. Scope of Variables

There are **two types of variable scope**:

### 10. Global Variable

Declared outside functions, accessible anywhere.

```python
x = "global"

def show():
    print(x)

show()  # Output: global
```

### 11. Local Variable

Declared inside functions and accessible only inside them.

```python
def greet():
    msg = "Hello"
    print(msg)

greet()
print(msg)  # Error: NameError
```

---

## 📝 Quiz 4: Variable Scope

**Q1. What happens when you try to access a local variable outside its function?**
- A) It returns `None`
- B) It raises a NameError
- C) It returns the last assigned value
- D) It creates a new global variable

<details>
<summary>Show Answer</summary>
**Answer: B) It raises a NameError**

Local variables are only accessible within the function where they are defined. Accessing them outside raises a NameError.
</details>

**Q2. Where is a global variable accessible?**
- A) Only inside the function where it's used
- B) Only in the same file
- C) Anywhere in the program
- D) Only before function definitions

<details>
<summary>Show Answer</summary>
**Answer: C) Anywhere in the program**

Global variables are declared outside functions and can be accessed from anywhere in the program.
</details>

---

### 🟢 The `global` Keyword

Use `global` to modify global variables inside a function.

```python
x = 10

def update():
    global x
    x = 20

update()
print(x)  # Output: 20
```

---

## 📝 Quiz 5: The global Keyword

**Q1. What is the purpose of the `global` keyword?**
- A) To create a new global variable
- B) To modify a global variable inside a function
- C) To delete a global variable
- D) To check if a variable is global

<details>
<summary>Show Answer</summary>
**Answer: B) To modify a global variable inside a function**

The `global` keyword allows you to modify global variables from within a function scope.
</details>

**Q2. What will be the output after running this code?**
```python
x = 5
def change():
    global x
    x = 10
change()
print(x)
```
- A) 5
- B) 10
- C) Error
- D) None

<details>
<summary>Show Answer</summary>
**Answer: B) 10**

The `global` keyword allows the function to modify the global variable `x`, changing it from 5 to 10.
</details>

---

### 12. Memory Management in Python

* Python variables are **names** bound to **objects in memory**.
* Use `id()` to get the memory address (or reference ID) of a variable.

```python
x = 5
print(id(x))
```

If two variables have the same immutable value, they may share the same memory.

```python
a = 100
b = 100
print(id(a) == id(b))  # True
```


### 🟢 Example Program

```python
# Python Variable Example

name = "Dhruba"
age = 22
price = 49.99
is_valid = True
items = ["pen", "notebook"]

print("Name:", name)
print("Age:", age)
print("Price:", price)
print("Valid:", is_valid)
print("Items:", items)
```

**Output:**

```
Name: Dhruba
Age: 22
Price: 49.99
Valid: True
Items: ['pen', 'notebook']
```

---

## 📝 Final Quiz: Comprehensive Review

**Q1. What does the `del` keyword do?**
- A) Deletes the value but keeps the variable
- B) Removes the variable from memory
- C) Sets the variable to None
- D) Deletes only the variable type

<details>
<summary>Show Answer</summary>
**Answer: B) Removes the variable from memory**

The `del` keyword completely removes the variable from memory, making it inaccessible.
</details>

**Q2. What does the `id()` function return?**
- A) The variable name
- B) The variable type
- C) The memory address (reference ID) of the object
- D) The value of the variable

<details>
<summary>Show Answer</summary>
**Answer: C) The memory address (reference ID) of the object**

The `id()` function returns the unique identifier (memory address) of an object in Python.
</details>

**Q3. Will `a` and `b` have the same memory address after this code?**
```python
a = 100
b = 100
```
- A) No, they always have different addresses
- B) Yes, because they have the same immutable value
- C) Only if they are strings
- D) It depends on the Python version

<details>
<summary>Show Answer</summary>
**Answer: B) Yes, because they have the same immutable value**

Python optimizes memory by reusing the same object for immutable values like small integers, so `a` and `b` may share the same memory address.
</details>

**Q4. Which statement about Python variables is FALSE?**
- A) Variables can change type dynamically
- B) Variable names are case-sensitive
- C) You must declare variable types before use
- D) Multiple variables can be assigned in one line

<details>
<summary>Show Answer</summary>
**Answer: C) You must declare variable types before use**

Python uses dynamic typing, so you don't need to declare variable types - they are inferred automatically.
</details>

---

## Summary

* Python variables store different types of data without explicit declaration.
* Variables are case-sensitive and follow naming rules.
* Scope determines where a variable is accessible.
* `global` and `del` are important keywords for variable handling.
* Python handles memory management internally but allows inspection via `id()`.


### Highlights

* Covers both global and local variables
* Explains `del`, `global`, and `id()` functions
* Includes formatted tables and output blocks
* Beginner-friendly explanation with examples