---
id: python-set
title: Set in Python
sidebar_label: Set in Python #displays in sidebar
sidebar_position: 10
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
    Tuple in Python,
    Set in Python
  ]

---

# Set in Python

A **Set** in Python is a built-in data structure used to store multiple **unique** elements in a single variable. Sets are **unordered** and **mutable**, making them an efficient tool for membership tests, eliminating duplicates, and performing mathematical set operations.


## Why Use Sets?

Sets are commonly used when:
- You need to **store unique values only**
- The order of elements **does not matter**
- You want to perform **fast membership testing**
- You need efficient **union, intersection, and difference operations**


## Key Characteristics

- **Unordered:** Elements have no defined order.
- **Unique:** No duplicates allowed.
- **Mutable:** You can add or remove items.
- **Iterable:** You can loop through a set.

---

## 🎯 Quiz 1: Set Basics and Characteristics

**Question 1:** What happens when you try to create a set with duplicate values?
```python
numbers = {1, 2, 2, 3, 3, 3, 4}
print(numbers)
```
<details>
<summary>Show Answer</summary>

**Output:** `{1, 2, 3, 4}`

**Explanation:** Sets automatically remove duplicates. Only unique values are stored, which is one of the main features of sets.
</details>

**Question 2:** What's the difference between `{}` and `set()`?
<details>
<summary>Show Answer</summary>

- **`{}`** creates an **empty dictionary**, not a set
- **`set()`** creates an **empty set**

```python
empty_dict = {}
empty_set = set()

print(type(empty_dict))  # <class 'dict'>
print(type(empty_set))   # <class 'set'>
```

**Common mistake:** Using `{}` when you mean to create an empty set!
</details>

**Question 3:** Can you access set elements by index like `my_set[0]`?
<details>
<summary>Show Answer</summary>

**No!** Sets are **unordered**, so they don't support indexing or slicing.

```python
fruits = {"apple", "banana", "cherry"}
# fruits[0]  # TypeError: 'set' object is not subscriptable
```

**To access elements:**
- Use loops: `for fruit in fruits:`
- Check membership: `if "apple" in fruits:`
- Convert to list: `list(fruits)[0]` (but order is not guaranteed)
</details>

---

## Creating a Set

There are two main ways to create a set:

### Using Curly Braces `{}`

```python
fruits = {"apple", "banana", "cherry"}
print(fruits)  # Output: {'banana', 'apple', 'cherry'}
```

### Using the `set()` Constructor

```python
numbers = set([1, 2, 3, 2])
print(numbers)  # Output: {1, 2, 3}
```

> **Important:** Empty curly braces `{}` create an **empty dictionary**, not a set. Use `set()` instead:

>
> ```python
> empty_set = set()
> ```


## Adding Elements to a Set

You can add elements using the `add()` method:

```python
colors = {"red", "green"}
colors.add("blue")
print(colors)  # Output: {'red', 'green', 'blue'}
```

## Removing Elements from a Set

Python provides several methods to remove elements:

### `remove()`

Removes the specified item. Raises an error if the item does not exist.

```python
colors = {"red", "green"}
colors.remove("red")
print(colors)  # Output: {'green'}
```

> If you try to remove an item not present:
>
> ```python
> colors.remove("yellow")  # KeyError
> ```


### `discard()`

Removes the specified item without raising an error if the item is not found.

```python
colors = {"green"}
colors.discard("yellow")  # No error
```

### `pop()`

Removes and returns an arbitrary element.

```python
colors = {"red", "blue"}
removed = colors.pop()
print("Removed:", removed)
print("Remaining:", colors)
```


### `clear()`

Removes all elements.

```python
colors.clear()
print(colors)  # Output: set()
```

---

## 🎯 Quiz 2: Adding and Removing Elements

**Question 1:** What's the difference between `remove()` and `discard()`?
<details>
<summary>Show Answer</summary>

**`remove(item)`:**
- Raises a `KeyError` if the item doesn't exist
- Use when you're sure the item exists

```python
s = {1, 2, 3}
s.remove(4)  # KeyError: 4
```

**`discard(item)`:**
- Does NOT raise an error if the item doesn't exist
- Use when you're unsure if the item exists (safer)

```python
s = {1, 2, 3}
s.discard(4)  # No error, silently does nothing
```

**Best practice:** Use `discard()` for safer code unless you specifically need the error notification.
</details>

**Question 2:** What will happen?
```python
my_set = {1, 2, 3}
my_set.add(2)
print(my_set)
```
<details>
<summary>Show Answer</summary>

