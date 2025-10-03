---
id: python-errors-and-exceptions
title: Exception Handling in Python
sidebar_label: Exception Handling
sidebar_position: 12
tags:
  [
    Python,
    Exceptions,
    Error Handling,
    try,
    except,
    finally,
    else,
    raise,
    Python Syntax,
    Introduction of python,
  ]
---

# Exception Handling in Python

**Exception handling** in Python is a mechanism to gracefully manage errors that occur during program execution. Instead of letting your program crash, you can catch and handle errors, provide meaningful feedback, and ensure proper cleanup of resources.

Exceptions are objects that represent errors, and Python provides a robust system to catch, handle, and raise them.

---

## Why Exception Handling?

Without exception handling, errors cause programs to crash:

```python
# This will crash the program
number = int("abc")  # ValueError: invalid literal for int()
```

With exception handling, you can manage errors gracefully:

```python
try:
    number = int("abc")
except ValueError:
    print("Invalid input! Please enter a number.")
    number = 0
```

---

## The `try...except` Block

The basic syntax for handling exceptions:

```python
try:
    # Code that might raise an exception
    result = 10 / 0
except ZeroDivisionError:
    # Code to handle the exception
    print("Cannot divide by zero!")

# Output: Cannot divide by zero!
```

**Syntax:**

```python
try:
    # Risky code
    pass
except ExceptionType:
    # Handle the exception
    pass
```

---

## Catching Specific Exceptions

### Single Exception

Catch a specific exception type:

```python
try:
    age = int(input("Enter your age: "))
    print(f"You are {age} years old")
except ValueError:
    print("Please enter a valid number!")
```

### Common Built-in Exceptions

```python
# ValueError - Invalid value
try:
    number = int("hello")
except ValueError:
    print("That's not a valid number!")

# ZeroDivisionError - Division by zero
try:
    result = 100 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")

# FileNotFoundError - File doesn't exist
try:
    with open("nonexistent.txt", "r") as file:
        content = file.read()
except FileNotFoundError:
    print("File not found!")

# IndexError - Invalid index
try:
    my_list = [1, 2, 3]
    print(my_list[10])
except IndexError:
    print("Index out of range!")

# KeyError - Invalid dictionary key
try:
    my_dict = {"name": "Alice"}
    print(my_dict["age"])
except KeyError:
    print("Key not found in dictionary!")

# TypeError - Wrong type operation
try:
    result = "hello" + 5
except TypeError:
    print("Cannot add string and integer!")
```

---

## Multiple Exception Handlers

Handle different exceptions separately:

```python
def divide_numbers(a, b):
    try:
        result = int(a) / int(b)
        return result
    except ValueError:
        print("Error: Please provide valid numbers")
    except ZeroDivisionError:
        print("Error: Cannot divide by zero")
    except Exception as e:
        print(f"Unexpected error: {e}")

divide_numbers("10", "2")    # Output: 5.0
divide_numbers("abc", "2")   # Output: Error: Please provide valid numbers
divide_numbers("10", "0")    # Output: Error: Cannot divide by zero
```

### Catching Multiple Exceptions Together

Use a tuple to catch multiple exceptions with the same handler:

```python
try:
    value = int(input("Enter a number: "))
    result = 100 / value
except (ValueError, ZeroDivisionError):
    print("Invalid input or division by zero!")

# With exception details
try:
    value = int(input("Enter a number: "))
    result = 100 / value
except (ValueError, ZeroDivisionError) as e:
    print(f"Error occurred: {e}")
```

---

## The `else` Clause

The `else` block executes **only if no exception occurs** in the `try` block:

```python
try:
    number = int(input("Enter a number: "))
except ValueError:
    print("Invalid input!")
else:
    print(f"Success! You entered: {number}")
    print("No errors occurred")
```

### Practical Example with `else`

```python
def read_file(filename):
    try:
        file = open(filename, "r")
    except FileNotFoundError:
        print(f"Error: {filename} not found")
    else:
        content = file.read()
        print(f"File content:\n{content}")
        file.close()
        print("File read successfully!")

read_file("example.txt")
```

---

## The `finally` Clause

The `finally` block **always executes**, whether an exception occurs or not. It's used for cleanup actions:

```python
try:
    file = open("data.txt", "r")
    content = file.read()
    print(content)
except FileNotFoundError:
    print("File not found!")
finally:
    print("Cleanup: Closing resources")
    # This always runs
```

