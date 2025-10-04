---
id: python-dictionaries
title: Python Dictionaries
description: Complete theoretical explanation of dictionaries in Python, covering creation, modification, methods, and use-cases.
sidebar_label: Python Dictionaries #displays in sidebar
sidebar_position: 11
tags:
  [
    Python,
    Introduction of python,
    List in Python,
    Python Syntax,
    Variables,
    Operators,
    Type Casting,
    String,
    Tuple in Python,
    Python Dictionaries

  ]

---


# Python Dictionaries

A **dictionary** in Python is an unordered, mutable, and indexed collection of key-value pairs. It is one of the most powerful and flexible built-in data structures in Python, suitable for representing structured data.

## What is a Dictionary?

Dictionaries hold data in the form of key-value pairs. Each key is unique and maps to a specific value. Values can be of any data type, while keys must be immutable (like strings, numbers, or tuples).

### Example:
```python
person = {
    "name": "Alice",
    "age": 25,
    "city": "New York"
}
```

## Properties of Dictionaries

* Keys are unique.
* Keys must be immutable.
* Values can be of any data type.
* Dictionaries are mutable and can be changed after creation.
* In Python 3.7+, dictionaries maintain insertion order.

---

### 🧠 Quiz 1: Dictionary Basics

**Question 1:** What is the main characteristic that distinguishes a dictionary from a list?

<details>
<summary>Click to reveal answer</summary>

**Answer:** Dictionaries store data as key-value pairs, while lists store elements by index

**Explanation:** Lists use numeric indices (0, 1, 2...) to access elements, while dictionaries use keys (which can be strings, numbers, etc.) to access values. This makes dictionaries ideal for structured data where you want meaningful names for your data.
</details>

**Question 2:** Which of the following can be used as a dictionary key?
- A) `"name"` (string)
- B) `42` (integer)
- C) `(1, 2)` (tuple)
- D) `[1, 2]` (list)

<details>
<summary>Click to reveal answer</summary>

**Answer:** A, B, and C (string, integer, and tuple) - NOT D

**Explanation:** Dictionary keys must be immutable (unchangeable). Strings, integers, and tuples are immutable and can be keys. Lists are mutable, so they cannot be used as keys. Attempting to use a list as a key will raise a `TypeError`.
</details>

**Question 3:** What happens if you use the same key twice when creating a dictionary?
```python
data = {"x": 10, "y": 20, "x": 30}
```

<details>
<summary>Click to reveal answer</summary>

**Answer:** The second value overwrites the first; `data` becomes `{"x": 30, "y": 20}`

**Explanation:** Dictionary keys must be unique. If you assign a value to an existing key, it overwrites the old value. The dictionary will only contain one "x" key with the latest value (30).
</details>

---

## Creating Dictionaries

### Using Curly Braces:

```python
data = {"a": 1, "b": 2}
```

### Using the `dict()` Constructor:

```python
data = dict(x=10, y=20)
```

### Creating an Empty Dictionary:

```python
empty = {}
```

## Accessing Dictionary Elements

### Using Key Indexing:

```python
person["name"]
```

### Using `get()` Method:

```python
person.get("age")
person.get("gender", "Not Found")
```

---

### 🧠 Quiz 2: Accessing Dictionary Elements

**Question 1:** What's the difference between `person["age"]` and `person.get("age")`?

<details>
<summary>Click to reveal answer</summary>

**Answer:** `person["age"]` raises a `KeyError` if the key doesn't exist, while `person.get("age")` returns `None`

**Explanation:** 
```python
person = {"name": "Alice"}
person["age"]        # KeyError: 'age'
person.get("age")    # Returns None (no error)
person.get("age", 0) # Returns 0 (default value)
```
Using `.get()` is safer when you're not sure if a key exists.
</details>

**Question 2:** What will be the output?
```python
student = {"name": "Bob", "grade": "A"}
print(student.get("score", 100))
```

<details>
<summary>Click to reveal answer</summary>

**Answer:** `100`

**Explanation:** The key "score" doesn't exist in the dictionary. The `.get()` method returns the default value (100) when the key is not found. This is useful for providing fallback values.
</details>

