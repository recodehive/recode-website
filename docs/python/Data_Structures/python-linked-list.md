# Linked List in Python

A **Linked List** is a fundamental **linear data structure** where elements are **not** stored at contiguous memory locations (unlike arrays or Python lists). Instead, the elements, called **Nodes**, are linked together using **pointers** or **references**.

This structure allows for highly efficient **insertions** and **deletions** compared to arrays, where these operations can be slow.

---

## Structure of a Linked List

The linked list is built upon two core concepts:

1.  **Node:** The basic building block, which contains:
    * **Data:** The value stored.
    * **Next Pointer (`next`):** The reference to the next node in the sequence.
2.  **Head:** A pointer to the very first node in the list. It is the entry point for all operations. The last node's `next` pointer always points to **`None`**.

### Real-Life Analogy

Think of a **treasure hunt or a chain of clues**. Each clue (**Node**) holds the information (**Data**) and a direction to the next clue (**Next Pointer**). You must follow the chain from the beginning (**Head**) to find the end.

---

## Python Implementation: The Node Class

Since Python doesn't have a built-in linked list type, we define its structure using classes.

The `Node` class defines the element structure.

```python
class Node:
    """Represents a single element in the linked list."""
    def __init__(self, data):
        # Store the data
        self.data = data
        # Initialize the pointer to the next node
        self.next = None
```

## Python Implementation: The LinkedList Class

The `LinkedList` class manages the list, primarily by keeping track of the `head`.

```python
class LinkedList:
    """Manages the linked list and its head pointer."""
    def __init__(self):
        # Initialize the list's entry point
        self.head = None
```

### Traversal: Printing the List

To traverse, we start at the head and loop until the current node becomes None, updating the current node with its next pointer in each iteration.

```python
class LinkedList:
    # __init__ and Node class definition here 
    
    def print_list(self):
        current_node = self.head
        print("List:", end=" ")
        while current_node is not None:
            print(current_node.data, end=" -> ")
            current_node = current_node.next
        print("None")
```
***Example***

```python
my_list = LinkedList()
my_list.head = Node(10)
second = Node(20)
third = Node(30)

# Linking the nodes: 10 -> 20 -> 30 -> None
my_list.head.next = second
second.next = third
my_list.print_list()
```

**Output:**

```
List: 10 -> 20 -> 30 -> None
```

### Insertion Operations

#### 1. Insertion at the Beginning (Prepend)

It only requires updating the head pointer.

```python
def insert_at_beginning(self, new_data):
    # Create a new node
    new_node = Node(new_data)
    
    # Make the new node's next pointer point to the current head
    new_node.next = self.head
    
    # Update the list's head to point to the new node
    self.head = new_node
```

***Example***

```python
my_list.insert_at_beginning(5)
my_list.print_list()
```

**Output:**

```
List: 5-> 10 -> 20 -> 30 -> None
```

#### 2. Insertion After a Node

```python
def insert_after(self, prev_node, new_data):
    if prev_node is None:
        print("Previous node cannot be None.")
        return
        
    # Create the new node
    new_node = Node(new_data)
    
    # Set new node's next to the previous node's next
    new_node.next = prev_node.next
    
    # Set the previous node's next to the new node
    prev_node.next = new_node
```

***Example***

```python
my_list.insert_after(my_list.head, 15)
my_list.print_list()
```

**Output:**

```
List: 5-> 15-> 10 -> 20 -> 30 -> None
``` 

### Deletion Operation

Deleting the Head

```python
def delete_head(self):
    if self.head is None:
        return

    # Move the head to the next node, which effectively "deletes" the old head
    self.head = self.head.next
```

***Example***

```python
my_list.delete_head() # Deletes head (5)
my_list.print_list()
```

**Output:**

```
List: 15-> 10 -> 20 -> 30 -> None
```