### Resource Cleanup Example

```python
def process_file(filename):
    file = None
    try:
        file = open(filename, "r")
        data = file.read()
        result = int(data)  # Might raise ValueError
        return result
    except FileNotFoundError:
        print("File not found!")
        return None
    except ValueError:
        print("File contains invalid data!")
        return None
    finally:
        if file:
            file.close()
            print("File closed")

process_file("numbers.txt")
```

---

## Complete `try...except...else...finally` Structure

All clauses together:

```python
def divide_and_log(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        print("Error: Division by zero")
        return None
    except TypeError:
        print("Error: Invalid types for division")
        return None
    else:
        print(f"Division successful: {a} / {b} = {result}")
        return result
    finally:
        print("Operation completed")

print(divide_and_log(10, 2))
# Output:
# Division successful: 10 / 2 = 5.0
# Operation completed
# 5.0

print(divide_and_log(10, 0))
# Output:
# Error: Division by zero
# Operation completed
# None
```

---

## Accessing Exception Information

Use the `as` keyword to access exception details:

```python
try:
    number = int("abc")
except ValueError as e:
    print(f"Exception type: {type(e).__name__}")
    print(f"Exception message: {e}")
    print(f"Exception args: {e.args}")

# Output:
# Exception type: ValueError
# Exception message: invalid literal for int() with base 10: 'abc'
# Exception args: ("invalid literal for int() with base 10: 'abc'",)
```

---

## Raising Exceptions

Use the `raise` keyword to throw exceptions:

### Basic Raise

```python
def check_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative!")
    if age < 18:
        raise ValueError("Must be 18 or older")
    print(f"Age {age} is valid")

try:
    check_age(-5)
except ValueError as e:
    print(f"Error: {e}")
# Output: Error: Age cannot be negative!
```

### Re-raising Exceptions

```python
def process_data(data):
    try:
        result = int(data)
        return result
    except ValueError as e:
        print("Logging error...")
        raise  # Re-raise the same exception

try:
    process_data("invalid")
except ValueError:
    print("Caught re-raised exception")

# Output:
# Logging error...
# Caught re-raised exception
```

### Raising with Custom Messages

```python
def withdraw(balance, amount):
    if amount > balance:
        raise ValueError(f"Insufficient funds! Balance: {balance}, Requested: {amount}")
    return balance - amount

try:
    new_balance = withdraw(100, 150)
except ValueError as e:
    print(e)
# Output: Insufficient funds! Balance: 100, Requested: 150
```

---

## Custom Exceptions

Create your own exception classes:

```python
class InvalidEmailError(Exception):
    """Custom exception for invalid email addresses"""
    pass

class AgeRestrictionError(Exception):
    """Custom exception for age restrictions"""
    def __init__(self, age, minimum_age):
        self.age = age
        self.minimum_age = minimum_age
        super().__init__(f"Age {age} is below minimum required age {minimum_age}")

# Using custom exceptions
def validate_email(email):
    if "@" not in email:
        raise InvalidEmailError(f"Invalid email format: {email}")
    print("Email is valid!")

def check_eligibility(age):
    minimum_age = 18
    if age < minimum_age:
        raise AgeRestrictionError(age, minimum_age)
    print("Eligible!")

# Test custom exceptions
try:
    validate_email("invalidemail.com")
except InvalidEmailError as e:
    print(f"Error: {e}")
# Output: Error: Invalid email format: invalidemail.com

try:
    check_eligibility(15)
except AgeRestrictionError as e:
    print(f"Error: {e}")
    print(f"You are {e.minimum_age - e.age} years too young")
# Output: 
# Error: Age 15 is below minimum required age 18
# You are 3 years too young
```

---

## Exception Hierarchy

Python exceptions follow a hierarchy. Catching a parent exception catches all child exceptions:

```python
try:
    # Some code
    pass
except Exception as e:
    # Catches most exceptions (but not KeyboardInterrupt, SystemExit)
    print(f"Caught: {e}")
```

**Common Exception Hierarchy:**
```
BaseException
├── SystemExit
├── KeyboardInterrupt
├── Exception
    ├── ArithmeticError
    │   ├── ZeroDivisionError
    │   ├── FloatingPointError
    │   └── OverflowError
    ├── LookupError
    │   ├── IndexError
    │   └── KeyError
    ├── ValueError
    ├── TypeError
    ├── NameError
    └── ... (many more)
```

