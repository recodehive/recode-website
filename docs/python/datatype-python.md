---
id: datatype-python
title: Python Data Types
sidebar_label: Python Data Types #displays in sidebar
sidebar_position: 4
tags:
  [
    python,
    introduction of python,
    Data Type,

  ]
description: Learn all standard data types in Python with examples and explanations.

---


# Python Data Types

In Python, every value has a **data type**. Data types define the nature of a value, and Python provides a wide variety of built-in data types to handle different kinds of data. Understanding these is crucial for effective programming.

---

## Data Types in Python

| **Category**      | **Data Type**                          |
|------------------|----------------------------------------|
| Text Type         | `str`                                  |
| Numeric Types     | `int`, `float`, `complex`              |
| Sequence Types    | `list`, `tuple`, `range`               |
| Mapping Type      | `dict`                                 |
| Set Types         | `set`, `frozenset`                     |
| Boolean Type      | `bool`                                 |
| Binary Types      | `bytes`, `bytearray`, `memoryview`     |
| None Type         | `NoneType`                             |

---

##  Text Type: `str`

A sequence of Unicode characters.

```python
name = "Dhruba"
```

You can perform operations like:

* Slicing
* Concatenation
* Length check with `len()`

---

## Numeric Types

### `int`

Whole numbers:

```python
age = 25
```

### `float`

Decimal numbers:

```python
pi = 3.14
```

### `complex`

Numbers with real and imaginary parts:

```python
z = 2 + 3j
```

---

### 🧠 Quiz 1: Text and Numeric Types

**Question 1:** What data type is the value `"123"`?

<details>
<summary>Click to reveal answer</summary>

**Answer:** `str` (string)

**Explanation:** Even though it contains digits, the quotes make it a string, not an integer. You can verify with `type("123")`.
</details>

**Question 2:** What will `type(3.0)` return?

<details>
<summary>Click to reveal answer</summary>

**Answer:** `<class 'float'>`

**Explanation:** Even though 3.0 equals 3, the decimal point makes it a float, not an int.
</details>

**Question 3:** Which of the following is a valid complex number in Python?
- A) `5 + 3i`
- B) `5 + 3j`
- C) `complex(5, 3)`
- D) Both B and C

<details>
<summary>Click to reveal answer</summary>

**Answer:** D) Both B and C

**Explanation:** Python uses `j` (not `i`) for the imaginary part. You can create complex numbers using either `5 + 3j` or `complex(5, 3)`.
</details>

---

## Sequence Types

### `list`

Mutable, ordered sequence:

```python
fruits = ["apple", "banana", "cherry"]
```

### `tuple`

Immutable, ordered sequence:

```python
dimensions = (1024, 768)
```

### `range`

Represents a sequence of numbers:

```python
nums = range(5)
```

---

### 🧠 Quiz 2: Sequence Types

**Question 1:** What's the main difference between a list and a tuple?

<details>
<summary>Click to reveal answer</summary>

**Answer:** Lists are mutable (can be changed), tuples are immutable (cannot be changed)

**Explanation:** After creation, you can modify a list (`fruits[0] = "orange"`), but you cannot modify a tuple. Attempting to change a tuple will raise a `TypeError`.
</details>

**Question 2:** What will be the output of `list(range(3))`?

<details>
<summary>Click to reveal answer</summary>

**Answer:** `[0, 1, 2]`

**Explanation:** `range(3)` generates numbers from 0 up to (but not including) 3. Converting it to a list gives `[0, 1, 2]`.
</details>

**Question 3:** Which operation is valid?
```python
my_tuple = (1, 2, 3)
```
- A) `my_tuple[0] = 5`
- B) `my_tuple.append(4)`
- C) `len(my_tuple)`
- D) `my_tuple.sort()`

<details>
<summary>Click to reveal answer</summary>

**Answer:** C) `len(my_tuple)`

**Explanation:** Tuples are immutable, so you cannot modify them (options A, B, D would raise errors). However, you can check their length with `len()`, which returns 3.
</details>

---

## Mapping Type: `dict`

Unordered collection of key-value pairs:

```python
person = {
  "name": "Alice",
  "age": 30
}
```

---

## Set Types

### `set`

Unordered, mutable, no duplicates:

```python
unique_ids = {1, 2, 3}
```

### `frozenset`

Immutable version of a set:

```python
readonly_ids = frozenset([1, 2, 3])
```

---

### 🧠 Quiz 3: Mapping and Set Types

**Question 1:** What happens if you try to add duplicate values to a set?
```python
my_set = {1, 2, 3, 2, 1}
```