**Question 3:** How do you check if a key exists in a dictionary?

<details>
<summary>Click to reveal answer</summary>

**Answer:** Use the `in` operator: `if "key" in dictionary:`

**Explanation:**
```python
person = {"name": "Alice", "age": 25}
if "name" in person:
    print("Name exists")  # This will execute
if "email" in person:
    print("Email exists")  # This won't execute
```
</details>

---

## Adding and Updating Items

### Add New Key-Value:

```python
person["gender"] = "Female"
```

### Update Existing Key:

```python
person["age"] = 30
```

### Use `update()` Method:

```python
person.update({"age": 35, "city": "Chicago"})
```

---

### 🧠 Quiz 3: Modifying Dictionaries

**Question 1:** What will the dictionary look like after this code?
```python
data = {"a": 1, "b": 2}
data["c"] = 3
data["a"] = 10
```

<details>
<summary>Click to reveal answer</summary>

**Answer:** `{"a": 10, "b": 2, "c": 3}`

**Explanation:** 
- `data["c"] = 3` adds a new key "c" with value 3
- `data["a"] = 10` updates the existing key "a" from 1 to 10
</details>

**Question 2:** What does the `update()` method do if a key already exists?

<details>
<summary>Click to reveal answer</summary>

**Answer:** It overwrites the existing value with the new value

**Explanation:**
```python
person = {"name": "Alice", "age": 25}
person.update({"age": 30, "city": "Boston"})
# Result: {"name": "Alice", "age": 30, "city": "Boston"}
```
The "age" is updated to 30, and "city" is added as a new key.
</details>

**Question 3:** Can you add multiple key-value pairs at once?

<details>
<summary>Click to reveal answer</summary>

**Answer:** Yes, using the `update()` method with another dictionary

**Explanation:**
```python
data = {"x": 1}
data.update({"y": 2, "z": 3})
# Result: {"x": 1, "y": 2, "z": 3}
```
This is more efficient than adding keys one by one.
</details>

---

## Removing Elements

### Using `pop()`:

```python
person.pop("age")
```

### Using `del`:

```python
del person["city"]
```

### Using `clear()`:

```python
person.clear()
```

### Using `popitem()`:

Removes and returns the last inserted key-value pair.

```python
person.popitem()
```

---

### 🧠 Quiz 4: Removing Elements

**Question 1:** What's the difference between `pop()` and `del`?

<details>
<summary>Click to reveal answer</summary>

**Answer:** `pop()` removes the key and returns its value, while `del` just removes the key without returning anything

**Explanation:**
```python
person = {"name": "Alice", "age": 25}
age = person.pop("age")  # age = 25, person = {"name": "Alice"}
del person["name"]        # person = {}, nothing is returned
```
</details>

**Question 2:** What does `popitem()` return?

<details>
<summary>Click to reveal answer</summary>

**Answer:** A tuple containing the key-value pair that was removed (the last inserted item)

**Explanation:**
```python
person = {"name": "Alice", "age": 25, "city": "NYC"}
item = person.popitem()  # Returns ("city", "NYC")
# person is now {"name": "Alice", "age": 25}
```
In Python 3.7+, it removes the last inserted item in order.
</details>

**Question 3:** What happens after calling `clear()` on a dictionary?

<details>
<summary>Click to reveal answer</summary>

**Answer:** The dictionary becomes empty `{}`

**Explanation:**
```python
data = {"a": 1, "b": 2, "c": 3}
data.clear()
print(data)  # {}
```
`clear()` removes all items from the dictionary, leaving an empty dictionary (not `None`).
</details>

**Question 4:** What happens if you try to `pop()` a key that doesn't exist?

<details>
<summary>Click to reveal answer</summary>

**Answer:** It raises a `KeyError` unless you provide a default value

**Explanation:**
```python
person = {"name": "Alice"}
person.pop("age")           # KeyError
person.pop("age", None)     # Returns None (no error)
person.pop("age", "N/A")    # Returns "N/A" (no error)
```
</details>

---

