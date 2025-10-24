# Queue in Python

A **Queue** is a linear data structure that follows a specific order for all operations. This order is based on the **First-In, First-Out (FIFO)** principle.

Imagine a ticket line: the first person to join the line is the first person to be served and leave.

---

## Queue Operations

Queues have two distinct ends where operations occur: the **Rear** (for insertion) and the **Front** (for removal).

| Operation | Description | Analogy |
| :--- | :--- | :--- |
| **Enqueue** | Adds an element to the **Rear**. | Joining the back of the line. |
| **Dequeue** | Removes an element from the **Front**. | Leaving the front of the line. |
| **Peek** | Returns the front element without removing it. | Looking at the person next in line. |

---

## Queue Operations Using Python List

In the simplest Python implementation, we use a built-in **`list`** as the underlying storage. For a true FIFO queue:

* **Enqueue** is performed using `list.append()` (at the rear/end).
* **Dequeue** is performed using `list.pop(0)` (from the front/start).
* **Peek** is performed using list indexing `list[0]` (at the fromt/start).

### The Queue Class

```python
class Queue:
    """Implements a Queue using the FIFO principle with a Python list."""
    def __init__(self):
        # The storage container for the queue elements
        self._items = [] 

    def is_empty(self):
        """Check if the queue is empty."""
        return not self._items

    def enqueue(self, data):
        """Adds an element to the rear of the queue (list.append()). (O(1))"""
        self._items.append(data)
        print(f"Enqueued: {data}")

    def dequeue(self):
        """Removes and returns the front element (list.pop(0)). (O(N))"""
        if self.is_empty():
            raise IndexError("Error: Cannot dequeue from an empty queue.")
        
        # pop(0) removes the first item (the front of the queue)
        return self._items.pop(0)

    def peek(self):
        """Returns the front element without removing it."""
        if self.is_empty():
            raise IndexError("Error: Cannot peek at an empty queue.")
        
        # Access the first item (0 index)
        return self._items[0]
```

***Example***

```python
my_queue = Queue()
my_queue.enqueue("Task 1") 
my_queue.enqueue("Task 2") 
my_queue.enqueue("Task 3") 

print("\nFront element (Peek):", my_queue.peek())

served_item = my_queue.dequeue()
print("Dequeued element:", served_item)

print("Queue Status:", my_queue._items)

my_queue.dequeue()
my_queue.dequeue()

# my_queue.dequeue() # Uncommenting this line will raise an IndexError
```

**Output**:

```
Enqueued: Task 1
Enqueued: Task 2
Enqueued: Task 3

Front element (Peek): Task 1
Dequeued element: Task 1
Queue Status: ['Task 2', 'Task 3']
```