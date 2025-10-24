# Stack in Python

A **Stack** is a linear data structure that follows a specific order for all operations. This order is based on the **Last-In, First-Out (LIFO)** principle.

Imagine a stack of plates: you can only add a new plate to the top, and you can only remove the plate that is currently on the top.

---

## Stack Operations

A stack has three primary operations, all of which occur at the **Top** of the stack:

1.  `Push`: **Adds** an element to the top of the stack.
2.  `Pop`: **Removes** and returns the element from the top of the stack.
3.  `Peek`: **Returns** the element at the top.

| Operation | Description | Analogy |
| :--- | :--- | :--- | :--- |
| **Push** | Add element to the **Top** | Placing a plate on top of the stack |
| **Pop** | Remove element from the **Top** | Taking the top plate off the stack |
| **Peek** | View the element at the **Top** | Looking at the top plate |

---

## Stack Operations Using Python
ListIn the simplest Python implementation, we use a built-in list as the underlying storage. For a true LIFO stack, all primary operations are performed at the end of the list:

* **Push** is performed using `list.append()`.
* **Pop** is performed using `list.pop()`. 
* **Peek** is performed using list indexing `list[-1]`.

---
## The Stack Class

```python
class Stack:
    """Implements a Stack using the LIFO principle with a Python list."""
    def __init__(self):
        # The storage container for the stack elements
        self._items = [] 

    def is_empty(self):
        """Check if the stack is empty."""
        return not self._items

    def push(self, data):
        """Adds an element to the top of the stack (list.append())."""
        self._items.append(data)
        print(f"Pushed: {data}")

    def pop(self):
        """Removes and returns the top element (list.pop())."""
        if self.is_empty():
            raise IndexError("Error: Cannot pop from an empty stack.")
        
        # Pop removes the last item (the top of the stack)
        return self._items.pop()

    def peek(self):
        """Returns the top element without removing it."""
        if self.is_empty():
            raise IndexError("Error: Cannot peek at an empty stack.")
        
        # Access the last item (-1 index)
        return self._items[-1]
```

***Example***

```python
my_stack = Stack()
my_stack.push("A") 
my_stack.push("B") 
my_stack.push("C") 

print("\nTop element (Peek):", my_stack.peek()) 

removed_item = my_stack.pop()
print("Popped element:", removed_item)

print("Current size:", len(my_stack._items))

my_stack.pop()
my_stack.pop()

# my_stack.pop() # Uncommenting this line will raise an IndexError
```

**Output**:

```
Pushed: A
Pushed: B
Pushed: C

Top element (Peek): C
Popped element: C
Current size: 2
```