**Output:** `{1, 2, 3}`

**Explanation:** Adding an element that already exists does nothing. Sets only store unique values, so duplicate additions are ignored without error.
</details>

**Question 3:** What makes `pop()` unpredictable for sets?
<details>
<summary>Show Answer</summary>

**`pop()` removes and returns an arbitrary (random) element** because sets are unordered.

```python
s = {1, 2, 3, 4, 5}
print(s.pop())  # Could be any element!
print(s.pop())  # Could be any remaining element!
```

**For lists:** `pop()` removes the last element (predictable)
**For sets:** `pop()` removes an arbitrary element (unpredictable)

**Use case:** When you need to remove elements but don't care which one.

**Caution:** `pop()` on an empty set raises `KeyError`!
</details>

---

## Updating a Set

To add multiple items at once, use `update()`:

```python
a = {1, 2}
a.update([3, 4], {5, 6})
print(a)  # Output: {1, 2, 3, 4, 5, 6}
```


## Membership Testing

Check if an item is in a set using `in` or `not in`:

```python
nums = {1, 2, 3}
print(2 in nums)        # Output: True
print(5 not in nums)    # Output: True
```

---

## 🎯 Quiz 3: Set Operations and Membership

**Question 1:** Why is membership testing faster in sets than in lists?
<details>
<summary>Show Answer</summary>

**Sets use hash tables** for O(1) average-case lookup time.

**Performance comparison:**
```python
# Set - O(1) average case
my_set = {1, 2, 3, ..., 1000000}
print(999999 in my_set)  # Very fast!

# List - O(n) worst case
my_list = [1, 2, 3, ..., 1000000]
print(999999 in my_list)  # Must check each element!
```

**Rule of thumb:** 
- Use **sets** for frequent membership tests
- Use **lists** when you need ordering or duplicates

**Example use case:**
```python
# Check if email is in blacklist (thousands of emails)
blacklist = set(["spam@example.com", ...])  # Fast!
if user_email in blacklist:
    reject()
```
</details>

**Question 2:** What will `update()` do with duplicate values?
```python
s = {1, 2, 3}
s.update([2, 3, 4, 5])
print(s)
```
<details>
<summary>Show Answer</summary>

**Output:** `{1, 2, 3, 4, 5}`

**Explanation:** 
- `update()` adds all unique elements from the iterable
- Duplicates (2 and 3) are automatically ignored
- Only new unique values (4 and 5) are added

**`update()` accepts multiple iterables:**
```python
s = {1}
s.update([2, 3], {4, 5}, (6, 7))
print(s)  # {1, 2, 3, 4, 5, 6, 7}
```
</details>

---

## Common Set Operations

Python sets support powerful operations:

| Operation            | Syntax                                 | Description                          |
| -------------------- | -------------------------------------- | ------------------------------------ |
| Union                | `a | b` or `a.union(b)`                | Combine all elements from both sets  |
| Intersection         | `a & b` or `a.intersection(b)`         | Elements common to both sets         |
| Difference           | `a - b` or `a.difference(b)`           | Elements in `a` but not in `b`       |
| Symmetric Difference | `a ^ b` or `a.symmetric_difference(b)` | Elements in either set, but not both |

---

### Example

```python
a = {1, 2, 3}
b = {3, 4, 5}

# Union
print(a | b)   # {1, 2, 3, 4, 5}

# Intersection
print(a & b)   # {3}

# Difference
print(a - b)   # {1, 2}

# Symmetric Difference
print(a ^ b)   # {1, 2, 4, 5}
```

---

## 🎯 Quiz 4: Set Operations

**Question 1:** Explain the difference between these operations:
```python
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

print(a - b)   # ?
print(b - a)   # ?
print(a ^ b)   # ?
```
<details>
<summary>Show Answer</summary>

**Outputs:**
```python
print(a - b)   # {1, 2} - elements in a but NOT in b
print(b - a)   # {5, 6} - elements in b but NOT in a
print(a ^ b)   # {1, 2, 5, 6} - elements in either, but NOT both
```

**Visual representation:**
```
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

a - b:  [1, 2] (3, 4) 
b - a:          (3, 4) [5, 6]
a ^ b:  [1, 2]         [5, 6]  (symmetric difference)
a & b:          (3, 4)          (intersection)
a | b:  [1, 2] (3, 4) [5, 6]    (union)
```

**Note:** `a - b` ≠ `b - a` (difference is NOT commutative)
</details>

