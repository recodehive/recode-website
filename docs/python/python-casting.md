---
id: python-casting
title: Type Casting
sidebar_label: Type Casting #displays in sidebar
sidebar_position: 6
tags:
  [
    Python,
    Introduction of python,
    Python Syntax,
    Python Variables,
    Python Operators,
    Type Casting,

  ]

---

# Python Casting

In Python, **casting** is the process of converting a variable from one type to another. Python has built-in functions for converting between data types.

---

### Specify a Variable Type

Python is an **object-oriented language**, and **variables are objects**.  
You can specify the data type using casting functions:

```python
x = int(1)     # x will be 1
y = int(2.8)   # y will be 2
z = int("3")   # z will be 3
```

---

### 🧠 Quiz 1: Casting Basics

**Question 1:** What is type casting in Python?

<details>
<summary>Click to reveal answer</summary>

**Answer:** The process of converting a variable from one data type to another

**Explanation:** Type casting allows you to change data types explicitly. For example, converting a string "5" to an integer 5, or a float 3.14 to an integer 3.
</details>

**Question 2:** What will be the value and type of `x` after this code?
```python
x = int(7.9)
```

<details>
<summary>Click to reveal answer</summary>

**Answer:** Value: `7`, Type: `int`

**Explanation:** `int()` converts the float 7.9 to an integer by truncating (cutting off) the decimal part, not rounding. So 7.9 becomes 7.
</details>

**Question 3:** Is Python's type system static or dynamic?

<details>
<summary>Click to reveal answer</summary>

**Answer:** Dynamic

**Explanation:** Python is dynamically typed, meaning you don't need to declare variable types explicitly. The type is determined at runtime. However, you can use casting to explicitly convert types when needed.
</details>

---

###  `int()` - Integer Casting

Converts a value to an integer. Works with floats and numeric strings.

```python
x = int(1)      # 1
y = int(2.8)    # 2
z = int("3")    # 3
# w = int("abc")  # Error
```

---

### 🧠 Quiz 2: Integer Casting

**Question 1:** What will `int(9.9)` return?

<details>
<summary>Click to reveal answer</summary>

**Answer:** `9`

**Explanation:** `int()` truncates (removes) the decimal part, it doesn't round. So 9.9 becomes 9, not 10. This is different from the `round()` function which would give 10.
</details>

**Question 2:** Which of the following will cause an error?
- A) `int(5.5)`
- B) `int("42")`
- C) `int("3.14")`
- D) `int(100)`

<details>
<summary>Click to reveal answer</summary>

**Answer:** C) `int("3.14")`

**Explanation:** `int()` can convert numeric strings, but only if they represent whole numbers. "42" works, but "3.14" contains a decimal point and will raise a `ValueError`. You'd need to do `int(float("3.14"))` first.
</details>

**Question 3:** What is the result of `int(-7.8)`?

<details>
<summary>Click to reveal answer</summary>

**Answer:** `-7`

**Explanation:** For negative numbers, `int()` truncates toward zero. So -7.8 becomes -7 (not -8). The decimal part is simply removed.
</details>

---

### `float()` - Floating-Point Casting

Converts a value to a float. Works with integers and numeric strings.

```python
a = float(1)      # 1.0
b = float("2.5")  # 2.5
c = float(3.0)    # 3.0
```

---

### 🧠 Quiz 3: Float Casting

**Question 1:** What will `float("10")` return?

<details>
<summary>Click to reveal answer</summary>

**Answer:** `10.0`

**Explanation:** `float()` converts the string "10" to a floating-point number 10.0. Even though the input doesn't have a decimal, the output will be a float type.
</details>

**Question 2:** Which of these is a valid float conversion?
- A) `float("3.14")`
- B) `float("100")`
- C) `float(5)`
- D) All of the above

<details>
<summary>Click to reveal answer</summary>

**Answer:** D) All of the above

**Explanation:** `float()` is very flexible. It can convert:
- Float strings: `float("3.14")` → 10.0
- Integer strings: `float("100")` → 100.0
- Integers: `float(5)` → 5.0
</details>

**Question 3:** What happens when you do `float(int(3.9))`?

<details>
<summary>Click to reveal answer</summary>

**Answer:** `3.0`

**Explanation:** 
1. First, `int(3.9)` converts to `3` (truncates decimal)
2. Then, `float(3)` converts to `3.0`
The decimal part (.9) is lost in the first conversion and cannot be recovered.
</details>

---

###  `str()` - String Casting

Converts numbers or other types into a string.

```python
x = str("s1")   # 's1'
y = str(2)      # '2'
z = str(3.0)    # '3.0'
```

