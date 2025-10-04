---
id: python-list
title: List in Python
sidebar_label: List in Python #displays in sidebar
sidebar_position: 8
tags:
  [
    Python,
    List in Python,
    Introduction of python,
    Python Syntax,
    Variables,
    Operators,
    Type Casting,
    String
  ]

---


# Python Lists

A **List** in Python is a data structure that allows you to store multiple items in a single variable. Lists are **ordered**, **mutable**, and **can contain elements of different data types**.


## Creating a List

You create a list using square brackets `[]`:

```python
# Empty List
empty_list = []

# List of Integers
numbers = [1, 2, 3, 4, 5]

# List of Strings
fruits = ["apple", "banana", "cherry"]

# Mixed Data Types
mixed = [1, "hello", 3.14, True]
```



## Indexing

**Indexing** means accessing elements by their position.

* Index starts from **0** in Python:

```python
fruits = ["apple", "banana", "cherry"]

print(fruits[0])  # apple
print(fruits[1])  # banana
print(fruits[2])  # cherry
```

* Negative indexing starts from the end:

```python
print(fruits[-1])  # cherry
print(fruits[-2])  # banana
print(fruits[-3])  # apple
```

---

## 🎯 Quiz 1: List Basics & Indexing

**Question 1:** What are the three key characteristics of Python lists?
<details>
<summary>Show Answer</summary>

1. **Ordered** - Items maintain their position
2. **Mutable** - You can change, add, or remove items
3. **Can contain different data types** - Mix integers, strings, booleans, etc.

```python
my_list = [1, "hello", True, 3.14]  # All valid in one list!
```
</details>

**Question 2:** What will be the output?
```python
numbers = [10, 20, 30, 40, 50]
print(numbers[-2])
```
<details>
<summary>Show Answer</summary>

**Output:** `40`

**Explanation:** Negative indexing starts from the end:
- `numbers[-1]` = 50 (last item)
- `numbers[-2]` = 40 (second-to-last item)
- `numbers[-3]` = 30
</details>

**Question 3:** What error occurs when you try to access `fruits[5]` if `fruits = ["apple", "banana", "cherry"]`?
<details>
<summary>Show Answer</summary>

**`IndexError: list index out of range`**

The list only has 3 elements (indices 0, 1, 2), so trying to access index 5 raises an error.

**Valid indices:** 0, 1, 2, -1, -2, -3
</details>

---

## Slicing

**Slicing** lets you extract a sublist:

```python
numbers = [10, 20, 30, 40, 50]

print(numbers[1:4])    # [20, 30, 40]
print(numbers[:3])     # [10, 20, 30]
print(numbers[2:])     # [30, 40, 50]
print(numbers[-3:-1])  # [30, 40]
```

**Syntax:**

```
list[start:stop:step]
```

**Example with step:**

```python
print(numbers[::2])  # [10, 30, 50]
```


## Modifying Elements

Lists are **mutable**, which means you can change their contents:

```python
fruits = ["apple", "banana", "cherry"]
fruits[1] = "mango"
print(fruits)  # ['apple', 'mango', 'cherry']
```

---

## 🎯 Quiz 2: Slicing & Mutability

**Question 1:** What will be the output?
```python
letters = ['a', 'b', 'c', 'd', 'e', 'f']
print(letters[1:4])
```
<details>
<summary>Show Answer</summary>

**Output:** `['b', 'c', 'd']`

**Explanation:** Slicing `[1:4]` means:
- Start at index 1 ('b')
- Stop **before** index 4
- So it includes indices 1, 2, 3
</details>

**Question 2:** How would you reverse a list using slicing?
<details>
<summary>Show Answer</summary>

**Use `[::-1]`**

```python
numbers = [1, 2, 3, 4, 5]
reversed_nums = numbers[::-1]
print(reversed_nums)  # [5, 4, 3, 2, 1]
```

The `-1` step means "go backwards through the entire list."
</details>

**Question 3:** What's the difference between these two?
```python
# Option A
nums = [1, 2, 3]
nums[1] = 99

# Option B
nums = (1, 2, 3)
nums[1] = 99
```
<details>
<summary>Show Answer</summary>

**Option A:** Works fine! Lists are **mutable**, so you can change elements.
```python
# Result: [1, 99, 3]
```

**Option B:** Raises `TypeError: 'tuple' object does not support item assignment`

Tuples are **immutable** - you cannot change their elements after creation.
</details>

---

## List Methods

Python provides many built-in methods for lists:

| Method         | Description                                           |
| -------------- | ----------------------------------------------------- |
| `append(x)`    | Adds an item to the end of the list                   |
| `insert(i, x)` | Inserts an item at a specific index                   |
| `extend(iter)` | Adds all elements from another iterable               |
| `remove(x)`    | Removes the first occurrence of the item              |
| `pop([i])`     | Removes and returns the item at the given index       |
| `clear()`      | Removes all elements                                  |
| `index(x)`     | Returns the index of the first occurrence of the item |
| `count(x)`     | Counts how many times the item appears                |
| `sort()`       | Sorts the list in ascending order                     |
| `reverse()`    | Reverses the list                                     |
| `copy()`       | Returns a shallow copy of the list                    |

