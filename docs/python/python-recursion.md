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
```

---

## 🎯 Quiz 1: Recursion Basics

**Question 1:** What happens if a recursive function doesn't have a base case?
<details>
<summary>Show Answer</summary>

**Infinite recursion** occurs, leading to a **RecursionError** (stack overflow).

```python
def infinite_recursion(n):
    print(n)
    infinite_recursion(n + 1)  # No base case!

infinite_recursion(1)
# Output: RecursionError: maximum recursion depth exceeded
```

**Python's default recursion limit:** ~1000 calls

**Check the limit:**
```python
import sys
print(sys.getrecursionlimit())  # Usually 1000
```

**Always include a base case to stop recursion!**
</details>

**Question 2:** Identify the base case and recursive case:
```python
def power(base, exp):
    if exp == 0:
        return 1
    return base * power(base, exp - 1)
```
<details>
<summary>Show Answer</summary>

**Base Case:** `if exp == 0: return 1`
- Stops recursion when exponent reaches 0
- Any number to the power of 0 is 1

**Recursive Case:** `return base * power(base, exp - 1)`
- Multiplies base by the result of the same function with exp-1
- Gradually reduces the problem size

**Example trace for `power(2, 3)`:**
```
power(2, 3) → 2 * power(2, 2)
            → 2 * (2 * power(2, 1))
            → 2 * (2 * (2 * power(2, 0)))
            → 2 * (2 * (2 * 1))
            → 2 * (2 * 2)
            → 2 * 4
            → 8
```
</details>

**Question 3:** What will be the output?
```python
def mystery(n):
    if n <= 0:
        return
    mystery(n - 1)
    print(n, end=" ")

mystery(4)
```
<details>
<summary>Show Answer</summary>

**Output:** `1 2 3 4`

**Explanation:** The print statement comes **after** the recursive call, so:
1. `mystery(4)` calls `mystery(3)` before printing
2. `mystery(3)` calls `mystery(2)` before printing
3. `mystery(2)` calls `mystery(1)` before printing
4. `mystery(1)` calls `mystery(0)` before printing
5. `mystery(0)` hits base case, returns
6. Now prints happen in reverse order: 1, 2, 3, 4

**If print was BEFORE the recursive call:**
```python
def mystery(n):
    if n <= 0:
        return
    print(n, end=" ")  # Print first
    mystery(n - 1)

mystery(4)  # Output: 4 3 2 1
```
</details>

---

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

---

## 🎯 Quiz 2: Factorial and Fibonacci

**Question 1:** Trace the execution of `factorial(4)`. How many function calls are made?
<details>
<summary>Show Answer</summary>

**Execution trace:**
```
factorial(4) → 4 * factorial(3)
             → 4 * (3 * factorial(2))
             → 4 * (3 * (2 * factorial(1)))
             → 4 * (3 * (2 * 1))
             → 4 * (3 * 2)
             → 4 * 6
             → 24
```

**Total function calls:** 4
- `factorial(4)`
- `factorial(3)`
- `factorial(2)`
- `factorial(1)` (base case)

**Pattern:** For `factorial(n)`, there are `n` function calls.
</details>

**Question 2:** Why is the recursive Fibonacci function inefficient?
<details>
<summary>Show Answer</summary>

**Problem: Redundant calculations!**

For `fibonacci(5)`:
```
                    fib(5)
                   /      \
              fib(4)      fib(3)
             /     \      /     \
        fib(3)   fib(2) fib(2) fib(1)
        /   \    /   \   /   \
    fib(2) fib(1) ...
```

**Notice:** `fib(3)` is calculated twice, `fib(2)` is calculated three times!

**Time Complexity:** O(2^n) - exponential!

**Solution: Use memoization or iteration**
```python
# Memoization
def fib_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib_memo(n-1, memo) + fib_memo(n-2, memo)
    return memo[n]

