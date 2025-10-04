---
id: python-array
title: Array in Python
sidebar_label: Array in Python #displays in sidebar
sidebar_position: 9
tags:
  [
    Python,
    Array in Python,
    Introduction of python,
    Python Syntax,
    Variables,
    Operators,
    Type Casting,
    String
  ]

---

# Python Arrays

An **Array** in Python is a data structure that stores multiple elements of the **same data type** in contiguous memory locations.  
Arrays are **ordered**, **mutable**, and **type-restricted**, making them more memory-efficient than lists for large numeric data.

In Python, arrays are provided by the built-in **`array`** module, which must be imported before use.

---

## Creating an Array

You create an array using the `array()` constructor from the `array` module.

```python
import array

# Empty array of integers
empty_array = array.array('i', [])

# Array of Integers
numbers = array.array('i', [1, 2, 3, 4, 5])

# Array of Floats
floats = array.array('f', [1.1, 2.2, 3.3])

print(numbers)  # array('i', [1, 2, 3, 4, 5])
```

---

## Type Codes

Arrays in Python require a **type code** to specify the element type:

| Type Code | C Type          | Python Type | Size (bytes) |
| --------- | --------------- | ----------- | ------------ |
| `'i'`     | signed int      | int         | 2 or 4       |
| `'I'`     | unsigned int    | int         | 2 or 4       |
| `'f'`     | float           | float       | 4            |
| `'d'`     | double          | float       | 8            |
| `'b'`     | signed char     | int         | 1            |
| `'B'`     | unsigned char   | int         | 1            |
| `'u'`     | Py_UNICODE      | Unicode     | 2            |

---

### 🧠 Quiz 1: Array Basics

**Question 1:** What is the main difference between Python arrays and lists?

<details>
<summary>Click to reveal answer</summary>

**Answer:** Arrays store elements of the same data type and are more memory-efficient, while lists can store mixed data types

**Explanation:** Arrays are type-restricted (e.g., all integers or all floats), making them faster and more memory-efficient for numerical operations. Lists can contain mixed types like `[1, "hello", 3.14, True]`.
</details>

**Question 2:** What must you do before using arrays in Python?

<details>
<summary>Click to reveal answer</summary>

**Answer:** Import the `array` module using `import array`

**Explanation:** Unlike lists which are built-in, arrays require importing the array module first: `import array` before you can use `array.array()`.
</details>

**Question 3:** Which type code would you use to create an array of floating-point numbers?

<details>
<summary>Click to reveal answer</summary>

**Answer:** `'f'` for float or `'d'` for double

**Explanation:** 
- `'f'` creates a float array (4 bytes): `array.array('f', [1.1, 2.2])`
- `'d'` creates a double array (8 bytes, more precision): `array.array('d', [1.1, 2.2])`
</details>

**Question 4:** What will happen if you try to create this array?
```python
mixed = array.array('i', [1, 2, 3.5, 4])
```

<details>
<summary>Click to reveal answer</summary>

**Answer:** It will raise a `TypeError`

**Explanation:** The type code `'i'` specifies integers only. Trying to add a float (3.5) to an integer array will cause an error. Arrays enforce type consistency.
</details>

---

## Indexing

Just like lists, arrays use **zero-based indexing**.

```python
nums = array.array('i', [10, 20, 30, 40, 50])

print(nums[0])   # 10
print(nums[2])   # 30
print(nums[-1])  # 50
```

---

## Slicing

You can slice arrays to get sub-arrays.

```python
print(nums[1:4])   # array('i', [20, 30, 40])
print(nums[:3])    # array('i', [10, 20, 30])
print(nums[::2])   # array('i', [10, 30, 50])
```

**Syntax:**

```
array[start:stop:step]
```

---

## Modifying Elements

Arrays are **mutable**, so you can change elements:

```python
nums[1] = 99
print(nums)  # array('i', [10, 99, 30, 40, 50])
```

---

### 🧠 Quiz 2: Indexing and Slicing

**Question 1:** Given `arr = array.array('i', [5, 10, 15, 20, 25])`, what is `arr[-2]`?

<details>
<summary>Click to reveal answer</summary>

**Answer:** `20`

**Explanation:** Negative indexing counts from the end. `-1` is the last element (25), `-2` is the second-to-last element (20).
</details>

**Question 2:** What will `arr[1:4]` return from the array `[5, 10, 15, 20, 25]`?

<details>
<summary>Click to reveal answer</summary>

**Answer:** `array('i', [10, 15, 20])`

**Explanation:** Slicing `[1:4]` takes elements from index 1 up to (but not including) index 4. So it includes indices 1, 2, and 3, which are 10, 15, and 20.
</details>

