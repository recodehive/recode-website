---
id: python-string
title: String in Python
sidebar_label: String in Python #displays in sidebar
sidebar_position: 7
tags:
  [
    Python,
    Introduction of python,
    Python Syntax,
    Variables,
    Operators,
    Type Casting,
    String
  ]

---

In Python, a **string** is a sequence of characters enclosed within **single (`'`)**, **double (`"`)**, or **triple quotes (`''' '''` or `""" """`)**.  
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

---

## 🎯 Quiz 1: String Basics and Creation

**Question 1:** What's the difference between single, double, and triple quotes?
<details>
<summary>Show Answer</summary>

**Single (`'`) and Double (`"`) quotes:**
- Functionally identical
- Use one when the other appears in the string

```python
str1 = 'Hello'
str2 = "Hello"
print(str1 == str2)  # True

# Use single quotes when string contains double quotes
sentence = 'He said "Hello"'

# Use double quotes when string contains single quotes
text = "It's a beautiful day"
```

**Triple quotes (`'''` or `"""`):**
- Allow multi-line strings
- Preserve line breaks and formatting
- Often used for docstrings

```python
multiline = """Line 1
Line 2
Line 3"""

# Function docstring
def greet():
    """
    This function greets the user.
    It takes no parameters.
    """
    pass
```
</details>

**Question 2:** Are strings mutable or immutable in Python?
<details>
<summary>Show Answer</summary>

**Strings are IMMUTABLE** - you cannot change individual characters.

```python
text = "Hello"
# text[0] = "J"  # TypeError: 'str' object does not support item assignment

# Instead, create a new string
text = "J" + text[1:]
print(text)  # Jello
```

**Implications:**
- String operations create new strings
- String concatenation in loops is inefficient
- Use list or join() for building strings

```python
# Inefficient - creates many intermediate strings
result = ""
for i in range(1000):
    result += str(i)  # Creates new string each time

# Efficient - build list then join
parts = []
for i in range(1000):
    parts.append(str(i))
result = "".join(parts)
```
</details>

**Question 3:** What will be the output?
```python
text = "Python"
print(type(text))
print(len(text))
```
<details>
<summary>Show Answer</summary>

**Output:**
```
<class 'str'>
6
```

**Explanation:**
- `type(text)` returns the data type - string class
- `len(text)` returns the number of characters - 6 letters

**Note:** Spaces and special characters also count:
```python
text = "Hello World!"
print(len(text))  # 12 (includes space and exclamation)
```
</details>

---

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

---

## 🎯 Quiz 2: Indexing and Slicing

**Question 1:** Explain positive and negative indexing:
```python
text = "Python"
```
<details>
<summary>Show Answer</summary>

**Positive indexing (left to right, starts at 0):**
```
P  y  t  h  o  n
0  1  2  3  4  5
```

**Negative indexing (right to left, starts at -1):**
```
P   y   t   h   o   n
-6  -5  -4  -3  -2  -1
```

**Examples:**
```python
text = "Python"
print(text[0])    # P (first character)
print(text[-1])   # n (last character)
print(text[2])    # t (third character)
print(text[-3])   # h (third from end)
```

**Use case:** Negative indexing is useful for accessing from the end without knowing the length.
</details>

**Question 2:** What will these slicing operations return?
```python
word = "Programming"
print(word[2:5])
print(word[:4])
print(word[6:])
print(word[::2])
print(word[::-1])
```
<details>
<summary>Show Answer</summary>

**Outputs:**
```python
print(word[2:5])   # ogr  (index 2, 3, 4)
print(word[:4])    # Prog (start to index 3)
print(word[6:])    # mming (index 6 to end)
print(word[::2])   # Pormig (every 2nd character)
print(word[::-1])  # gnimmargorP (reversed)
```

**Slicing syntax: `[start:stop:step]`**
- `start`: starting index (inclusive)
- `stop`: ending index (exclusive)
- `step`: increment (default 1)

