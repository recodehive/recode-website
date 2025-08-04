---
id: python-string
title: String in Python
sidebar_label: String in Python #displays in sidebar
sidebar_position: 7
tags: [Python, Introduction of python, Python Syntax, Variables, Operators, Type Casting, String]
---

In Python, a **string** is a sequence of characters enclosed within **single (`'`)**, **double
(`"`)**, or **triple quotes (`''' '''` or `""" """`)**.  
It is used to store and manipulate **textual data**.

```python
str1 = 'Hello'
str2 = "World"
str3 = '''This is a multi-line string.'''
```

## Creating Strings

Strings can be created in several ways:

```python
name = "Dhruba"
message = 'Welcome to Python'
multiline = """This
is a
multiline string."""
```

## String Indexing and Slicing

**Indexing**: Access characters by position (starting at index 0).

```python
text = "Python"
print(text[0])   # P
print(text[-1])  # n
```

**Slicing**: Extract a part of the string.

```python
print(text[0:3])   # Pyt
print(text[::2])   # Pto
print(text[1:-1])  # ytho
```

## String Methods

| Method            | Description                          |
| ----------------- | ------------------------------------ |
| `upper()`         | Converts all characters to uppercase |
| `lower()`         | Converts all characters to lowercase |
| `strip()`         | Removes spaces from both ends        |
| `replace(a, b)`   | Replaces `a` with `b`                |
| `startswith(val)` | Checks if string starts with `val`   |
| `endswith(val)`   | Checks if string ends with `val`     |
| `find(val)`       | Finds the first index of `val`       |
| `count(val)`      | Counts occurrences of `val`          |

```python
msg = " Hello Python "
print(msg.upper())                 # HELLO PYTHON
print(msg.strip())                 # Hello Python
print(msg.replace("Python", "JS")) # Hello JS
```

## String Concatenation and Repetition

**Concatenation** with `+`:

```python
first = "Hello"
second = "World"
print(first + " " + second)  # Hello World
```

**Repetition** with `*`:

```python
print("Hi! " * 3)  # Hi! Hi! Hi!
```

## Using `in` and `not in` Operators

Check for substring presence:

```python
text = "Python is fun"
print("fun" in text)      # True
print("Java" not in text) # True
```

## String Formatting

### f-string (Python 3.6+)

```python
name = "Dhruba"
age = 22
print(f"My name is {name} and I am {age} years old.")
```

### format() method

```python
print("My name is {} and I am {} years old.".format(name, age))
```

### % operator

```python
print("My name is %s and I am %d years old." % (name, age))
```

---

## Escape Sequences

Escape characters add special formatting in strings:

| Escape | Meaning      |
| ------ | ------------ |
| `\n`   | New line     |
| `\t`   | Tab space    |
| `\\`   | Backslash    |
| `\'`   | Single quote |
| `\"`   | Double quote |

```python
print("Hello\nWorld")     # Line break
print("Name:\tDhruba")    # Tab
```

## Multiline Strings

Triple quotes allow multi-line text:

```python
message = """This is line 1
This is line 2
This is line 3"""
print(message)
```

## Use Cases and Examples

### Greet user

```python
name = input("Enter your name: ")
print(f"Welcome, {name}!")
```

### Count letters

```python
text = "banana"
print(text.count("a"))  # 3
```

### Read file and process

```python
with open("file.txt") as f:
    data = f.read()
    print(data.lower())
```

### Validate email domain

```python
email = "user@example.com"
if email.endswith("@example.com"):
    print("Valid domain")
```

## Summary

- Strings are **immutable** sequences of characters.
- Support **indexing**, **slicing**, **concatenation**, and **repetition**.
- Useful **methods** help in text processing.
- Use **escape sequences** for formatting.
- Use **f-strings** or `format()` for clean formatting.
