---
id: python-functions
title: Functions in Python
sidebar_label: Functions in Python
sidebar_position: 11
tags:
  [
    Python,
    Functions,
    def,
    return,
    arguments,
    parameters,
    args,
    kwargs,
    Python Syntax,
    Introduction of python,
  ]
---

# Functions in Python

A **function** in Python is a block of reusable code that performs a specific task. Functions help organize code, avoid repetition, and make programs more modular and maintainable.

Functions are defined using the `def` keyword and can accept inputs (parameters) and return outputs.

---

## Defining a Function

Use the `def` keyword followed by the function name and parentheses:

```python
def greet():
    print("Hello, World!")

# Call the function
greet()  # Output: Hello, World!
```

**Syntax:**

```python
def function_name(parameters):
    """Optional docstring"""
    # Function body
    return value  # Optional
```

---

## Function with Parameters

Functions can accept inputs called **parameters** or **arguments**:

```python
def greet_person(name):
    print(f"Hello, {name}!")

greet_person("Alice")  # Output: Hello, Alice!
greet_person("Bob")    # Output: Hello, Bob!
```

### Multiple Parameters

```python
def add_numbers(a, b):
    result = a + b
    print(f"{a} + {b} = {result}")

add_numbers(5, 3)  # Output: 5 + 3 = 8
```

---

## The `return` Statement

Functions can return values using the `return` keyword:

```python
def multiply(x, y):
    return x * y

result = multiply(4, 5)
print(result)  # Output: 20
```

### Multiple Return Values

Python functions can return multiple values as a tuple:

```python
def get_name_age():
    name = "John"
    age = 25
    return name, age

person_name, person_age = get_name_age()
print(f"Name: {person_name}, Age: {person_age}")
# Output: Name: John, Age: 25
```

### Functions Without Return

If no `return` statement is used, the function returns `None`:

```python
def say_hello():
    print("Hello!")

result = say_hello()  # Output: Hello!
print(result)         # Output: None
```

---

## Default Arguments

You can provide default values for parameters:

```python
def greet_with_title(name, title="Mr."):
    print(f"Hello, {title} {name}!")

greet_with_title("Smith")         # Output: Hello, Mr. Smith!
greet_with_title("Johnson", "Dr.") # Output: Hello, Dr. Johnson!
```

### Multiple Default Arguments

```python
def create_profile(name, age=18, country="USA"):
    print(f"Name: {name}, Age: {age}, Country: {country}")

create_profile("Alice")                    # Name: Alice, Age: 18, Country: USA
create_profile("Bob", 25)                  # Name: Bob, Age: 25, Country: USA
create_profile("Charlie", 30, "Canada")    # Name: Charlie, Age: 30, Country: Canada
```

---

## Keyword Arguments

You can pass arguments by specifying the parameter name:

```python
def book_info(title, author, year):
    print(f"'{title}' by {author} ({year})")

# Positional arguments
book_info("1984", "George Orwell", 1949)

# Keyword arguments
book_info(author="Jane Austen", title="Pride and Prejudice", year=1813)

# Mixed (positional first, then keyword)
book_info("Hamlet", author="Shakespeare", year=1600)
```

---

## Variable-Length Arguments: `*args`

Use `*args` to accept any number of positional arguments:

```python
def sum_all(*numbers):
    total = 0
    for num in numbers:
        total += num
    return total

print(sum_all(1, 2, 3))          # Output: 6
print(sum_all(1, 2, 3, 4, 5))    # Output: 15
print(sum_all(10))               # Output: 10
```

### Combining Regular Parameters with \*args

```python
def introduce(name, *hobbies):
    print(f"Hi, I'm {name}!")
    if hobbies:
        print("My hobbies are:", ", ".join(hobbies))

introduce("Alice")                           # Hi, I'm Alice!
introduce("Bob", "reading", "swimming")      # Hi, I'm Bob!
                                           # My hobbies are: reading, swimming
```

---

## Variable-Length Keyword Arguments: `**kwargs`

Use `**kwargs` to accept any number of keyword arguments:

```python
def display_info(**info):
    for key, value in info.items():
        print(f"{key}: {value}")

display_info(name="John", age=25, city="New York")
# Output:
# name: John
# age: 25
# city: New York
```

### Combining \*args and \*\*kwargs

```python
def flexible_function(*args, **kwargs):
    print("Positional arguments:", args)
    print("Keyword arguments:", kwargs)

flexible_function(1, 2, 3, name="Alice", age=30)
# Output:
# Positional arguments: (1, 2, 3)
# Keyword arguments: {'name': 'Alice', 'age': 30}
```

---

## Function Parameter Order

When combining different types of parameters, follow this order:

```python
def complete_function(required, default="value", *args, **kwargs):
    print(f"Required: {required}")
    print(f"Default: {default}")
    print(f"Args: {args}")
    print(f"Kwargs: {kwargs}")

complete_function("must_have", "custom", 1, 2, 3, extra="info")
# Output:
# Required: must_have
# Default: custom
# Args: (1, 2, 3)
# Kwargs: {'extra': 'info'}
```