### Catching Parent Exceptions

```python
try:
    my_list = [1, 2, 3]
    print(my_list[10])  # IndexError
except LookupError as e:  # Parent of IndexError
    print(f"Lookup error occurred: {e}")
# Output: Lookup error occurred: list index out of range
```

---

## Practical Examples

### Example 1: Safe User Input

```python
def get_integer_input(prompt):
    """Safely get integer input from user."""
    while True:
        try:
            value = int(input(prompt))
            return value
        except ValueError:
            print("Invalid input! Please enter a whole number.")
        except KeyboardInterrupt:
            print("\nInput cancelled by user")
            return None

age = get_integer_input("Enter your age: ")
if age:
    print(f"You are {age} years old")
```

### Example 2: File Processing with Error Handling

```python
def process_data_file(filename):
    """Process a data file with comprehensive error handling."""
    try:
        with open(filename, "r") as file:
            lines = file.readlines()
            
        numbers = []
        for line_num, line in enumerate(lines, 1):
            try:
                number = float(line.strip())
                numbers.append(number)
            except ValueError:
                print(f"Warning: Invalid number on line {line_num}: '{line.strip()}'")
                continue
        
        if not numbers:
            raise ValueError("No valid numbers found in file")
            
        average = sum(numbers) / len(numbers)
        return average
        
    except FileNotFoundError:
        print(f"Error: File '{filename}' not found")
        return None
    except PermissionError:
        print(f"Error: No permission to read '{filename}'")
        return None
    except ValueError as e:
        print(f"Error: {e}")
        return None
    else:
        print(f"Successfully processed {len(numbers)} numbers")
    finally:
        print("File processing completed")

result = process_data_file("data.txt")
if result:
    print(f"Average: {result:.2f}")
```

### Example 3: API Request Handler

```python
class APIError(Exception):
    """Custom exception for API errors"""
    pass

class AuthenticationError(APIError):
    """Custom exception for authentication failures"""
    pass

def make_api_request(endpoint, auth_token=None):
    """Simulate an API request with error handling."""
    try:
        if not auth_token:
            raise AuthenticationError("No authentication token provided")
        
        if not endpoint.startswith("/api/"):
            raise ValueError(f"Invalid endpoint format: {endpoint}")
        
        # Simulate API call
        if endpoint == "/api/users":
            return {"status": "success", "data": ["user1", "user2"]}
        else:
            raise APIError(f"Endpoint not found: {endpoint}")
            
    except AuthenticationError as e:
        print(f"Authentication failed: {e}")
        return {"status": "error", "message": str(e)}
    except APIError as e:
        print(f"API error: {e}")
        return {"status": "error", "message": str(e)}
    except ValueError as e:
        print(f"Validation error: {e}")
        return {"status": "error", "message": str(e)}
    except Exception as e:
        print(f"Unexpected error: {e}")
        return {"status": "error", "message": "Internal server error"}
    finally:
        print(f"Request to {endpoint} completed")

# Test the API handler
response = make_api_request("/api/users", "secret_token")
print(response)
```

### Example 4: Calculator with Exception Handling

```python
def safe_calculator(operation, num1, num2):
    """Perform calculations with comprehensive error handling."""
    try:
        # Convert inputs to float
        a = float(num1)
        b = float(num2)
        
        if operation == "+":
            result = a + b
        elif operation == "-":
            result = a - b
        elif operation == "*":
            result = a * b
        elif operation == "/":
            if b == 0:
                raise ZeroDivisionError("Cannot divide by zero")
            result = a / b
        elif operation == "**":
            if a == 0 and b < 0:
                raise ValueError("Cannot raise 0 to a negative power")
            result = a ** b
        else:
            raise ValueError(f"Unknown operation: {operation}")
            
    except ValueError as e:
        return f"Error: {e}"
    except ZeroDivisionError as e:
        return f"Error: {e}"
    except OverflowError:
        return "Error: Result is too large to calculate"
    except Exception as e:
        return f"Unexpected error: {e}"
    else:
        return f"{num1} {operation} {num2} = {result}"
    finally:
        print("Calculation attempt completed")

# Test cases
print(safe_calculator("+", "10", "5"))      # 10 + 5 = 15.0
print(safe_calculator("/", "10", "0"))      # Error: Cannot divide by zero
print(safe_calculator("^", "10", "5"))      # Error: Unknown operation: ^
print(safe_calculator("**", "2", "1000"))   # Error: Result is too large
```