## Dictionary Methods

| Method      | Description                                      |
| ----------- | ------------------------------------------------ |
| `get(key)`  | Returns value for key or `None` if key not found |
| `keys()`    | Returns a view of all keys                       |
| `values()`  | Returns a view of all values                     |
| `items()`   | Returns a view of key-value pairs                |
| `update()`  | Updates dictionary with another dictionary       |
| `pop(key)`  | Removes specified key                            |
| `popitem()` | Removes the last inserted item                   |
| `clear()`   | Removes all elements                             |
| `copy()`    | Returns a shallow copy                           |

## Iterating Through a Dictionary

### Loop Through Keys:

```python
for key in person:
    print(key)
```

### Loop Through Values:

```python
for value in person.values():
    print(value)
```

### Loop Through Key-Value Pairs:

```python
for key, value in person.items():
    print(key, value)
```

---

### 🧠 Quiz 5: Dictionary Methods and Iteration

**Question 1:** What will this code print?
```python
data = {"a": 1, "b": 2, "c": 3}
print(list(data.keys()))
```

<details>
<summary>Click to reveal answer</summary>

**Answer:** `['a', 'b', 'c']`

**Explanation:** The `.keys()` method returns a view of all the keys in the dictionary. Converting it to a list gives you a list of the keys.
</details>

**Question 2:** How do you iterate through both keys and values simultaneously?

<details>
<summary>Click to reveal answer</summary>

**Answer:** Use `.items()` with tuple unpacking in a for loop

**Explanation:**
```python
person = {"name": "Alice", "age": 25}
for key, value in person.items():
    print(f"{key}: {value}")
# Output:
# name: Alice
# age: 25
```
</details>

**Question 3:** What's the difference between `copy()` and direct assignment?

<details>
<summary>Click to reveal answer</summary>

**Answer:** `copy()` creates a new dictionary, while direct assignment creates a reference to the same dictionary

**Explanation:**
```python
original = {"a": 1}
reference = original      # Same object
copy = original.copy()    # New object

reference["b"] = 2
print(original)  # {"a": 1, "b": 2} - Changed!

copy["c"] = 3
print(original)  # {"a": 1, "b": 2} - Unchanged
```
</details>

**Question 4:** What will this output?
```python
scores = {"math": 90, "science": 85, "english": 92}
print(max(scores.values()))
```

<details>
<summary>Click to reveal answer</summary>

**Answer:** `92`

**Explanation:** `scores.values()` returns all the values (90, 85, 92), and `max()` finds the highest value, which is 92.
</details>

---

## Nested Dictionaries

A dictionary can contain other dictionaries as values, enabling hierarchical data storage.

```python
students = {
    "101": {"name": "John", "grade": "A"},
    "102": {"name": "Emma", "grade": "B"},
}
students["101"]["name"]  # Output: John
```

## Dictionary Comprehension

Like list comprehensions, dictionary comprehensions offer a concise way to create dictionaries.

```python
squares = {x: x*x for x in range(1, 6)}
```

---

### 🧠 Quiz 6: Advanced Dictionary Concepts

**Question 1:** How do you access a nested dictionary value?
```python
data = {"user": {"profile": {"name": "Alice"}}}
```

<details>
<summary>Click to reveal answer</summary>

**Answer:** Chain the keys: `data["user"]["profile"]["name"]`

**Explanation:** Access each level one at a time using consecutive square brackets. This returns "Alice".
</details>

**Question 2:** What will this dictionary comprehension create?
```python
result = {x: x**2 for x in range(1, 4)}
```

<details>
<summary>Click to reveal answer</summary>

**Answer:** `{1: 1, 2: 4, 3: 9}`

**Explanation:** The comprehension creates key-value pairs where each number from 1 to 3 is the key, and its square is the value.
</details>

**Question 3:** How can you filter a dictionary comprehension?

<details>
<summary>Click to reveal answer</summary>

**Answer:** Add an `if` condition at the end

**Explanation:**
```python
numbers = {"a": 1, "b": 2, "c": 3, "d": 4}
evens = {k: v for k, v in numbers.items() if v % 2 == 0}
# Result: {"b": 2, "d": 4}
```
This creates a new dictionary with only even values.
</details>