**Question 2:** What's the practical difference between using operators (`|`, `&`) vs methods (`.union()`, `.intersection()`)?
<details>
<summary>Show Answer</summary>

**Operators (`|`, `&`, `-`, `^`):**
- Only work with sets
- Cleaner, more mathematical syntax
- Raise `TypeError` if used with non-sets

```python
a = {1, 2, 3}
b = {3, 4, 5}
print(a | b)  # Works

# a | [3, 4, 5]  # TypeError: unsupported operand type(s)
```

**Methods (`.union()`, `.intersection()`, etc.):**
- Accept any iterable (lists, tuples, sets)
- More flexible
- Slightly more verbose

```python
a = {1, 2, 3}
print(a.union([3, 4, 5]))  # Works! {1, 2, 3, 4, 5}
print(a.union([6], {7}))   # Multiple iterables! {1, 2, 3, 6, 7}
```

**Best practice:** 
- Use operators for set-to-set operations
- Use methods when working with mixed types
</details>

**Question 3:** Find common elements in three sets:
```python
set1 = {1, 2, 3, 4, 5}
set2 = {3, 4, 5, 6, 7}
set3 = {5, 6, 7, 8, 9}
```
<details>
<summary>Show Answer</summary>

**Solution:**
```python
common = set1 & set2 & set3
print(common)  # {5}

# Or using method
common = set1.intersection(set2, set3)
print(common)  # {5}
```

**Step by step:**
1. `set1 & set2` → `{3, 4, 5}` (common in first two)
2. `{3, 4, 5} & set3` → `{5}` (common in all three)

**Real-world example:**
```python
# Students who took all three courses
python_students = {"Alice", "Bob", "Charlie", "David"}
java_students = {"Bob", "Charlie", "Eve"}
cpp_students = {"Charlie", "Frank"}

all_three = python_students & java_students & cpp_students
print(all_three)  # {'Charlie'}
```
</details>

---

## Iterating Over a Set

Loop through elements with a `for` loop:

```python
animals = {"cat", "dog", "rabbit"}
for animal in animals:
    print(animal)
```

> Since sets are unordered, the output order may differ every time.


## Frozenset

A **frozenset** is an immutable version of a set. Once created, you cannot modify it.

```python
fs = frozenset([1, 2, 3])
print(fs)  # frozenset({1, 2, 3})

# fs.add(4)  #  AttributeError
```

Use `frozenset` when you need a **hashable set**, e.g., as dictionary keys.

---

## 🎯 Quiz 5: Frozenset and Advanced Concepts

**Question 1:** Why would you use a frozenset instead of a regular set?
<details>
<summary>Show Answer</summary>

**Use frozenset when you need:**

1. **Immutability** (cannot be changed after creation)
```python
fs = frozenset([1, 2, 3])
# fs.add(4)  # AttributeError - cannot modify
```

2. **Hashable sets** (can be used as dictionary keys or set elements)
```python
# Regular sets cannot be dictionary keys
# my_dict = {{1, 2}: "value"}  # TypeError

# Frozensets can!
my_dict = {frozenset([1, 2]): "value"}
print(my_dict)  # {frozenset({1, 2}): 'value'}

# Sets of sets (using frozenset)
set_of_sets = {frozenset([1, 2]), frozenset([3, 4])}
print(set_of_sets)
```

3. **Thread-safety** (immutable objects are inherently thread-safe)

**Trade-off:** Cannot modify, but gain hashability and safety.
</details>

**Question 2:** Can you convert between set and frozenset?
<details>
<summary>Show Answer</summary>

**Yes!** You can convert in both directions:

```python
# Set to frozenset
regular_set = {1, 2, 3}
frozen = frozenset(regular_set)
print(frozen)  # frozenset({1, 2, 3})

# Frozenset to set
frozen_set = frozenset([4, 5, 6])
regular = set(frozen_set)
print(regular)  # {4, 5, 6}

# Now you can modify the regular set
regular.add(7)
print(regular)  # {4, 5, 6, 7}
```

**Use case:**
```python
# Store sets as dictionary keys
cache = {}
key = frozenset(["param1", "param2"])
cache[key] = "result"

# Convert back to set for modifications
params = set(key)
params.add("param3")
```
</details>

**Question 3:** What operations can you perform on frozensets?
<details>
<summary>Show Answer</summary>

**Frozensets support all READ operations but NO WRITE operations:**