---

## Scope and Local vs Global Variables

### Local Scope

Variables defined inside a function are **local**:

```python
def my_function():
    local_var = "I'm local"
    print(local_var)

my_function()  # Output: I'm local
# print(local_var)  # Error: local_var is not defined
```

### Global Scope

Variables defined outside functions are **global**:

```python
global_var = "I'm global"

def access_global():
    print(global_var)  # Can read global variable

access_global()  # Output: I'm global
```

### Modifying Global Variables

Use the `global` keyword to modify global variables inside functions:

```python
counter = 0

def increment():
    global counter
    counter += 1

increment()
print(counter)  # Output: 1
```

---

## Docstrings

Document your functions using docstrings:

```python
def calculate_area(length, width):
    """
    Calculate the area of a rectangle.

    Args:
        length (float): The length of the rectangle
        width (float): The width of the rectangle

    Returns:
        float: The area of the rectangle
    """
    return length * width

# Access docstring
print(calculate_area.__doc__)
```

---

## Lambda Functions

**Lambda functions** are small, anonymous functions defined using the `lambda` keyword:

```python
# Regular function
def square(x):
    return x ** 2

# Lambda equivalent
square_lambda = lambda x: x ** 2

print(square(5))        # Output: 25
print(square_lambda(5)) # Output: 25
```

### Lambda with Multiple Arguments

```python
# Lambda with multiple arguments
add = lambda x, y: x + y
print(add(3, 7))  # Output: 10

# Lambda with default arguments
greet = lambda name="World": f"Hello, {name}!"
print(greet())        # Output: Hello, World!
print(greet("Alice")) # Output: Hello, Alice!
```

---

## Practical Examples

### Example 1: Temperature Converter

```python
def celsius_to_fahrenheit(celsius, precision=2):
    """Convert Celsius to Fahrenheit with specified precision."""
    fahrenheit = (celsius * 9/5) + 32
    return round(fahrenheit, precision)

print(celsius_to_fahrenheit(25))     # Output: 77.0
print(celsius_to_fahrenheit(0, 1))   # Output: 32.0
```

### Example 2: Shopping Cart Calculator

```python
def calculate_total(*prices, tax_rate=0.08, discount=0):
    """Calculate total price with tax and discount."""
    subtotal = sum(prices)
    discounted = subtotal - (subtotal * discount)
    total = discounted + (discounted * tax_rate)
    return round(total, 2)

# Usage examples
print(calculate_total(10.99, 25.50, 8.75))
# Output: 48.87

print(calculate_total(10.99, 25.50, tax_rate=0.10, discount=0.15))
# Output: 34.19
```

### Example 3: User Registration System

```python
def register_user(username, email, **additional_info):
    """Register a new user with optional additional information."""
    user = {
        "username": username,
        "email": email,
        "status": "active"
    }

    # Add any additional information
    user.update(additional_info)

    print(f"User {username} registered successfully!")
    return user

# Usage
new_user = register_user(
    "alice_dev",
    "alice@example.com",
    age=28,
    location="New York",
    skills=["Python", "JavaScript"]
)

print(new_user)
```

---

## Best Practices

### 1. Use Descriptive Names

```python
# Good
def calculate_monthly_payment(principal, rate, months):
    return (principal * rate) / (1 - (1 + rate) ** -months)

# Avoid
def calc(p, r, m):
    return (p * r) / (1 - (1 + r) ** -m)
```

### 2. Keep Functions Small and Focused

```python
# Good - Single responsibility
def validate_email(email):
    return "@" in email and "." in email

def send_welcome_email(email):
    if validate_email(email):
        print(f"Welcome email sent to {email}")

# Better than one large function doing everything
```

### 3. Use Type Hints (Python 3.5+)

```python
def add_numbers(a: int, b: int) -> int:
    """Add two integers and return the result."""
    return a + b

def greet_user(name: str, times: int = 1) -> None:
    """Greet a user a specified number of times."""
    for _ in range(times):
        print(f"Hello, {name}!")
```

---

## Summary

| Concept      | Description                   | Example                      |
| ------------ | ----------------------------- | ---------------------------- |
| `def`        | Define a function             | `def my_func():`             |
| `return`     | Return a value                | `return result`              |
| Parameters   | Function inputs               | `def func(a, b):`            |
| Default args | Parameters with defaults      | `def func(a, b=10):`         |
| `*args`      | Variable positional arguments | `def func(*args):`           |
| `**kwargs`   | Variable keyword arguments    | `def func(**kwargs):`        |
| Lambda       | Anonymous function            | `lambda x: x * 2`            |
| Docstring    | Function documentation        | `"""Function description"""` |

Functions are fundamental building blocks in Python that make code reusable, organized, and maintainable. Master these concepts to write clean and efficient Python programs!