**Question 4:** What's a practical use case for nested dictionaries?

<details>
<summary>Click to reveal answer</summary>

**Answer:** Representing structured data like JSON, database records, or hierarchical information

**Explanation:** Example - storing student information:
```python
school = {
    "Class A": {
        "student1": {"name": "John", "age": 15},
        "student2": {"name": "Emma", "age": 16}
    },
    "Class B": {
        "student3": {"name": "Mike", "age": 15}
    }
}
```
This naturally represents hierarchical relationships.
</details>

---

## Use Cases of Dictionaries

* Representing JSON or structured data
* Frequency counting (e.g., word count)
* Lookup tables
* Configuration or settings
* Storing database records in memory

## Dictionary vs List

| Feature    | Dictionary               | List              |
| ---------- | ------------------------ | ----------------- |
| Structure  | Key-value pairs          | Indexed elements  |
| Access     | Via key                  | Via index         |
| Order      | Insertion ordered (3.7+) | Ordered           |
| Mutability | Mutable                  | Mutable           |
| Use Case   | Lookup, mapping          | Sequence of items |

## Best Practices

* Use `.get()` instead of direct key access to avoid `KeyError`.
* Use dictionary comprehension for cleaner and more readable code.
* Use keys that are hashable (e.g., strings, numbers).
* Use dictionaries for fast lookups and structured data representation.

---

### 🧠 Quiz 7: Best Practices and Use Cases

**Question 1:** Why is using `.get()` considered a best practice?

<details>
<summary>Click to reveal answer</summary>

**Answer:** It prevents `KeyError` exceptions and allows you to provide default values

**Explanation:** Instead of:
```python
# Risky - might crash
value = person["email"]
```
Use:
```python
# Safe - returns None or default if key missing
value = person.get("email", "no-email@example.com")
```
</details>

**Question 2:** When should you use a dictionary instead of a list?

<details>
<summary>Click to reveal answer</summary>

**Answer:** When you need to access data by meaningful keys rather than numeric indices, or when you need fast lookups

**Explanation:** 
- Use **Dictionary**: Storing user profiles, configuration settings, word frequencies
- Use **List**: Ordered sequences, when numeric position matters, collections of similar items
</details>

**Question 3:** What's a common use case for counting word frequencies?

<details>
<summary>Click to reveal answer</summary>

**Answer:**
```python
text = "hello world hello"
word_count = {}
for word in text.split():
    word_count[word] = word_count.get(word, 0) + 1
# Result: {"hello": 2, "world": 1}
```

**Explanation:** Dictionaries are perfect for counting because you can use the word as the key and increment its count. The `.get()` method provides a default of 0 for new words.
</details>

**Question 4:** Why must dictionary keys be hashable?

<details>
<summary>Click to reveal answer</summary>

**Answer:** Because Python uses hashing to store and quickly retrieve values by their keys

**Explanation:** Hashable objects (strings, numbers, tuples) have a fixed hash value that allows Python to quickly locate them in memory. This gives dictionaries O(1) lookup time. Mutable objects like lists can't be hashed because their content can change.
</details>

**Question 5:** Which is more efficient for lookup operations?
```python
# Option A: List
names = ["Alice", "Bob", "Charlie"]
"Bob" in names

# Option B: Dictionary
names = {"Alice": 1, "Bob": 2, "Charlie": 3}
"Bob" in names
```

<details>
<summary>Click to reveal answer</summary>

**Answer:** Option B (Dictionary) - O(1) average time complexity

**Explanation:** 
- **List lookup**: O(n) - must check each element until found
- **Dictionary lookup**: O(1) - uses hashing for instant access

For 1000 items, a list might need 1000 checks, while a dictionary typically needs just 1!
</details>

---

## Summary

* Dictionaries are one of the most versatile data structures in Python.
* They store key-value pairs and allow fast retrieval based on keys.
* Keys must be unique and immutable.
* Dictionaries support powerful methods for data manipulation and traversal.