# Iterative (most efficient)
def fib_iterative(n):
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b
```
</details>

**Question 3:** Write a recursive function to calculate the sum of digits of a number.
<details>
<summary>Show Answer</summary>

```python
def sum_of_digits(n):
    """Calculate sum of digits recursively."""
    # Base case
    if n == 0:
        return 0
    
    # Recursive case
    return (n % 10) + sum_of_digits(n // 10)

# Tests
print(sum_of_digits(123))   # 1 + 2 + 3 = 6
print(sum_of_digits(4567))  # 4 + 5 + 6 + 7 = 22
print(sum_of_digits(0))     # 0
```

**How it works:**
```
sum_of_digits(123)
→ 3 + sum_of_digits(12)
→ 3 + (2 + sum_of_digits(1))
→ 3 + (2 + (1 + sum_of_digits(0)))
→ 3 + (2 + (1 + 0))
→ 6
```

**Explanation:**
- `n % 10` gets the last digit
- `n // 10` removes the last digit
- Recursively sum remaining digits
</details>

---

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

---

## 🎯 Quiz 3: Recursion vs Iteration

**Question 1:** When should you choose recursion over iteration?
<details>
<summary>Show Answer</summary>

**Use Recursion when:**
1. **Problem naturally recursive** (tree traversal, fractals)
2. **Code clarity is priority** (cleaner, more readable)
3. **Divide and conquer approach** (merge sort, quick sort)
4. **Backtracking problems** (N-queens, maze solving)

**Use Iteration when:**
1. **Performance is critical** (faster execution)
2. **Memory is limited** (less stack usage)
3. **Simple sequential processing** (counting, summing)

**Examples:**

**Better with Recursion:**
```python
# Tree traversal
def traverse_tree(node):
    if node is None:
        return
    print(node.value)
    traverse_tree(node.left)
    traverse_tree(node.right)
```

**Better with Iteration:**
```python
# Simple counting
def count_to_n(n):
    for i in range(1, n + 1):
        print(i)
```
</details>

**Question 2:** Compare the space complexity of recursive vs iterative sum:
<details>
<summary>Show Answer</summary>

**Recursive:**
```python
def sum_recursive(n):
    if n == 0:
        return 0
    return n + sum_recursive(n-1)
```
- **Space Complexity:** O(n)
- Each call adds a frame to the call stack
- For `sum_recursive(1000)`, 1000 stack frames are created

**Iterative:**
```python
def sum_iterative(n):
    total = 0
    for i in range(1, n+1):
        total += i
    return total
```
- **Space Complexity:** O(1)
- Only uses a single variable `total`
- No stack frames accumulated

**Impact:**
- Recursive uses more memory
- May cause stack overflow for large n
- Iterative is more memory-efficient

**Check stack usage:**
```python
import sys
print(sys.getrecursionlimit())  # Default: ~1000
# sum_recursive(10000) would fail!
```
</details>

**Question 3:** Convert this iterative function to recursive:
```python
def reverse_string_iterative(s):
    result = ""
    for char in s:
        result = char + result
    return result
```
<details>
<summary>Show Answer</summary>

**Recursive version:**
```python
def reverse_string_recursive(s):
    # Base case: empty or single character
    if len(s) <= 1:
        return s
    
    # Recursive case: first char goes to end
    return reverse_string_recursive(s[1:]) + s[0]

# Test
print(reverse_string_recursive("hello"))  # olleh
```

**How it works:**
```
reverse_string("hello")
→ reverse_string("ello") + "h"
→ (reverse_string("llo") + "e") + "h"
→ ((reverse_string("lo") + "l") + "e") + "h"
→ (((reverse_string("o") + "l") + "l") + "e") + "h"
→ ((("o" + "l") + "l") + "e") + "h"
→ "olleh"
```

**Alternative (using slicing):**
```python
def reverse_string(s):
    if not s:
        return s
    return s[-1] + reverse_string(s[:-1])
```
</details>

---

## Advantages of Recursion

✓ Makes code **shorter and cleaner**
✓ Useful for problems naturally defined recursively (factorial, Fibonacci, tree traversal, divide and conquer algorithms)


## Disadvantages of Recursion

✗ **Slower execution** than iteration (due to repeated function calls)
✗ **Memory usage is high** (function calls are stored in the call stack)
✗ Risk of **stack overflow error** if base case is missing

---

## 🎯 Quiz 4: Advantages and Disadvantages

**Question 1:** Why is recursion slower than iteration?
<details>
<summary>Show Answer</summary>

**Recursion is slower because of:**

1. **Function call overhead**
   - Each call pushes a new frame onto the stack
   - Saves parameters, local variables, return address
   - Context switching takes time

2. **Stack operations**
   - Push and pop operations for each call
   - More memory access = slower

3. **Parameter passing**
   - Arguments copied for each call

**Comparison:**
```python
import time

# Recursive
def fib_recursive(n):
    if n <= 1:
        return n
    return fib_recursive(n-1) + fib_recursive(n-2)

# Iterative
def fib_iterative(n):
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

# Time comparison
start = time.time()
fib_recursive(30)
print(f"Recursive: {time.time() - start:.4f}s")

start = time.time()
fib_iterative(30)
print(f"Iterative: {time.time() - start:.4f}s")

# Recursive: ~0.3s
# Iterative: ~0.0001s
```

**Iterative is 1000x faster for Fibonacci!**
</details>

**Question 2:** What is a stack overflow error and how do you prevent it?
<details>
<summary>Show Answer</summary>

**Stack Overflow Error:**
- Occurs when the call stack exceeds its maximum size
- In Python: `RecursionError: maximum recursion depth exceeded`

**Causes:**
1. Missing or incorrect base case
2. Recursion too deep (even with correct base case)

**Prevention:**

**1. Ensure correct base case:**
```python
def countdown(n):
    if n <= 0:  # Base case
        return
    print(n)
    countdown(n - 1)
```

**2. Increase recursion limit (use cautiously):**
```python
import sys
sys.setrecursionlimit(10000)  # Increase limit
```

**3. Convert to iteration:**
```python
# Instead of deep recursion
def sum_recursive(n):
    if n == 0:
        return 0
    return n + sum_recursive(n-1)

# Use iteration
def sum_iterative(n):
    return sum(range(n + 1))
```

**4. Use tail recursion with trampoline (advanced):**
```python
def trampoline(f):
    def trampolined(*args):
        result = f(*args)
        while callable(result):
            result = result()
        return result
    return trampolined
```
</details>

**Question 3:** Can recursion use less memory than iteration? When?
<details>
<summary>Show Answer</summary>

**Generally, NO** - recursion uses more memory due to stack frames.

**However, in languages with tail call optimization** (not Python), tail-recursive functions can use O(1) space.

**Python doesn't optimize tail recursion, so iteration is always more memory-efficient for simple problems.**

**But recursion can be clearer for complex data structures:**

```python
# Binary tree - recursion is natural
class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def tree_sum_recursive(node):
    if node is None:
        return 0
    return node.value + tree_sum_recursive(node.left) + tree_sum_recursive(node.right)

# Iterative equivalent is much more complex
def tree_sum_iterative(root):
    if not root:
        return 0
    stack = [root]
    total = 0
    while stack:
        node = stack.pop()
        total += node.value
        if node.right:
            stack.append(node.right)
        if node.left:
            stack.append(node.left)
    return total
```

**Verdict:** For simple problems, use iteration. For complex tree/graph structures, recursion's clarity often outweighs the memory cost.
</details>

---

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

---

## 🎯 Quiz 5: Advanced Recursion

**Question 1:** Trace the execution of binary search for finding 7 in `[1, 3, 5, 7, 9, 11]`:
<details>
<summary>Show Answer</summary>

**Array:** `[1, 3, 5, 7, 9, 11]` (indices 0-5)
**Target:** 7

**Call 1:** `binary_search(arr, 7, 0, 5)`
- mid = (0 + 5) // 2 = 2
- arr[2] = 5
- 5 < 7, search right half

**Call 2:** `binary_search(arr, 7, 3, 5)`
- mid = (3 + 5) // 2 = 4
- arr[4] = 9
- 9 > 7, search left half

**Call 3:** `binary_search(arr, 7, 3, 3)`
- mid = (3 + 3) // 2 = 3
- arr[3] = 7
- Found! Return 3

**Total calls:** 3
**Time complexity:** O(log n)
</details>

**Question 2:** Write a recursive function to calculate GCD (Greatest Common Divisor) using Euclidean algorithm.
<details>
<summary>Show Answer</summary>

```python
def gcd(a, b):
    """
    Calculate GCD using Euclidean algorithm.
    gcd(a, b) = gcd(b, a % b)
    """
    # Base case
    if b == 0:
        return a
    
    # Recursive case
    return gcd(b, a % b)

# Tests
print(gcd(48, 18))   # 6
print(gcd(100, 35))  # 5
print(gcd(17, 13))   # 1
```

**How it works for gcd(48, 18):**
```
gcd(48, 18) → gcd(18, 48 % 18) → gcd(18, 12)
            → gcd(12, 18 % 12) → gcd(12, 6)
            → gcd(6, 12 % 6)   → gcd(6, 0)
            → 6 (base case)
```

**Why it works:** The GCD of two numbers also divides their remainder.
</details>

**Question 3:** Implement a recursive function to check if a string is a palindrome.
<details>
<summary>Show Answer</summary>

```python
def is_palindrome(s):
    """Check if string is palindrome recursively."""
    # Base cases
    if len(s) <= 1:
        return True
    
    # Check first and last characters
    if s[0] != s[-1]:
        return False
    
    # Recursive case: check middle portion
    return is_palindrome(s[1:-1])

# Tests
print(is_palindrome("radar"))      # True
print(is_palindrome("hello"))      # False
print(is_palindrome("a"))          # True
print(is_palindrome("racecar"))    # True
print(is_palindrome(""))           # True
```

**How it works for "radar":**
```
is_palindrome("radar")
→ 'r' == 'r'? Yes → is_palindrome("ada")
              → 'a' == 'a'? Yes → is_palindrome("d")
                            → len <= 1? True
```

**Iterative comparison:**
```python
def is_palindrome_iterative(s):
    return s == s[::-1]  # Simpler!
```
</details>

---

## Conclusion

* Recursion is a function calling itself to solve smaller sub-problems.
* Every recursive function must have a **base case** to avoid infinite calls.
* Useful for problems like factorial, Fibonacci, searching, sorting, and tree/graph traversal.
* While recursion makes code elegant, it may be slower and consume more memory than iteration.

---

## 🎯 Final Quiz: Comprehensive Recursion Challenge

**Question 1:** What will be the output?
```python
def mystery(n):
    if n == 0:
        return 0
    return n + mystery(n - 2)

print(mystery(7))
```
<details>
<summary>Show Answer</summary>

**Output:** `16`

**Trace:**
```
mystery(7) → 7 + mystery(5)
           → 7 + (5 + mystery(3))
           → 7 + (5 + (3 + mystery(1)))
           → 7 + (5 + (3 + (1 + mystery(-1))))
           → 7 + (5 + (3 + (1 + (-1 + mystery(-3)))))
           ...
```

**Wait!** This continues forever because the base case `n == 0` is never reached when starting with odd numbers!

**Fixed version:**
```python
def mystery(n):
    if n <= 0:  # Better base case
        return 0
    return n + mystery(n - 2)

print(mystery(7))  # 7 + 5 + 3 + 1 = 16
```
</details>

**Question 2:** Implement a recursive function to flatten a nested list.
```python
# Example: [[1, 2], [3, [4, 5]], 6] → [1, 2, 3, 4, 5, 6]
```
<details>
<summary>Show Answer</summary>

```python
def flatten(nested_list):
    """Recursively flatten a nested list."""
    result = []
    
    for item in nested_list:
        if isinstance(item, list):
            # Recursive case: flatten sublists
            result.extend(flatten(item))
        else:
            # Base case: add non-list items
            result.append(item)
    
    return result

# Tests
print(flatten([1, 2, 3]))
# [1, 2, 3]

print(flatten([[1, 2], [3, 4]]))
# [1, 2, 3, 4]

print(flatten([[1, 2], [3, [4, 5]], 6]))
# [1, 2, 3, 4, 5, 6]

print(flatten([[[1]], [2, [3, [4]]]]))
# [1, 2, 3, 4]
```

**Alternative using list comprehension:**
```python
def flatten(nested_list):
    return [
        item
        for sublist in nested_list
        for item in (flatten(sublist) if isinstance(sublist, list) else [sublist])
    ]
```
</details>

**Question 3:** Write a recursive function to generate all permutations of a string.
<details>
<summary>Show Answer</summary>

```python
def permutations(s):
    """Generate all permutations of a string."""
    # Base case: single character
    if len(s) <= 1:
        return [s]
    
    result = []
    
    # For each character
    for i, char in enumerate(s):
        # Remove current character
        remaining = s[:i] + s[i+1:]
        
        # Get permutations of remaining characters
        for perm in permutations(remaining):
            # Add current character to front
            result.append(char + perm)
    
    return result

# Tests
print(permutations("abc"))
# ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']

print(permutations("ab"))
# ['ab', 'ba']

print(len(permutations("abcd")))
# 24 (4! = 4 × 3 × 2 × 1)
```

**How it works for "abc":**
1. Fix 'a': permutations of "bc" → ['bc', 'cb'] → ['abc', 'acb']
2. Fix 'b': permutations of "ac" → ['ac', 'ca'] → ['bac', 'bca']
3. Fix 'c': permutations of "ab" → ['ab', 'ba'] → ['cab', 'cba']
</details>

**Question 4:** Optimize this recursive Fibonacci with memoization:
```python
def fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)
```
<details>
<summary>Show Answer</summary>

**Method 1: Using dictionary:**
```python
def fib_memo(n, memo={}):
    if n in memo:
        return memo[n]
    
    if n <= 1:
        return n
    
    memo[n] = fib_memo(n-1, memo) + fib_memo(n-2, memo)
    return memo[n]

print(fib_memo(100))  # Works instantly!
```

**Method 2: Using decorator (more elegant):**
```python
from functools import lru_cache

@lru_cache(maxsize=None)
def fib_cached(n):
    if n <= 1:
        return n
    return fib_cached(n-1) + fib_cached(n-2)

print(fib_cached(100))
```

**Performance comparison:**
```python
# Without memoization
fib(30)      # Takes ~0.3 seconds, makes 2,692,537 calls

# With memoization
fib_memo(30) # Takes ~0.0001 seconds, makes 31 calls
fib_memo(100) # Instant! (would be impossible without memoization)
```

**Time Complexity:**
- Original: O(2^n) - exponential
- Memoized: O(n) - linear
</details>

**Question 5:** Implement the Tower of Hanoi problem recursively.
<details>
<summary>Show Answer</summary>

```python
def tower_of_hanoi(n, source, destination, auxiliary):
    """
    Move n disks from source to destination using auxiliary rod.
    
    Rules:
    1. Only one disk can be moved at a time
    2. A larger disk cannot be placed on a smaller disk
    3. All disks start on the source rod
    """
    # Base case: move single disk
    if n == 1:
        print(f"Move disk 1 from {source} to {destination}")
        return
    
    # Move n-1 disks from source to auxiliary (using destination)
    tower_of_hanoi(n-1, source, auxiliary, destination)
    
    # Move the largest disk from source to destination
    print(f"Move disk {n} from {source} to {destination}")
    
    # Move n-1 disks from auxiliary to destination (using source)
    tower_of_hanoi(n-1, auxiliary, destination, source)

# Test with 3 disks
print("Tower of Hanoi with 3 disks:")
tower_of_hanoi(3, 'A', 'C', 'B')
```

**Output:**
```
Move disk 1 from A to C
Move disk 2 from A to B
Move disk 1 from C to B
Move disk 3 from A to C
Move disk 1 from B to A
Move disk 2 from B to C
Move disk 1 from A to C
```

**Number of moves:** 2^n - 1
- 3 disks: 7 moves
- 4 disks: 15 moves
- 64 disks: 18,446,744,073,709,551,615 moves (legend of Tower of Hanoi)

**Visualization for 3 disks:**
```
Initial:     Step 1:      Step 2:      Final:
  |            |            |            |
 -|-          -|-           |           -|-
--|--          |           -|-         --|--
----|--        |          --|--       ----|--
  A            A            B            C
```
</details>

---

🎉 **Congratulations!** You've mastered Recursion in Python. Practice with tree traversals, backtracking, and divide-and-conquer algorithms to become a recursion expert!