**Question 3:** What does `arr[::2]` do?

<details>
<summary>Click to reveal answer</summary>

**Answer:** Returns every second element (elements at even indices)

**Explanation:** The syntax `[start:stop:step]` with step=2 takes every second element. From `[5, 10, 15, 20, 25]`, it returns `[5, 15, 25]`.
</details>

---

## Array Methods

Python's `array` module provides several useful methods:

| Method             | Description                                           |
| ------------------ | ----------------------------------------------------- |
| `append(x)`        | Adds an element to the end                            |
| `insert(i, x)`     | Inserts an element at index `i`                       |
| `extend(iterable)` | Adds elements from another iterable                   |
| `remove(x)`        | Removes the first occurrence of the item              |
| `pop([i])`         | Removes and returns the item at index `i`             |
| `index(x)`         | Returns the index of the first occurrence of the item |
| `count(x)`         | Counts how many times the item appears                |
| `reverse()`        | Reverses the array                                    |
| `buffer_info()`    | Returns a tuple (memory address, length)              |
| `tobytes()`        | Converts the array to a bytes object                  |
| `frombytes(b)`     | Appends items from a bytes object                     |

---

### Examples

#### append()

```python
nums = array.array('i', [1, 2, 3])
nums.append(4)
print(nums)  # array('i', [1, 2, 3, 4])
```

#### insert()

```python
nums.insert(1, 100)
print(nums)  # array('i', [1, 100, 2, 3, 4])
```

#### extend()

```python
nums.extend([5, 6])
print(nums)  # array('i', [1, 100, 2, 3, 4, 5, 6])
```

#### remove() and pop()

```python
nums.remove(100)
print(nums)  # array('i', [1, 2, 3, 4, 5, 6])

nums.pop()   # Removes last element
print(nums)  # array('i', [1, 2, 3, 4, 5])

nums.pop(2)  # Removes index 2
print(nums)  # array('i', [1, 2, 4, 5])
```

---

### 🧠 Quiz 3: Array Methods

**Question 1:** What's the difference between `append()` and `extend()`?

<details>
<summary>Click to reveal answer</summary>

**Answer:** `append()` adds a single element, `extend()` adds multiple elements from an iterable

**Explanation:**
```python
arr = array.array('i', [1, 2])
arr.append(3)      # [1, 2, 3]
arr.extend([4, 5]) # [1, 2, 3, 4, 5]
```
</details>

**Question 2:** What will be the result?
```python
arr = array.array('i', [10, 20, 30, 20, 40])
arr.remove(20)
print(arr)
```

<details>
<summary>Click to reveal answer</summary>

**Answer:** `array('i', [10, 30, 20, 40])`

**Explanation:** `remove()` only removes the FIRST occurrence of the value. The second 20 remains in the array.
</details>

**Question 3:** What does `pop()` return when called without an argument?

<details>
<summary>Click to reveal answer</summary>

**Answer:** It removes and returns the last element of the array

**Explanation:** `pop()` without an index removes and returns the last element. `pop(i)` removes and returns the element at index `i`.
</details>

**Question 4:** Given `arr = array.array('i', [5, 10, 15, 10, 20])`, what will `arr.count(10)` return?

<details>
<summary>Click to reveal answer</summary>

**Answer:** `2`

**Explanation:** The `count()` method returns how many times the value appears in the array. The number 10 appears twice.
</details>

---

## Iterating Through an Array

**Using a for loop:**

```python
for num in nums:
    print(num)
```

**Using indices:**

```python
for i in range(len(nums)):
    print(i, nums[i])
```

---

## Membership Test

Check if an element exists in an array:

```python
print(10 in nums)     # True or False
print(100 not in nums) # True or False
```

---

## Array from List

```python
list_data = [1, 2, 3, 4]
arr = array.array('i', list_data)
print(arr)
```

---

## Copying Arrays

Assigning directly creates a reference:

```python
a = array.array('i', [1, 2, 3])
b = a
b.append(4)
print(a)  # array('i', [1, 2, 3, 4])
```

To make an independent copy:

```python
c = array.array(a.typecode, a)
c.append(5)

print(a)  # array('i', [1, 2, 3, 4])
print(c)  # array('i', [1, 2, 3, 4, 5])
```

---

### 🧠 Quiz 4: Array Operations

**Question 1:** What will be printed?
```python
arr = array.array('i', [1, 2, 3])
arr2 = arr
arr2.append(4)
print(arr)
```

<details>
<summary>Click to reveal answer</summary>

**Answer:** `array('i', [1, 2, 3, 4])`