---

### Examples

#### append()

```python
nums = [1, 2, 3]
nums.append(4)
print(nums)  # [1, 2, 3, 4]
```

#### insert()

```python
nums.insert(1, 100)
print(nums)  # [1, 100, 2, 3, 4]
```

#### extend()

```python
nums.extend([5, 6])
print(nums)  # [1, 100, 2, 3, 4, 5, 6]
```

#### remove() and pop()

```python
nums.remove(100)
print(nums)  # [1, 2, 3, 4, 5, 6]

nums.pop()   # Removes the last element
print(nums)  # [1, 2, 3, 4, 5]

nums.pop(2)  # Removes index 2
print(nums)  # [1, 2, 4, 5]
```

---

## 🎯 Quiz 3: List Methods

**Question 1:** What's the difference between `append()` and `extend()`?
<details>
<summary>Show Answer</summary>

**`append()`** adds a **single item** (even if it's a list):
```python
nums = [1, 2, 3]
nums.append([4, 5])
print(nums)  # [1, 2, 3, [4, 5]]
```

**`extend()`** adds **all items** from an iterable:
```python
nums = [1, 2, 3]
nums.extend([4, 5])
print(nums)  # [1, 2, 3, 4, 5]
```
</details>

**Question 2:** What will happen?
```python
fruits = ["apple", "banana", "apple", "cherry", "apple"]
fruits.remove("apple")
print(fruits)
```
<details>
<summary>Show Answer</summary>

**Output:** `['banana', 'apple', 'cherry', 'apple']`

**Explanation:** `remove()` only removes the **first occurrence** of the item. The other two "apple" entries remain in the list.
</details>

**Question 3:** What does `pop()` return?
```python
numbers = [10, 20, 30, 40]
x = numbers.pop(1)
print(x)
print(numbers)
```
<details>
<summary>Show Answer</summary>

**Output:**
```
20
[10, 30, 40]
```

**Explanation:** `pop(i)` **removes** the item at index `i` and **returns** it. So `x` gets the value 20, and the list no longer contains it.
</details>

---

## Iterating Through a List

**Using a for loop:**

```python
fruits = ["apple", "banana", "cherry"]

for item in fruits:
    print(item)
```

**Output:**

```
apple
banana
cherry
```

**Using indices:**

```python
for i in range(len(fruits)):
    print(i, fruits[i])
```


## Membership Test

Check whether an item exists in the list:

```python
print("apple" in fruits)       # True
print("mango" not in fruits)   # True
```


## Nested Lists

Lists can contain other lists:

```python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

print(matrix[0])       # [1, 2, 3]
print(matrix[1][2])    # 6
```

---

## 🎯 Quiz 4: Iteration & Nested Lists

**Question 1:** How would you print both the index and value of each item in a list?
<details>
<summary>Show Answer</summary>

**Use `enumerate()`:**
```python
fruits = ["apple", "banana", "cherry"]

for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")
```

**Output:**
```
0: apple
1: banana
2: cherry
```

This is more Pythonic than using `range(len(fruits))`!
</details>

**Question 2:** What will be the output?
```python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
print(matrix[2][0])
```
<details>
<summary>Show Answer</summary>

**Output:** `7`

**Explanation:**
- `matrix[2]` gets the third sublist: `[7, 8, 9]`
- `matrix[2][0]` gets the first element of that sublist: `7`

Think of it as: row 2, column 0
</details>

**Question 3:** How do you check if a list is empty?
<details>
<summary>Show Answer</summary>

**Two common ways:**

**Method 1: Using `len()`**
```python
my_list = []
if len(my_list) == 0:
    print("List is empty")
```

**Method 2: Direct boolean check (Pythonic)**
```python
my_list = []
if not my_list:
    print("List is empty")
```

Empty lists evaluate to `False` in a boolean context, so Method 2 is preferred!
</details>

---

## List Comprehensions

A **concise way** to create new lists:

```python
squares = [x**2 for x in range(1, 6)]
print(squares)  # [1, 4, 9, 16, 25]
```

**With a condition:**

```python
even = [x for x in range(10) if x % 2 == 0]
print(even)  # [0, 2, 4, 6, 8]
```


## Copying Lists

Be careful! Assigning directly creates a reference:

```python
a = [1, 2, 3]
b = a
b.append(4)

print(a)  # [1, 2, 3, 4]
```

To create an **independent copy:**

```python
c = a.copy()
c.append(5)

print(a)  # [1, 2, 3, 4]
print(c)  # [1, 2, 3, 4, 5]
```

---

## 🎯 Quiz 5: List Comprehensions & Copying

**Question 1:** What will this list comprehension produce?
```python
result = [x * 2 for x in range(5) if x > 2]
print(result)
```
<details>
<summary>Show Answer</summary>

**Output:** `[6, 8]`

**Breakdown:**
- `range(5)` gives: 0, 1, 2, 3, 4
- Filter `if x > 2`: only 3 and 4 qualify
- Multiply by 2: `[3*2, 4*2]` = `[6, 8]`
</details>

**Question 2:** What's wrong with this code?
```python
original = [1, 2, 3]
copy = original
copy.append(4)
print(original)
```
<details>
<summary>Show Answer</summary>

**Problem:** This doesn't create a copy! Both variables point to the **same list**.

**Output:** `[1, 2, 3, 4]` (original is modified!)

**Fix - Create a real copy:**
```python
original = [1, 2, 3]
copy = original.copy()  # or original[:]
copy.append(4)
print(original)  # [1, 2, 3] (unchanged)
print(copy)      # [1, 2, 3, 4]
```
</details>

**Question 3:** Rewrite this loop as a list comprehension:
```python
result = []
for i in range(1, 11):
    if i % 3 == 0:
        result.append(i)
```
<details>
<summary>Show Answer</summary>

**List comprehension version:**
```python
result = [i for i in range(1, 11) if i % 3 == 0]
print(result)  # [3, 6, 9]
```

Much more concise and Pythonic!
</details>

---

## Conclusion

Python Lists are a **powerful and flexible** data structure used everywhere—from collecting and processing data to building complex programs. Practice using list methods and experiment to become confident.

---

## 🎯 Final Quiz: Comprehensive List Challenge

**Question 1:** What will be the final output?
```python
nums = [1, 2, 3, 4, 5]
nums.append(6)
nums.insert(0, 0)
nums.pop()
nums.reverse()
print(nums)
```
<details>
<summary>Show Answer</summary>

**Output:** `[5, 4, 3, 2, 1, 0]`

**Step-by-step:**
1. Start: `[1, 2, 3, 4, 5]`
2. `append(6)`: `[1, 2, 3, 4, 5, 6]`
3. `insert(0, 0)`: `[0, 1, 2, 3, 4, 5, 6]`
4. `pop()`: `[0, 1, 2, 3, 4, 5]` (removes 6)
5. `reverse()`: `[5, 4, 3, 2, 1, 0]`
</details>

**Question 2:** Remove all duplicates from a list while preserving order.
```python
numbers = [1, 2, 2, 3, 4, 3, 5, 1]
# Your solution here
```
<details>
<summary>Show Answer</summary>

**Solution 1: Using a loop**
```python
numbers = [1, 2, 2, 3, 4, 3, 5, 1]
unique = []
for num in numbers:
    if num not in unique:
        unique.append(num)
print(unique)  # [1, 2, 3, 4, 5]
```

**Solution 2: Using dict (Python 3.7+)**
```python
numbers = [1, 2, 2, 3, 4, 3, 5, 1]
unique = list(dict.fromkeys(numbers))
print(unique)  # [1, 2, 3, 4, 5]
```

Note: `set(numbers)` removes duplicates but doesn't preserve order!
</details>

**Question 3:** Create a function that finds the second largest number in a list.
<details>
<summary>Show Answer</summary>

```python
def second_largest(numbers):
    """Find the second largest number in a list."""
    if len(numbers) < 2:
        return None
    
    # Remove duplicates and sort
    unique_nums = list(set(numbers))
    unique_nums.sort(reverse=True)
    
    return unique_nums[1] if len(unique_nums) > 1 else None

# Test
nums = [10, 5, 8, 12, 3, 12, 7]
print(second_largest(nums))  # 10

# Alternative one-liner
def second_largest(numbers):
    return sorted(set(numbers))[-2] if len(set(numbers)) > 1 else None
```
</details>

**Question 4:** What's the output of this nested list comprehension?
```python
matrix = [[1, 2], [3, 4], [5, 6]]
flattened = [num for row in matrix for num in row]
print(flattened)
```
<details>
<summary>Show Answer</summary>

**Output:** `[1, 2, 3, 4, 5, 6]`

**Explanation:** This flattens the 2D list into a 1D list.

**Equivalent loop:**
```python
flattened = []
for row in matrix:
    for num in row:
        flattened.append(num)
```

Read nested comprehensions **left to right** like nested loops!
</details>

**Question 5:** Write a function to rotate a list by `n` positions.
```python
# rotate_list([1, 2, 3, 4, 5], 2) → [4, 5, 1, 2, 3]
```
<details>
<summary>Show Answer</summary>

```python
def rotate_list(lst, n):
    """Rotate list to the right by n positions."""
    if not lst:
        return lst
    
    n = n % len(lst)  # Handle n larger than list length
    return lst[-n:] + lst[:-n]

# Tests
print(rotate_list([1, 2, 3, 4, 5], 2))  # [4, 5, 1, 2, 3]
print(rotate_list([1, 2, 3, 4, 5], 7))  # [4, 5, 1, 2, 3] (7 % 5 = 2)
print(rotate_list([1, 2, 3], 0))        # [1, 2, 3]

# How it works:
# lst[-n:] gets last n elements: [4, 5]
# lst[:-n] gets everything except last n: [1, 2, 3]
# Concatenate: [4, 5, 1, 2, 3]
```
</details>

---

🎉 **Congratulations!** You've mastered Python Lists. Keep practicing with real-world problems to strengthen your skills!