**Common patterns:**
```python
text = "Hello"
text[:]      # Entire string (copy)
text[1:]     # Everything except first
text[:-1]    # Everything except last
text[::-1]   # Reverse the string
text[::3]    # Every 3rd character
```
</details>

**Question 3:** What happens when you slice beyond the string length?
```python
text = "Hi"
print(text[0:100])
print(text[5])
```
<details>
<summary>Show Answer</summary>

**Slicing is forgiving:**
```python
text = "Hi"
print(text[0:100])  # Hi (returns what exists)
```

**Indexing raises an error:**
```python
print(text[5])  # IndexError: string index out of range
```

**Explanation:**
- **Slicing** returns whatever is available (safe)
- **Indexing** expects exact position (strict)

This is why slicing is often safer for string manipulation.
</details>

---

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

---

## 🎯 Quiz 3: String Methods

**Question 1:** What's the difference between `strip()`, `lstrip()`, and `rstrip()`?
<details>
<summary>Show Answer</summary>

```python
text = "   Hello World   "

print(text.strip())   # "Hello World" (both ends)
print(text.lstrip())  # "Hello World   " (left side only)
print(text.rstrip())  # "   Hello World" (right side only)
```

**They also remove other characters:**
```python
text = "***Hello***"
print(text.strip("*"))   # "Hello"

url = "https://example.com/"
print(url.rstrip("/"))   # "https://example.com"
```

**Common use case:** Cleaning user input
```python
username = input("Enter username: ").strip()
```
</details>

**Question 2:** What will be the output?
```python
text = "banana"
print(text.count("a"))
print(text.count("na"))
print(text.find("na"))
print(text.find("x"))
```
<details>
<summary>Show Answer</summary>

**Outputs:**
```python
print(text.count("a"))    # 3 (a appears 3 times)
print(text.count("na"))   # 2 (na appears twice)
print(text.find("na"))    # 2 (first occurrence at index 2)
print(text.find("x"))     # -1 (not found)
```

**Key differences:**
- `count()` returns the number of occurrences
- `find()` returns the index of first occurrence (-1 if not found)
- `index()` is similar to `find()` but raises error if not found

```python
text = "hello"
print(text.find("x"))   # -1
# print(text.index("x"))  # ValueError: substring not found
```
</details>

**Question 3:** Are string methods destructive?
```python
text = "Hello"
result = text.upper()
```
<details>
<summary>Show Answer</summary>

**No! String methods return NEW strings** (strings are immutable).

```python
text = "Hello"
result = text.upper()

print(text)    # Hello (unchanged)
print(result)  # HELLO (new string)
```

**You must reassign to change the variable:**
```python
text = "Hello"
text = text.upper()
print(text)  # HELLO
```

**Method chaining works because each returns a new string:**
```python
text = "  hello world  "
result = text.strip().upper().replace("WORLD", "PYTHON")
print(result)  # HELLO PYTHON
```
</details>

---

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

---

## 🎯 Quiz 4: String Operations

**Question 1:** What are the performance implications of string concatenation in loops?
<details>
<summary>Show Answer</summary>

**Problem: String concatenation in loops is SLOW** (creates new string each time)

```python
# Inefficient - O(n²) time complexity
result = ""
for i in range(10000):
    result += str(i)  # Creates new string each iteration
```

**Better approaches:**

**Method 1: List + join() (Best)**
```python
parts = []
for i in range(10000):
    parts.append(str(i))
result = "".join(parts)  # O(n) time complexity
```

**Method 2: List comprehension + join()**
```python
result = "".join(str(i) for i in range(10000))
```

**Method 3: f-string for small concatenations**
```python
name = "Alice"
age = 25
result = f"{name} is {age} years old"
```

**Rule of thumb:** Use `join()` for multiple concatenations, `+` or f-strings for 2-3 strings.
</details>

**Question 2:** What will happen?
```python
print("Python" * 3)
print(3 * "Python")
print("Python" + 3)
```
<details>
<summary>Show Answer</summary>

