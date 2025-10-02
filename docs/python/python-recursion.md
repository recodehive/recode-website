---
id: python-recursion
title: Recursion in Python
sidebar_label: Recursion in Python
sidebar_position: 12
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
    Tuple in Python
  ]
  
---

# Recursion in Python

**Recursion** is a programming technique where a function calls itself directly or indirectly to solve a problem.  
It is often used to break down complex problems into smaller, simpler sub-problems.

---

## Basic Structure of Recursion

Every recursive function has two main parts:

1. **Base Case** → Stops the recursion (prevents infinite calls).  
2. **Recursive Case** → Function calls itself with modified input.

**Example:**
```python
def countdown(n):
    if n == 0:   # Base case
        print("Time's up!")
    else:        # Recursive case
        print(n)
        countdown(n-1)

countdown(5)
```

```python
Output:
# 5
# 4
# 3
# 2
# 1
# Time's up!
````

## Factorial using Recursion

Factorial of `n` → `n! = n × (n-1) × (n-2) × ... × 1`

```python
def factorial(n):
    if n == 0 or n == 1:  # Base case
        return 1
    else:                 # Recursive case
        return n * factorial(n-1)

print(factorial(5))  # Output: 120
```

## Fibonacci Series using Recursion

Fibonacci sequence → 0, 1, 1, 2, 3, 5, 8, ...

```python
def fibonacci(n):
    if n <= 1:   # Base case
        return n
    else:        # Recursive case
        return fibonacci(n-1) + fibonacci(n-2)

for i in range(7):
    print(fibonacci(i), end=" ")
# Output: 0 1 1 2 3 5 8
```


## Recursion vs Iteration

* **Iteration (loops):** Uses `for` or `while` loops.
* **Recursion:** Function calls itself.

**Example: Sum of first n numbers**

Recursive:

```python
def sum_recursive(n):
    if n == 0:
        return 0
    return n + sum_recursive(n-1)

print(sum_recursive(5))  # Output: 15
```

Iterative:

```python
def sum_iterative(n):
    total = 0
    for i in range(1, n+1):
        total += i
    return total

print(sum_iterative(5))  # Output: 15
```


## Advantages of Recursion

 Makes code **shorter and cleaner**
 Useful for problems naturally defined recursively (factorial, Fibonacci, tree traversal, divide and conquer algorithms)


## Disadvantages of Recursion

 **Slower execution** than iteration (due to repeated function calls)
 **Memory usage is high** (function calls are stored in the call stack)
 Risk of **stack overflow error** if base case is missing


## Tail Recursion in Python

Tail recursion is when the **recursive call is the last statement** in the function.
Unlike some languages, Python **does not optimize tail recursion**, so deep recursion may cause errors.

```python
def tail_sum(n, accumulator=0):
    if n == 0:
        return accumulator
    return tail_sum(n-1, accumulator+n)

print(tail_sum(5))  # Output: 15
```


## Practical Example: Binary Search (Recursive)

```python
def binary_search(arr, target, low, high):
    if low > high:
        return -1   # Not found

    mid = (low + high) // 2

    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search(arr, target, mid+1, high)
    else:
        return binary_search(arr, target, low, mid-1)

nums = [1, 3, 5, 7, 9, 11]
print(binary_search(nums, 7, 0, len(nums)-1))  # Output: 3
```

## Conclusion

* Recursion is a function calling itself to solve smaller sub-problems.
* Every recursive function must have a **base case** to avoid infinite calls.
* Useful for problems like factorial, Fibonacci, searching, sorting, and tree/graph traversal.
* While recursion makes code elegant, it may be slower and consume more memory than iteration.