**✅ Works:**
```python
fs1 = frozenset([1, 2, 3])
fs2 = frozenset([3, 4, 5])

# Set operations
print(fs1 | fs2)      # Union: frozenset({1, 2, 3, 4, 5})
print(fs1 & fs2)      # Intersection: frozenset({3})
print(fs1 - fs2)      # Difference: frozenset({1, 2})
print(fs1 ^ fs2)      # Symmetric difference: frozenset({1, 2, 4, 5})

# Membership
print(2 in fs1)       # True

# Iteration
for item in fs1:
    print(item)
```

**❌ Doesn't work:**
```python
fs = frozenset([1, 2, 3])
# fs.add(4)           # AttributeError
# fs.remove(1)        # AttributeError
# fs.update([4, 5])   # AttributeError
# fs.discard(1)       # AttributeError
# fs.clear()          # AttributeError
```

**Summary:** You can query and combine frozensets, but not modify them.
</details>

---

## When to Use Sets?

* Removing duplicates from lists
* Fast membership tests
* Performing set algebra (union, intersection)
* Representing unique collections


## Best Practices

* Use `set()` to create empty sets.
* Use `discard()` if you are not sure whether an element exists.
* Prefer sets over lists when you need uniqueness or fast lookups.

---

## Practice Exercises

1. **Create a set of your favorite fruits. Add one more fruit and remove another.**
2. **Find the union and intersection of `{1, 2, 3}` and `{3, 4, 5}`.**
3. **Write a program that removes duplicates from a list using a set.**
4. **Create a frozenset and show that it cannot be modified.**

---

## 🎯 Final Quiz: Comprehensive Set Challenge

**Question 1:** Remove duplicates from a list while preserving order:
```python
numbers = [1, 3, 2, 3, 4, 1, 5, 2]
# Convert to unique list
```
<details>
<summary>Show Answer</summary>

**Problem:** Sets don't preserve order!

```python
# ❌ Wrong - loses order
numbers = [1, 3, 2, 3, 4, 1, 5, 2]
unique = list(set(numbers))
print(unique)  # Order not preserved!
```

**✅ Correct solutions:**

**Method 1: Using dict (Python 3.7+)**
```python
numbers = [1, 3, 2, 3, 4, 1, 5, 2]
unique = list(dict.fromkeys(numbers))
print(unique)  # [1, 3, 2, 4, 5]
```

**Method 2: Manual with set for tracking**
```python
numbers = [1, 3, 2, 3, 4, 1, 5, 2]
seen = set()
unique = []
for num in numbers:
    if num not in seen:
        seen.add(num)
        unique.append(num)
print(unique)  # [1, 3, 2, 4, 5]
```

**Method 3: List comprehension (one-liner)**
```python
numbers = [1, 3, 2, 3, 4, 1, 5, 2]
seen = set()
unique = [x for x in numbers if not (x in seen or seen.add(x))]
print(unique)  # [1, 3, 2, 4, 5]
```
</details>

**Question 2:** Find students who are in at least 2 out of 3 clubs:
```python
chess_club = {"Alice", "Bob", "Charlie"}
drama_club = {"Bob", "Diana", "Eve"}
sports_club = {"Alice", "Bob", "Frank"}
```
<details>
<summary>Show Answer</summary>

```python
chess_club = {"Alice", "Bob", "Charlie"}
drama_club = {"Bob", "Diana", "Eve"}
sports_club = {"Alice", "Bob", "Frank"}

# Students in exactly 2 clubs
in_two = ((chess_club & drama_club) | 
          (drama_club & sports_club) | 
          (chess_club & sports_club)) - (chess_club & drama_club & sports_club)

# Students in all 3 clubs
in_three = chess_club & drama_club & sports_club

# Students in at least 2 clubs
in_at_least_two = in_two | in_three

print("In at least 2 clubs:", in_at_least_two)  # {'Alice', 'Bob'}

# Alternative approach - count membership
all_students = chess_club | drama_club | sports_club
result = set()

for student in all_students:
    count = 0
    if student in chess_club:
        count += 1
    if student in drama_club:
        count += 1
    if student in sports_club:
        count += 1
    
    if count >= 2:
        result.add(student)

print("In at least 2 clubs:", result)  # {'Alice', 'Bob'}
```
</details>

**Question 3:** Implement a function to check if two sets are disjoint (have no common elements):
<details>
<summary>Show Answer</summary>

```python
def are_disjoint(set1, set2):
    """Check if two sets have no common elements."""
    return len(set1 & set2) == 0

# Alternative using built-in method
def are_disjoint_v2(set1, set2):
    return set1.isdisjoint(set2)

# Tests
a = {1, 2, 3}
b = {4, 5, 6}
c = {3, 4, 5}

print(are_disjoint(a, b))  # True (no overlap)
print(are_disjoint(a, c))  # False (3 is common)

# The built-in way (most efficient)
print(a.isdisjoint(b))  # True
print(a.isdisjoint(c))  # False
```