**Outputs:**
```python
print("Python" * 3)   # PythonPythonPython
print(3 * "Python")   # PythonPythonPython (commutative)
print("Python" + 3)   # TypeError: can only concatenate str
```

**Explanation:**
- `*` works with string and integer (in any order)
- `+` only works with two strings

**Fix for the error:**
```python
print("Python" + str(3))  # Python3
print(f"Python{3}")       # Python3
```

**Practical uses:**
```python
# Create separator lines
print("=" * 50)

# Padding
print("Title".center(20, "-"))  # -------Title--------

# Repeat patterns
print("Ha" * 5)  # HaHaHaHaHa
```
</details>

**Question 3:** How do `in` and substring methods differ?
<details>
<summary>Show Answer</summary>

**`in` operator - Returns boolean (True/False)**
```python
text = "Python is awesome"
print("awesome" in text)      # True
print("java" in text)         # False
```

**`find()` method - Returns index position or -1**
```python
print(text.find("awesome"))   # 10 (index)
print(text.find("java"))      # -1 (not found)
```

**`count()` method - Returns number of occurrences**
```python
text = "banana"
print(text.count("a"))        # 3
```

**When to use each:**
- Use `in` when you only need yes/no
- Use `find()` when you need the position
- Use `count()` when you need frequency

**Example:**
```python
email = "user@example.com"

# Quick check
if "@" in email and "." in email:
    print("Valid format")

# Get position for parsing
at_position = email.find("@")
username = email[:at_position]
```
</details>

---

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

## 🎯 Quiz 5: String Formatting

**Question 1:** What are the advantages of f-strings over other formatting methods?
<details>
<summary>Show Answer</summary>

**f-strings are:**
1. **More readable** - variables directly in string
2. **Faster** - evaluated at runtime
3. **More concise** - less syntax
4. **Support expressions** - can include calculations

**Comparison:**
```python
name = "Alice"
age = 25

# f-string (best)
print(f"Name: {name}, Age: {age}")

# format()
print("Name: {}, Age: {}".format(name, age))

# % operator (old style)
print("Name: %s, Age: %d" % (name, age))
```

**f-string advantages:**
```python
# Expressions
print(f"Next year: {age + 1}")

# Formatting
pi = 3.14159
print(f"Pi: {pi:.2f}")  # Pi: 3.14

# Debugging (Python 3.8+)
x = 42
print(f"{x=}")  # x=42

# Alignment
print(f"{'Left':<10}{'Right':>10}{'Center':^10}")
```
</details>

**Question 2:** Format numbers and dates with f-strings:
<details>
<summary>Show Answer</summary>

**Number formatting:**
```python
# Decimal places
pi = 3.14159
print(f"{pi:.2f}")      # 3.14
print(f"{pi:.4f}")      # 3.1416

# Thousands separator
large_num = 1000000
print(f"{large_num:,}")  # 1,000,000

# Percentage
ratio = 0.75
print(f"{ratio:.1%}")    # 75.0%

# Scientific notation
big = 12345678
print(f"{big:.2e}")      # 1.23e+07

# Padding with zeros
num = 42
print(f"{num:05d}")      # 00042
```

**Date formatting:**
```python
from datetime import datetime

now = datetime.now()
print(f"{now:%Y-%m-%d}")           # 2024-03-15
print(f"{now:%B %d, %Y}")          # March 15, 2024
print(f"{now:%I:%M %p}")           # 03:30 PM
```

**Alignment and width:**
```python
items = ["Apple", "Banana", "Cherry"]
prices = [1.50, 0.75, 2.00]

for item, price in zip(items, prices):
    print(f"{item:<10} ${price:>6.2f}")
# Apple      $  1.50
# Banana     $  0.75
# Cherry     $  2.00
```
</details>

**Question 3:** When should you NOT use f-strings?
<details>
<summary>Show Answer</summary>

**Avoid f-strings when:**