**Explanation:** When you do `arr2 = arr`, both variables point to the same array in memory. Modifying `arr2` also modifies `arr`. This is called a shallow copy or reference.
</details>

**Question 2:** How do you create an independent copy of an array?

<details>
<summary>Click to reveal answer</summary>

**Answer:** Use `array.array(original.typecode, original)`

**Explanation:**
```python
original = array.array('i', [1, 2, 3])
copy = array.array(original.typecode, original)
```
This creates a new array with the same type code and values, but in a different memory location.
</details>

**Question 3:** What will this code output?
```python
arr = array.array('i', [10, 20, 30])
for i, val in enumerate(arr):
    print(f"Index {i}: {val}")
```

<details>
<summary>Click to reveal answer</summary>

**Answer:**
```
Index 0: 10
Index 1: 20
Index 2: 30
```

**Explanation:** `enumerate()` returns both the index and value during iteration, allowing you to access both at the same time.
</details>

**Question 4:** What does the membership test `5 in arr` return for `arr = array.array('i', [1, 2, 3, 4])`?

<details>
<summary>Click to reveal answer</summary>

**Answer:** `False`

**Explanation:** The `in` operator checks if a value exists in the array. Since 5 is not in the array `[1, 2, 3, 4]`, it returns `False`.
</details>

---

### **Practice Questions**

1. **Basic Traversal**

    **Q1**: Write a Python program to traverse an array and print each element on a new line.

2. **Maximum Element**

    **Q2:** Write a Python program to find the maximum and minimum elements in an array without using built-in functions.

3. **Array Reversal**

   **Q3:**** Write a Python program to reverse an array without using slicing or the reverse() method.
  

4. **Insertion Operation**
   
   **Q4:** Write a Python program to insert an element at a specific index in an array.


5. **Deletion Operation**

    **Q5:** Write a Python program to delete an element from a given index in an array.

6. **Search Element**

   **Q6:** Write a Python program to search for a given element in an array and print its index if found, otherwise print "Not Found".

7. **Sum of Elements**

   **Q7:** Write a Python program to find the sum of all elements in an array without using the sum() function.

8. **Second Largest Element**

    **Q8:** Write a Python program to find the second largest element in an array.

---

### 🧠 Quiz 5: Problem-Solving Challenge

**Question 1:** How would you find the maximum element in an array without using `max()`?

<details>
<summary>Click to reveal answer</summary>

**Answer:**
```python
arr = array.array('i', [5, 2, 9, 1, 7])
max_val = arr[0]
for num in arr:
    if num > max_val:
        max_val = num
print(max_val)  # 9
```

**Explanation:** Start with the first element as the maximum, then iterate through the array comparing each element. Update max_val whenever you find a larger number.
</details>

**Question 2:** What's an efficient way to reverse an array in-place?

<details>
<summary>Click to reveal answer</summary>

**Answer:** Use the `reverse()` method: `arr.reverse()`, or swap elements from both ends:
```python
left, right = 0, len(arr) - 1
while left < right:
    arr[left], arr[right] = arr[right], arr[left]
    left += 1
    right -= 1
```

**Explanation:** The `reverse()` method is simplest. The manual approach swaps elements from opposite ends moving toward the center.
</details>

**Question 3:** How would you remove all occurrences of a specific value from an array?

<details>
<summary>Click to reveal answer</summary>

**Answer:**
```python
value_to_remove = 20
while value_to_remove in arr:
    arr.remove(value_to_remove)
```

**Explanation:** Since `remove()` only removes the first occurrence, you need a loop to remove all occurrences. The loop continues as long as the value exists in the array.
</details>

**Question 4:** What's the time complexity of searching for an element in an unsorted array?

<details>
<summary>Click to reveal answer</summary>

**Answer:** O(n) - Linear time

**Explanation:** In the worst case, you might need to check every element in the array to find the target or determine it's not there. This requires n comparisons for an array of length n.
</details>

**Question 5:** Why might you choose an array over a list in Python?

<details>
<summary>Click to reveal answer</summary>

**Answer:** Arrays are more memory-efficient and faster for large amounts of numeric data of the same type

**Explanation:** Arrays:
- Store elements more compactly in memory
- Provide faster operations for numerical computations
- Are ideal for working with large datasets of homogeneous data
- Interface well with libraries like NumPy for scientific computing

Lists are better when you need mixed data types or more flexibility.
</details>

---

## Conclusion

Python Arrays are useful when you need to store large amounts of **numeric data** of the same type efficiently.  
They provide faster performance and smaller memory footprint compared to lists for numerical operations.