---

## Best Practices

### 1. Be Specific with Exceptions

```python
# Good - Catch specific exceptions
try:
    value = int(input("Enter number: "))
except ValueError:
    print("Invalid number")

# Avoid - Too broad
try:
    value = int(input("Enter number: "))
except Exception:
    print("Something went wrong")
```

### 2. Don't Silence Exceptions

```python
# Bad - Silences all errors
try:
    risky_operation()
except:
    pass

# Good - Handle specifically or log
try:
    risky_operation()
except SpecificError as e:
    logger.error(f"Operation failed: {e}")
    # Take appropriate action
```

### 3. Use `finally` for Cleanup

```python
# Good - Ensures cleanup happens
file = None
try:
    file = open("data.txt", "r")
    process(file)
except Exception as e:
    print(f"Error: {e}")
finally:
    if file:
        file.close()

# Better - Use context managers
try:
    with open("data.txt", "r") as file:
        process(file)
except Exception as e:
    print(f"Error: {e}")
```

### 4. Provide Helpful Error Messages

```python
# Good
def set_age(age):
    if age < 0:
        raise ValueError(f"Age cannot be negative. Received: {age}")
    if age > 150:
        raise ValueError(f"Age seems invalid. Received: {age}")

# Less helpful
def set_age(age):
    if age < 0 or age > 150:
        raise ValueError("Invalid age")
```

### 5. Don't Use Exceptions for Flow Control

```python
# Bad - Using exceptions for normal flow
try:
    return my_dict[key]
except KeyError:
    return default_value

# Good - Use proper checks
return my_dict.get(key, default_value)
```

---

## Common Patterns

### Pattern 1: Retry Logic

```python
def retry_operation(func, max_attempts=3):
    """Retry an operation multiple times on failure."""
    for attempt in range(1, max_attempts + 1):
        try:
            result = func()
            return result
        except Exception as e:
            print(f"Attempt {attempt} failed: {e}")
            if attempt == max_attempts:
                print("All attempts failed")
                raise
            print("Retrying...")

# Usage
def unreliable_operation():
    import random
    if random.random() < 0.7:
        raise ConnectionError("Network error")
    return "Success!"

try:
    result = retry_operation(unreliable_operation)
    print(result)
except ConnectionError:
    print("Operation failed after all retries")
```

### Pattern 2: Context Manager with Exception Handling

```python
class DatabaseConnection:
    """Custom context manager with exception handling."""
    
    def __init__(self, db_name):
        self.db_name = db_name
        self.connection = None
    
    def __enter__(self):
        print(f"Opening connection to {self.db_name}")
        self.connection = f"Connected to {self.db_name}"
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        print(f"Closing connection to {self.db_name}")
        if exc_type is not None:
            print(f"Exception occurred: {exc_type.__name__}: {exc_val}")
            # Return False to propagate the exception
            return False
        return True

# Usage
try:
    with DatabaseConnection("users_db") as db:
        print("Performing database operations...")
        # Simulate an error
        raise ValueError("Invalid query")
except ValueError as e:
    print(f"Caught: {e}")
```

---

## Summary

| Concept         | Purpose                              | Example                                    |
| --------------- | ------------------------------------ | ------------------------------------------ |
| `try`           | Code that might raise exceptions     | `try: risky_code()`                        |
| `except`        | Handle specific exceptions           | `except ValueError: handle_error()`        |
| `else`          | Runs if no exception occurred        | `else: print("Success!")`                  |
| `finally`       | Always runs (cleanup)                | `finally: cleanup()`                       |
| `raise`         | Throw an exception                   | `raise ValueError("Invalid")`              |
| `as`            | Capture exception details            | `except ValueError as e:`                  |
| Custom          | Create custom exception classes      | `class MyError(Exception): pass`           |
| Multiple except | Handle different exceptions          | `except (ValueError, TypeError):`          |
| Exception chain | Parent exception catches children    | `except LookupError:` (catches IndexError) |

Exception handling is essential for writing robust Python programs. It allows you to gracefully manage errors, provide meaningful feedback to users, and ensure proper resource cleanup. Master these concepts to build reliable and maintainable applications!