**1. Template strings reused multiple times:**
```python
# Don't do this
def greet_user(name):
    return f"Hello, {name}!"

# Better - reusable template
template = "Hello, {}!"
print(template.format("Alice"))
print(template.format("Bob"))
```

**2. User-provided format strings (security risk):**
```python
# Dangerous - allows code execution
user_input = input("Format: ")
# eval(f"f'{user_input}'")  # NEVER DO THIS

# Safe alternative
template = "Value: {}"
print(template.format(user_input))
```

**3. Logging with lazy evaluation:**
```python
import logging

# f-string evaluates immediately (inefficient)
logging.debug(f"Complex calculation: {expensive_function()}")

# Better - only evaluates if needed
logging.debug("Complex calculation: %s", expensive_function())
```

**4. Python version < 3.6:**
```python
# Use format() for compatibility
"Name: {}, Age: {}".format(name, age)
```
</details>

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

---

## 🎯 Quiz 6: Escape Sequences and Special Strings

**Question 1:** How do you include quotes within strings?
<details>
<summary>Show Answer</summary>

**Method 1: Escape characters**
```python
text1 = "He said \"Hello\""
text2 = 'It\'s a beautiful day'
print(text1)  # He said "Hello"
print(text2)  # It's a beautiful day
```

**Method 2: Use opposite quote type**
```python
text1 = 'He said "Hello"'
text2 = "It's a beautiful day"
```

**Method 3: Triple quotes**
```python
text = '''He said "Hello" and I replied "It's nice!"'''
```

**Common mistake:**
```python
# Error - unescaped quote
# text = "He said "Hello""  # SyntaxError

# Fixed
text = "He said \"Hello\""
```
</details>

**Question 2:** What's the difference between raw strings and regular strings?
<details>
<summary>Show Answer</summary>

**Regular strings process escape sequences:**
```python
path = "C:\new\test"
print(path)  # C:
             # ew	est  (Unexpected!)
```

**Raw strings (prefix with `r`) treat backslashes literally:**
```python
path = r"C:\new\test"
print(path)  # C:\new\test (Correct!)
```

**Use cases:**

**1. File paths (Windows)**
```python
file_path = r"C:\Users\Documents\file.txt"
```

**2. Regular expressions**
```python
import re
pattern = r"\d{3}-\d{3}-\d{4}"  # Phone pattern
```

**3. LaTeX formulas**
```python
formula = r"\frac{a}{b} = c"
```

**Note:** Raw strings still can't end with a single backslash:
```python
# path = r"C:\folder\"  # SyntaxError
path = r"C:\folder" + "\\"  # Workaround
```
</details>

---

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

---

## 🎯 Final Quiz: Comprehensive String Challenge

**Question 1:** Write a function to check if a string is a palindrome (case-insensitive):
<details>
<summary>Show Answer</summary>

```python
def is_palindrome(text):
    """Check if string is palindrome (case-insensitive)."""
    # Remove spaces and convert to lowercase
    cleaned = text.replace(" ", "").lower()
    return cleaned == cleaned[::-1]

# Tests
print(is_palindrome("radar"))           # True
print(is_palindrome("Racecar"))         # True
print(is_palindrome("A man a plan a canal Panama"))  # True
print(is_palindrome("hello"))           # False

# Alternative - more robust (remove all non-alphanumeric)
import re

def is_palindrome_robust(text):
    cleaned = re.sub(r'[^a-zA-Z0-9]', '', text).lower()
    return cleaned == cleaned[::-1]

print(is_palindrome_robust("A man, a plan, a canal: Panama"))  # True
```
</details>

**Question 2:** Parse and validate an email address:
<details>
<summary>Show Answer</summary>