<details>
<summary>Click to reveal answer</summary>

**Answer:** Duplicates are automatically removed; `my_set` will be `{1, 2, 3}`

**Explanation:** Sets only store unique values. When you create a set with duplicates, Python automatically keeps only one instance of each value.
</details>

**Question 2:** How do you access the value associated with key `"name"` in this dictionary?
```python
person = {"name": "Alice", "age": 30}
```

<details>
<summary>Click to reveal answer</summary>

**Answer:** `person["name"]` or `person.get("name")`

**Explanation:** You can access dictionary values using square brackets with the key, or use the `.get()` method. Both return `"Alice"`.
</details>

**Question 3:** What's the main difference between `set` and `frozenset`?

<details>
<summary>Click to reveal answer</summary>

**Answer:** `set` is mutable (can be modified), `frozenset` is immutable (cannot be changed)

**Explanation:** You can add or remove elements from a set using `.add()` or `.remove()`, but frozenset doesn't allow any modifications after creation. Frozensets can also be used as dictionary keys.
</details>

---

## Boolean Type: `bool`

Only `True` or `False`:

```python
is_active = True
```

---

## Binary Types

### `bytes`

Immutable byte sequence:

```python
b = b"Hello"
```

### `bytearray`

Mutable version:

```python
ba = bytearray([65, 66, 67])
```

### `memoryview`

Provides memory-efficient access:

```python
mv = memoryview(bytes([1, 2, 3]))
```

---

## None Type

Represents no value:

```python
response = None
```

---

### 🧠 Quiz 4: Boolean, Binary, and None Types

**Question 1:** What will `bool(0)` return?

<details>
<summary>Click to reveal answer</summary>

**Answer:** `False`

**Explanation:** In Python, the number 0, empty strings, empty lists, and `None` are considered "falsy" and convert to `False`. All other numbers convert to `True`.
</details>

**Question 2:** What is the output of `bool([])` (empty list)?

<details>
<summary>Click to reveal answer</summary>

**Answer:** `False`

**Explanation:** Empty collections (lists, tuples, dictionaries, sets) are falsy in Python and evaluate to `False` when converted to boolean.
</details>

**Question 3:** What does `None` represent in Python?

<details>
<summary>Click to reveal answer</summary>

**Answer:** The absence of a value or null value

**Explanation:** `None` is Python's way of representing "nothing" or "no value". It's commonly used to initialize variables or indicate that a function doesn't return anything explicitly.
</details>

---

## Type Checking and Conversion

### Check type

```python
type(3.14)  # Output: <class 'float'>
```

### Type Conversion

```python
int("5")     # Output: 5
str(10)      # Output: "10"
list("abc")  # Output: ['a', 'b', 'c']
```

---

### 🧠 Quiz 5: Type Checking and Conversion

**Question 1:** What will `int("3.14")` produce?

<details>
<summary>Click to reveal answer</summary>

**Answer:** It will raise a `ValueError`

**Explanation:** `int()` cannot directly convert a string containing a decimal point. You need to first convert to float: `int(float("3.14"))` which gives 3.
</details>

**Question 2:** What is the result of `str([1, 2, 3])`?

<details>
<summary>Click to reveal answer</summary>

**Answer:** `"[1, 2, 3]"` (a string)

**Explanation:** The `str()` function converts the list to its string representation, including the square brackets. The result is a string, not a list.
</details>

**Question 3:** What will `list("Python")` return?

<details>
<summary>Click to reveal answer</summary>

**Answer:** `['P', 'y', 't', 'h', 'o', 'n']`

**Explanation:** Converting a string to a list splits it into individual characters. Each character becomes a separate element in the list.
</details>

**Question 4:** How do you check if a variable `x` is of type `int`?

<details>
<summary>Click to reveal answer</summary>

**Answer:** Use `type(x) == int` or `isinstance(x, int)`

**Explanation:** Both methods work, but `isinstance()` is generally preferred as it also accounts for inheritance. Example: `isinstance(5, int)` returns `True`.
</details>

**Question 5:** What happens when you convert `True` to an integer: `int(True)`?

<details>
<summary>Click to reveal answer</summary>

**Answer:** It returns `1`

**Explanation:** In Python, `True` is treated as 1 and `False` as 0 when converted to integers. This is because `bool` is a subclass of `int`. Similarly, `int(False)` returns `0`.
</details>

---

## Conclusion

Python provides a variety of built-in data types to handle data in efficient and expressive ways. Knowing when and how to use each data type is essential for writing clean and effective Python code.