---

### 🧠 Quiz 4: String Casting

**Question 1:** What is the result of `str(100) + str(200)`?

<details>
<summary>Click to reveal answer</summary>

**Answer:** `"100200"` (string concatenation, not addition)

**Explanation:** When you convert numbers to strings and use `+`, it concatenates them as strings rather than adding them mathematically. So `"100" + "200"` = `"100200"`, not `300`.
</details>

**Question 2:** What will this code print?
```python
age = 25
message = "I am " + str(age) + " years old"
print(message)
```

<details>
<summary>Click to reveal answer</summary>

**Answer:** `I am 25 years old`

**Explanation:** You must convert the integer `age` to a string using `str()` before concatenating it with other strings. Without `str()`, you'd get a `TypeError`.
</details>

**Question 3:** What is `str(True)`?

<details>
<summary>Click to reveal answer</summary>

**Answer:** `"True"` (string)

**Explanation:** `str()` can convert boolean values to strings. `True` becomes the string `"True"` and `False` becomes `"False"`.
</details>

---

### Invalid Casting

Some values can't be casted directly:

```python
int("hello")     # ValueError
float("abc")     # ValueError
```

Use `try`/`except` to handle safely:

```python
value = "abc"
try:
    number = int(value)
except ValueError:
    print("Invalid conversion")
```

---

### Summary Table

| Function  | Converts to | Example Input | Output  |
| --------- | ----------- | ------------- | ------- |
| `int()`   | Integer     | `"3"`         | `3`     |
| `float()` | Float       | `"3.5"`       | `3.5`   |
| `str()`   | String      | `3.5`         | `"3.5"` |


### Quick Notes

* Use casting to convert types manually.
* Useful when handling user input, math, or data from files.
* Always validate input before casting to avoid errors.

---

### 🧠 Quiz 5: Error Handling and Practical Applications

**Question 1:** What error will `int("12.5")` raise?

<details>
<summary>Click to reveal answer</summary>

**Answer:** `ValueError`

**Explanation:** `int()` cannot directly convert strings containing decimal points. You must first convert to float: `int(float("12.5"))` which gives `12`.
</details>

**Question 2:** How can you safely convert user input to an integer?

<details>
<summary>Click to reveal answer</summary>

**Answer:** Use try/except block:
```python
try:
    num = int(input("Enter a number: "))
except ValueError:
    print("Invalid input!")
```

**Explanation:** User input can be anything, so wrapping the conversion in try/except prevents your program from crashing when users enter non-numeric data.
</details>

**Question 3:** What will this code output?
```python
x = "5"
y = "3"
result = int(x) + int(y)
print(result)
```

<details>
<summary>Click to reveal answer</summary>

**Answer:** `8`

**Explanation:** Both strings are converted to integers first (5 and 3), then mathematical addition is performed: 5 + 3 = 8. Without casting, `"5" + "3"` would give `"53"` (string concatenation).
</details>

**Question 4:** Which conversion will work without error?
- A) `int("Python")`
- B) `float("3.14.15")`
- C) `str(None)`
- D) `int("10.0")`

<details>
<summary>Click to reveal answer</summary>

**Answer:** C) `str(None)`

**Explanation:** 
- A) `int("Python")` - ValueError (non-numeric string)
- B) `float("3.14.15")` - ValueError (invalid format)
- C) `str(None)` - Works! Returns `"None"`
- D) `int("10.0")` - ValueError (decimal point in string)
</details>

**Question 5:** What's the output?
```python
price = 19.99
quantity = 3
total = str(price * quantity)
print("Total: $" + total)
```

<details>
<summary>Click to reveal answer</summary>

**Answer:** `Total: $59.97`

**Explanation:** 
1. `price * quantity` = 19.99 × 3 = 59.97 (float)
2. `str(59.97)` = `"59.97"` (string)
3. String concatenation: `"Total: $" + "59.97"` = `"Total: $59.97"`
</details>

**Question 6:** Why is type casting important when working with user input?

<details>
<summary>Click to reveal answer</summary>

**Answer:** User input from `input()` is always a string, so you need to cast it to the appropriate type for calculations or comparisons

**Explanation:** Example:
```python
age = input("Enter age: ")  # "25" (string)
# age + 5  # Error! Can't add string and int
age = int(age)  # 25 (integer)
age + 5  # Works! Returns 30
```
Without casting, you can't perform mathematical operations on user input.
</details>

---

## Conclusion

Type casting is an essential skill in Python programming. Understanding when and how to convert between data types helps you handle user input, perform calculations, and avoid type-related errors. Always validate your data before casting to ensure your programs run smoothly!