```python
def parse_email(email):
    """Parse and validate email address."""
    # Basic validation
    if "@" not in email or email.count("@") != 1:
        return None
    
    # Split into parts
    username, domain = email.split("@")
    
    # Validate parts
    if not username or not domain:
        return None
    
    if "." not in domain:
        return None
    
    # Extract domain parts
    domain_parts = domain.split(".")
    domain_name = domain_parts[0]
    extension = ".".join(domain_parts[1:])
    
    return {
        "username": username,
        "domain": domain_name,
        "extension": extension,
        "full": email
    }

# Tests
print(parse_email("user@example.com"))
# {'username': 'user', 'domain': 'example', 'extension': 'com', 'full': 'user@example.com'}

print(parse_email("invalid.email"))  # None
print(parse_email("no@domain"))      # None
```
</details>

**Question 3:** Implement a simple text censorship function:
<details>
<summary>Show Answer</summary>

```python
def censor_text(text, bad_words):
    """Replace bad words with asterisks."""
    result = text
    for word in bad_words:
        # Case-insensitive replacement
        replacement = "*" * len(word)
        # Use regex for whole words only
        import re
        pattern = re.compile(re.escape(word), re.IGNORECASE)
        result = pattern.sub(replacement, result)
    return result

# Test
text = "This is a bad word and another BAD one"
bad_words = ["bad"]
print(censor_text(text, bad_words))
# This is a *** word and another *** one

# Alternative without regex - simpler but less precise
def censor_simple(text, bad_words):
    words = text.split()
    result = []
    for word in words:
        if word.lower() in [w.lower() for w in bad_words]:
            result.append("*" * len(word))
        else:
            result.append(word)
    return " ".join(result)
```
</details>

**Question 4:** Create a function to title-case a string properly:
<details>
<summary>Show Answer</summary>

```python
def smart_title_case(text):
    """
    Title case with proper handling of small words.
    Small words like 'a', 'an', 'the', 'and', 'or' stay lowercase.
    """
    small_words = {'a', 'an', 'the', 'and', 'or', 'but', 'for', 'at', 'by', 'to'}
    
    words = text.lower().split()
    result = []
    
    for i, word in enumerate(words):
        # Always capitalize first and last word
        if i == 0 or i == len(words) - 1:
            result.append(word.capitalize())
        # Keep small words lowercase
        elif word in small_words:
            result.append(word)
        # Capitalize other words
        else:
            result.append(word.capitalize())
    
    return " ".join(result)

# Tests
print(smart_title_case("the lord of the rings"))
# The Lord of the Rings

print(smart_title_case("a tale of two cities"))
# A Tale of Two Cities

# Compare with built-in
text = "the lord of the rings"
print(text.title())              # The Lord Of The Rings (wrong)
print(smart_title_case(text))    # The Lord of the Rings (correct)
```
</details>

**Question 5:** Build a simple template engine:
<details>
<summary>Show Answer</summary>

```python
def simple_template(template, **kwargs):
    """
    Simple template engine using {{variable}} syntax.
    """
    result = template
    for key, value in kwargs.items():
        placeholder = "{{" + key + "}}"
        result = result.replace(placeholder, str(value))
    return result

# Usage
email_template = """
Hello {{name}},

Your order #{{order_id}} has been shipped!
Total: ${{total}}

Thank you for shopping with us.
"""

message = simple_template(
    email_template,
    name="Alice",
    order_id=12345,
    total=99.99
)
print(message)

# More advanced with format()
def template_format(template, **kwargs):
    """Using Python's built-in format for more features."""
    return template.format(**kwargs)

invoice = """
Invoice #{invoice_num}
Customer: {customer}
Amount: ${amount:.2f}
Date: {date}
"""

print(template_format(
    invoice,
    invoice_num=101,
    customer="Bob Smith",
    amount=150.5,
    date="2024-03-15"
))
```
</details>

---

## Summary

* Strings are **immutable** sequences of characters.
* Support **indexing**, **slicing**, **concatenation**, and **repetition**.
* Useful **methods** help in text processing.
* Use **escape sequences** for formatting.
* Use **f-strings** or `format()` for clean formatting.

---

🎉 **Congratulations!** You've mastered Strings in Python. Practice with text processing, parsing, and formatting to strengthen your string manipulation skills!