**Other useful set comparison methods:**
```python
a = {1, 2, 3}
b = {1, 2, 3, 4, 5}

print(a.issubset(b))    # True - is a contained in b?
print(b.issuperset(a))  # True - does b contain a?
print(a == b)           # False - are they equal?
```
</details>

**Question 4:** Use sets to find anagrams:
```python
# Check if two words are anagrams
word1 = "listen"
word2 = "silent"
```
<details>
<summary>Show Answer</summary>

```python
def are_anagrams(word1, word2):
    """Check if two words are anagrams using sets."""
    # Method 1: Check if they have the same characters
    # Note: This checks unique characters only!
    return set(word1.lower()) == set(word2.lower())

# Problem: This doesn't account for frequency!
print(are_anagrams("listen", "silent"))  # True
print(are_anagrams("aab", "abb"))        # True (Wrong! Different letter counts)

# Better solution using sorted
def are_anagrams_correct(word1, word2):
    return sorted(word1.lower()) == sorted(word2.lower())

print(are_anagrams_correct("listen", "silent"))  # True
print(are_anagrams_correct("aab", "abb"))        # False (Correct!)

# Using Counter (best for frequency-aware comparison)
from collections import Counter

def are_anagrams_best(word1, word2):
    return Counter(word1.lower()) == Counter(word2.lower())

# Group anagrams from a list
words = ["eat", "tea", "tan", "ate", "nat", "bat"]
anagram_groups = {}

for word in words:
    key = ''.join(sorted(word))
    if key not in anagram_groups:
        anagram_groups[key] = []
    anagram_groups[key].append(word)

print(anagram_groups)
# {'aet': ['eat', 'tea', 'ate'], 'ant': ['tan', 'nat'], 'abt': ['bat']}
```
</details>

**Question 5:** Implement set-based caching for expensive function calls:
<details>
<summary>Show Answer</summary>

```python
class ComputationCache:
    """Cache expensive computations using sets and dicts."""
    
    def __init__(self):
        self.computed = set()  # Track what we've computed
        self.cache = {}        # Store results
    
    def compute(self, params):
        """Simulate expensive computation."""
        # Convert to frozenset for hashability
        key = frozenset(params.items()) if isinstance(params, dict) else frozenset(params)
        
        # Check if already computed
        if key in self.computed:
            print(f"Cache hit for {params}")
            return self.cache[key]
        
        # Perform expensive computation
        print(f"Computing for {params}...")
        result = sum(params.values()) if isinstance(params, dict) else sum(params)
        
        # Store in cache
        self.computed.add(key)
        self.cache[key] = result
        
        return result

# Usage
cache = ComputationCache()

params1 = {"a": 1, "b": 2, "c": 3}
print(cache.compute(params1))  # Computing... 6
print(cache.compute(params1))  # Cache hit! 6

params2 = [1, 2, 3, 4, 5]
print(cache.compute(params2))  # Computing... 15
print(cache.compute(params2))  # Cache hit! 15

# Check what's been computed
print(f"Computed {len(cache.computed)} unique parameter sets")
```

**Real-world application:**
```python
# User permissions system
class PermissionChecker:
    def __init__(self):
        self.admin_users = {"alice", "bob"}
        self.moderator_users = {"charlie", "diana"}
        self.banned_users = {"eve"}
    
    def can_post(self, username):
        if username in self.banned_users:
            return False
        return username in (self.admin_users | self.moderator_users)
    
    def is_admin(self, username):
        return username in self.admin_users

checker = PermissionChecker()
print(checker.can_post("alice"))    # True
print(checker.can_post("eve"))      # False
print(checker.is_admin("charlie"))  # False
```
</details>

---

## Summary Table

| Feature               | Description                                  |
| --------------------- | -------------------------------------------- |
| **Mutable**           | Yes (can add/remove elements)                |
| **Ordered**           | No                                           |
| **Duplicates**        | Not allowed                                  |
| **Empty Declaration** | `set()`                                      |
| **Immutable Variant** | `frozenset`                                  |
| **Typical Use Cases** | Membership tests, uniqueness, set operations |

---

🎉 **Congratulations!** You've mastered Sets in Python. Practice with real-world problems like duplicate removal, membership testing, and set algebra to strengthen your skills!