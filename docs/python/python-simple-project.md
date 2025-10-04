---
id: python-simple-projects
title: Python Simple Projects
sidebar_label: Simple Projects
sidebar_position: 20
tags:
  [
    Python,
    Projects,
    Beginner Projects,
    Practice,
    Hands-on Learning,
    Python Applications
  ]

---

# Python Simple Projects

Building projects is the best way to learn Python! This guide contains beginner-friendly projects that help you practice core Python concepts while creating something fun and useful.

Each project includes:
* **Concept Overview**: What you'll learn
* **Complete Code**: Full working implementation
* **Explanation**: How the code works
* **Extensions**: Ideas to improve the project


## Why Build Projects?

* **Practical Learning**: Apply concepts in real scenarios
* **Portfolio Building**: Showcase your skills
* **Problem Solving**: Develop logical thinking
* **Confidence**: See your code come to life
* **Fun**: Learn by creating something interesting!

---

## Project 1: Number Guessing Game

### 🎯 Concepts Covered:
* Random number generation
* While loops
* Conditional statements
* User input handling

### 📝 Project Description:
Create a game where the computer picks a random number and the player has to guess it. The program provides hints (too high/too low) until the player guesses correctly.

### 💻 Complete Code:

```python
import random

def number_guessing_game():
    """
    A simple number guessing game
    """
    # Generate random number between 1 and 100
    secret_number = random.randint(1, 100)
    attempts = 0
    max_attempts = 10
    
    print("🎮 Welcome to the Number Guessing Game!")
    print(f"I'm thinking of a number between 1 and 100.")
    print(f"You have {max_attempts} attempts to guess it.\n")
    
    while attempts < max_attempts:
        try:
            # Get user input
            guess = int(input(f"Attempt {attempts + 1}/{max_attempts} - Enter your guess: "))
            attempts += 1
            
            # Check the guess
            if guess < secret_number:
                print("📈 Too low! Try a higher number.\n")
            elif guess > secret_number:
                print("📉 Too high! Try a lower number.\n")
            else:
                print(f"\n🎉 Congratulations! You guessed it in {attempts} attempts!")
                print(f"The number was {secret_number}")
                return
                
        except ValueError:
            print("❌ Please enter a valid number!\n")
    
    print(f"\n😞 Game Over! You've used all {max_attempts} attempts.")
    print(f"The number was {secret_number}")

# Run the game
if __name__ == "__main__":
    number_guessing_game()
```

### 🔍 How It Works:

1. **Random Number**: `random.randint(1, 100)` generates a random number
2. **Loop**: While loop continues until player guesses or runs out of attempts
3. **Validation**: Try-except block handles invalid inputs
4. **Feedback**: Conditional statements provide hints
5. **Win Condition**: Exact match ends the game successfully

### 🚀 Extensions:

* Add difficulty levels (Easy: 1-50, Hard: 1-1000)
* Track high scores
* Add a play again option
* Implement a two-player mode
* Add a scoring system based on attempts

---

## 📝 Quiz 1: Number Guessing Game

**Q1. Which module is used to generate random numbers?**
- A) math
- B) random
- C) numbers
- D) generate

<details>
<summary>Show Answer</summary>
**Answer: B) random**

The `random` module provides functions for generating random numbers, including `randint()` for random integers.
</details>

**Q2. What does `random.randint(1, 100)` do?**
- A) Generates a random float between 1 and 100
- B) Generates a random integer between 1 and 99
- C) Generates a random integer between 1 and 100 (inclusive)
- D) Generates 100 random numbers

<details>
<summary>Show Answer</summary>
**Answer: C) Generates a random integer between 1 and 100 (inclusive)**

`randint(a, b)` returns a random integer N such that `a <= N <= b`, so both endpoints are included.
</details>

---

## Project 2: To-Do List Application

### 🎯 Concepts Covered:
* Lists and list methods
* Functions
* File handling (optional)
* Menu-driven program

### 📝 Project Description:
A command-line to-do list application that allows users to add, view, remove, and mark tasks as complete.

### 💻 Complete Code:

```python
def display_menu():
    """Display the menu options"""
    print("\n" + "="*40)
    print("📝 TO-DO LIST MANAGER")
    print("="*40)
    print("1. View Tasks")
    print("2. Add Task")
    print("3. Remove Task")
    print("4. Mark Task as Complete")
    print("5. Exit")
    print("="*40)

def view_tasks(tasks):
    """Display all tasks"""
    if not tasks:
        print("\n✨ No tasks yet! You're all caught up!")
        return
    
    print("\n📋 Your Tasks:")
    print("-" * 40)
    for index, task in enumerate(tasks, 1):
        status = "✅" if task['completed'] else "⭕"
        print(f"{index}. {status} {task['name']}")
    print("-" * 40)

def add_task(tasks):
    """Add a new task"""
    task_name = input("\n➕ Enter task name: ").strip()
    if task_name:
        tasks.append({'name': task_name, 'completed': False})
        print(f"✅ Task '{task_name}' added successfully!")
    else:
        print("❌ Task name cannot be empty!")

def remove_task(tasks):
    """Remove a task"""
    view_tasks(tasks)
    if not tasks:
        return
    
    try:
        task_num = int(input("\n🗑️  Enter task number to remove: "))
        if 1 <= task_num <= len(tasks):
            removed = tasks.pop(task_num - 1)
            print(f"✅ Task '{removed['name']}' removed!")
        else:
            print("❌ Invalid task number!")
    except ValueError:
        print("❌ Please enter a valid number!")

def mark_complete(tasks):
    """Mark a task as complete"""
    view_tasks(tasks)
    if not tasks:
        return
    
    try:
        task_num = int(input("\n✔️  Enter task number to mark complete: "))
        if 1 <= task_num <= len(tasks):
            tasks[task_num - 1]['completed'] = True
            print(f"✅ Task '{tasks[task_num - 1]['name']}' marked as complete!")
        else:
            print("❌ Invalid task number!")
    except ValueError:
        print("❌ Please enter a valid number!")

def todo_list_app():
    """Main application function"""
    tasks = []
    
    print("🌟 Welcome to Your To-Do List Manager! 🌟")
    
    while True:
        display_menu()
        choice = input("\n👉 Enter your choice (1-5): ")
        
        if choice == '1':
            view_tasks(tasks)
        elif choice == '2':
            add_task(tasks)
        elif choice == '3':
            remove_task(tasks)
        elif choice == '4':
            mark_complete(tasks)
        elif choice == '5':
            print("\n👋 Thanks for using To-Do List Manager! Goodbye!")
            break
        else:
            print("❌ Invalid choice! Please select 1-5.")

# Run the application
if __name__ == "__main__":
    todo_list_app()
```

### 🔍 How It Works:

1. **Data Structure**: List of dictionaries storing task name and completion status
2. **Menu System**: While loop displays menu until user exits
3. **Functions**: Separate functions for each operation (clean code)
4. **Validation**: Error handling for invalid inputs
5. **User-Friendly**: Emojis and clear messages enhance experience

### 🚀 Extensions:

* Save tasks to a file (persistence)
* Add task priorities (High, Medium, Low)
* Add due dates for tasks
* Sort tasks by priority or date
* Add categories/tags to tasks

---

## 📝 Quiz 2: To-Do List Application

**Q1. What data structure is best for storing a collection of tasks?**
- A) Integer
- B) String
- C) List
- D) Boolean

<details>
<summary>Show Answer</summary>
**Answer: C) List**

Lists are perfect for storing collections of items that can grow or shrink, like a to-do list.
</details>

**Q2. How do you remove an item at a specific index from a list?**
- A) `list.delete(index)`
- B) `list.remove(index)`
- C) `list.pop(index)`
- D) `del list(index)`

<details>
<summary>Show Answer</summary>
**Answer: C) `list.pop(index)`**

The `pop()` method removes and returns the item at the given index. You can also use `del list[index]`.
</details>

---

## Project 3: Simple Calculator

### 🎯 Concepts Covered:
* Functions
* Arithmetic operators
* User input
* Error handling

### 📝 Project Description:
A calculator that performs basic arithmetic operations with a user-friendly interface.

### 💻 Complete Code:

```python
def add(x, y):
    """Addition"""
    return x + y

def subtract(x, y):
    """Subtraction"""
    return x - y

def multiply(x, y):
    """Multiplication"""
    return x * y

def divide(x, y):
    """Division"""
    if y == 0:
        return "Error: Division by zero!"
    return x / y

def power(x, y):
    """Exponentiation"""
    return x ** y

def modulus(x, y):
    """Modulus"""
    if y == 0:
        return "Error: Modulus by zero!"
    return x % y

def calculator():
    """Main calculator function"""
    print("🔢 " + "="*40)
    print("   SIMPLE CALCULATOR")
    print("="*40)
    
    while True:
        print("\n📐 Select Operation:")
        print("1. ➕ Addition")
        print("2. ➖ Subtraction")
        print("3. ✖️  Multiplication")
        print("4. ➗ Division")
        print("5. 🔺 Power")
        print("6. 📊 Modulus")
        print("7. 🚪 Exit")
        print("-" * 40)
        
        choice = input("👉 Enter choice (1-7): ")
        
        if choice == '7':
            print("\n👋 Thank you for using Calculator! Goodbye!")
            break
        
        if choice in ['1', '2', '3', '4', '5', '6']:
            try:
                num1 = float(input("Enter first number: "))
                num2 = float(input("Enter second number: "))
                
                if choice == '1':
                    result = add(num1, num2)
                    operation = "+"
                elif choice == '2':
                    result = subtract(num1, num2)
                    operation = "-"
                elif choice == '3':
                    result = multiply(num1, num2)
                    operation = "×"
                elif choice == '4':
                    result = divide(num1, num2)
                    operation = "÷"
                elif choice == '5':
                    result = power(num1, num2)
                    operation = "^"
                else:  # choice == '6'
                    result = modulus(num1, num2)
                    operation = "%"
                
                print(f"\n✅ Result: {num1} {operation} {num2} = {result}")
                
            except ValueError:
                print("\n❌ Invalid input! Please enter valid numbers.")
        else:
            print("\n❌ Invalid choice! Please select 1-7.")
        
        input("\nPress Enter to continue...")

# Run the calculator
if __name__ == "__main__":
    calculator()
```

### 🔍 How It Works:

1. **Functions**: Separate function for each operation (modular design)
2. **Menu Loop**: Continuous operation until user exits
3. **Type Conversion**: `float()` allows decimal numbers
4. **Error Handling**: Try-except for invalid inputs, if statements for division by zero
5. **User Experience**: Clear prompts and formatted output

### 🚀 Extensions:

* Add more operations (square root, factorial, logarithm)
* Add memory functions (store/recall results)
* Implement calculation history
* Add scientific calculator mode
* Support complex mathematical expressions

---

## 📝 Quiz 3: Calculator Project

**Q1. What happens if you try to divide by zero in Python without error handling?**
- A) Returns 0
- B) Returns None
- C) Raises ZeroDivisionError
- D) Returns infinity

<details>
<summary>Show Answer</summary>
**Answer: C) Raises ZeroDivisionError**

Dividing by zero raises a `ZeroDivisionError` exception if not handled properly.
</details>

**Q2. Why is it better to create separate functions for each operation?**
- A) It makes the code longer
- B) It makes the code modular, reusable, and easier to maintain
- C) It's required by Python
- D) It makes the code run faster

<details>
<summary>Show Answer</summary>
**Answer: B) It makes the code modular, reusable, and easier to maintain**

Breaking code into functions improves readability, reusability, and makes debugging easier.
</details>

---

## Project 4: Password Generator

### 🎯 Concepts Covered:
* String manipulation
* Random module
* Lists
* User input validation

### 📝 Project Description:
Generate secure random passwords based on user specifications.

### 💻 Complete Code:

```python
import random
import string

def generate_password(length, use_uppercase, use_numbers, use_symbols):
    """
    Generate a random password based on specifications
    """
    # Start with lowercase letters
    characters = string.ascii_lowercase
    
    # Add character types based on user preferences
    if use_uppercase:
        characters += string.ascii_uppercase
    if use_numbers:
        characters += string.digits
    if use_symbols:
        characters += string.punctuation
    
    # Generate password
    password = ''.join(random.choice(characters) for _ in range(length))
    return password

def get_user_preferences():
    """Get password preferences from user"""
    print("\n🔐 " + "="*50)
    print("   PASSWORD GENERATOR")
    print("="*50)
    
    # Get password length
    while True:
        try:
            length = int(input("\n📏 Enter password length (minimum 4): "))
            if length >= 4:
                break
            else:
                print("❌ Length must be at least 4 characters!")
        except ValueError:
            print("❌ Please enter a valid number!")
    
    # Get character type preferences
    print("\n🎨 Select character types to include:")
    use_uppercase = input("Include UPPERCASE letters? (y/n): ").lower() == 'y'
    use_numbers = input("Include NUMBERS? (y/n): ").lower() == 'y'
    use_symbols = input("Include SYMBOLS? (y/n): ").lower() == 'y'
    
    return length, use_uppercase, use_numbers, use_symbols

def password_strength(password):
    """Evaluate password strength"""
    score = 0
    
    if len(password) >= 8:
        score += 1
    if len(password) >= 12:
        score += 1
    if any(c.isupper() for c in password):
        score += 1
    if any(c.isdigit() for c in password):
        score += 1
    if any(c in string.punctuation for c in password):
        score += 1
    
    if score <= 2:
        return "Weak 😟", "🔴"
    elif score <= 3:
        return "Medium 😐", "🟡"
    else:
        return "Strong 😊", "🟢"

def password_generator_app():
    """Main password generator application"""
    while True:
        # Get user preferences
        length, use_upper, use_nums, use_syms = get_user_preferences()
        
        # Generate password
        password = generate_password(length, use_upper, use_nums, use_syms)
        
        # Evaluate strength
        strength, indicator = password_strength(password)
        
        # Display result
        print("\n" + "="*50)
        print("✅ PASSWORD GENERATED SUCCESSFULLY!")
        print("="*50)
        print(f"\n🔑 Your Password: {password}")
        print(f"\n📊 Password Strength: {indicator} {strength}")
        print(f"📏 Length: {len(password)} characters")
        print("="*50)
        
        # Ask to generate another
        again = input("\n🔄 Generate another password? (y/n): ").lower()
        if again != 'y':
            print("\n👋 Thank you for using Password Generator! Stay secure!")
            break

# Run the application
if __name__ == "__main__":
    password_generator_app()
```

### 🔍 How It Works:

1. **String Constants**: Uses `string` module for character sets
2. **Random Selection**: `random.choice()` picks random characters
3. **List Comprehension**: Generates password efficiently
4. **Validation**: Ensures minimum password length
5. **Strength Checker**: Evaluates password based on criteria

### 🚀 Extensions:

* Add option to exclude ambiguous characters (0, O, l, 1)
* Implement password strength meter with visual bars
* Save generated passwords (encrypted)
* Add passphrase generator option
* Copy password to clipboard automatically

---

## 📝 Quiz 4: Password Generator

**Q1. Which module provides pre-defined character sets like letters and digits?**
- A) random
- B) string
- C) characters
- D) letters

<details>
<summary>Show Answer</summary>
**Answer: B) string**

The `string` module provides constants like `ascii_letters`, `digits`, and `punctuation`.
</details>

**Q2. What makes a password strong?**
- A) Only using lowercase letters
- B) Being very short
- C) Using a mix of uppercase, lowercase, numbers, and symbols with good length
- D) Using dictionary words

<details>
<summary>Show Answer</summary>
**Answer: C) Using a mix of uppercase, lowercase, numbers, and symbols with good length**

Strong passwords are long and use a variety of character types, making them harder to crack.
</details>

---

## Project 5: Rock, Paper, Scissors Game

### 🎯 Concepts Covered:
* Conditional logic
* Random choices
* Game loops
* Score tracking

### 📝 Project Description:
Classic Rock, Paper, Scissors game against the computer with score tracking.

### 💻 Complete Code:

```python
import random

def get_computer_choice():
    """Computer randomly selects rock, paper, or scissors"""
    return random.choice(['rock', 'paper', 'scissors'])

def determine_winner(player, computer):
    """Determine the winner of the round"""
    if player == computer:
        return "tie"
    
    winning_combinations = {
        'rock': 'scissors',
        'scissors': 'paper',
        'paper': 'rock'
    }
    
    if winning_combinations[player] == computer:
        return "player"
    else:
        return "computer"

def display_choice(choice):
    """Display emoji for choice"""
    emojis = {
        'rock': '🪨',
        'paper': '📄',
        'scissors': '✂️'
    }
    return emojis.get(choice, '')

def rock_paper_scissors():
    """Main game function"""
    print("🎮 " + "="*50)
    print("   ROCK 🪨  PAPER 📄  SCISSORS ✂️")
    print("="*50)
    print("\nInstructions: Type 'rock', 'paper', or 'scissors'")
    print("Type 'quit' to exit the game\n")
    
    # Score tracking
    scores = {'player': 0, 'computer': 0, 'ties': 0}
    rounds = 0
    
    while True:
        print("-" * 50)
        player_choice = input("👤 Your choice: ").lower().strip()
        
        if player_choice == 'quit':
            break
        
        if player_choice not in ['rock', 'paper', 'scissors']:
            print("❌ Invalid choice! Please choose rock, paper, or scissors.")
            continue
        
        # Computer makes choice
        computer_choice = get_computer_choice()
        rounds += 1
        
        # Display choices
        print(f"\n🎯 Round {rounds}")
        print(f"👤 You chose: {display_choice(player_choice)} {player_choice}")
        print(f"🤖 Computer chose: {display_choice(computer_choice)} {computer_choice}")
        
        # Determine winner
        result = determine_winner(player_choice, computer_choice)
        
        if result == "tie":
            print("\n🤝 It's a TIE!")
            scores['ties'] += 1
        elif result == "player":
            print("\n🎉 YOU WIN this round!")
            scores['player'] += 1
        else:
            print("\n😞 COMPUTER WINS this round!")
            scores['computer'] += 1
        
        # Display current score
        print(f"\n📊 Score - You: {scores['player']} | Computer: {scores['computer']} | Ties: {scores['ties']}")
    
    # Final results
    print("\n" + "="*50)
    print("   GAME OVER - FINAL RESULTS")
    print("="*50)
    print(f"Total Rounds: {rounds}")
    print(f"Your Wins: {scores['player']}")
    print(f"Computer Wins: {scores['computer']}")
    print(f"Ties: {scores['ties']}")
    
    if scores['player'] > scores['computer']:
        print("\n🏆 CONGRATULATIONS! YOU ARE THE CHAMPION! 🏆")
    elif scores['computer'] > scores['player']:
        print("\n🤖 Computer wins the game! Better luck next time!")
    else:
        print("\n🤝 It's a tie overall! Well played!")
    
    print("\n👋 Thanks for playing!")

# Run the game
if __name__ == "__main__":
    rock_paper_scissors()
```

### 🔍 How It Works:

1. **Random Selection**: Computer choice using `random.choice()`
2. **Winner Logic**: Dictionary maps winning combinations
3. **Score Tracking**: Dictionary stores player, computer, and tie scores
4. **Round System**: Loop continues until player quits
5. **Visual Feedback**: Emojis make the game more engaging

### 🚀 Extensions:

* Add Rock-Paper-Scissors-Lizard-Spock variant
* Implement best-of-N rounds
* Add difficulty levels (computer strategies)
* Create GUI version using tkinter
* Add sound effects and animations

---

## 📝 Quiz 5: Rock Paper Scissors Game

**Q1. What is the best data structure to store win conditions?**
- A) List
- B) Dictionary
- C) Tuple
- D) Set

<details>
<summary>Show Answer</summary>
**Answer: B) Dictionary**

A dictionary efficiently maps each choice to what it beats, making the win logic simple and readable.
</details>

**Q2. How does `random.choice()` work?**
- A) It removes an item from the list
- B) It returns a random item from a sequence
- C) It sorts the list randomly
- D) It creates a new random list

<details>
<summary>Show Answer</summary>
**Answer: B) It returns a random item from a sequence**

`random.choice()` randomly selects and returns one element from a non-empty sequence.
</details>

---

## Project 6: Simple Quiz Game

### 🎯 Concepts Covered:
* Lists and dictionaries
* Loops
* Score calculation
* Data organization

### 📝 Project Description:
A quiz game that asks multiple-choice questions and tracks the score.

### 💻 Complete Code:

```python
def load_questions():
    """Load quiz questions"""
    questions = [
        {
            'question': 'What is the capital of France?',
            'options': ['A) London', 'B) Berlin', 'C) Paris', 'D) Madrid'],
            'answer': 'C'
        },
        {
            'question': 'What is 2 + 2?',
            'options': ['A) 3', 'B) 4', 'C) 5', 'D) 6'],
            'answer': 'B'
        },
        {
            'question': 'Which planet is known as the Red Planet?',
            'options': ['A) Venus', 'B) Mars', 'C) Jupiter', 'D) Saturn'],
            'answer': 'B'
        },
        {
            'question': 'What is the largest mammal in the world?',
            'options': ['A) Elephant', 'B) Blue Whale', 'C) Giraffe', 'D) Polar Bear'],
            'answer': 'B'
        },
        {
            'question': 'In which year did World War II end?',
            'options': ['A) 1943', 'B) 1944', 'C) 1945', 'D) 1946'],
            'answer': 'C'
        }
    ]
    return questions

def display_question(question_num, question_data):
    """Display a single question"""
    print(f"\n{'='*50}")
    print(f"Question {question_num}")
    print('='*50)
    print(f"\n{question_data['question']}\n")
    for option in question_data['options']:
        print(f"  {option}")
    print()

def quiz_game():
    """Main quiz game function"""
    print("🎓 " + "="*50)
    print("   WELCOME TO THE QUIZ GAME!")
    print("="*50)
    print("\nAnswer each question by typing A, B, C, or D")
    print("Let's test your knowledge!\n")
    
    input("Press Enter to start...")
    
    # Load questions
    questions = load_questions()
    score = 0
    total_questions = len(questions)
    
    # Ask each question
    for i, question in enumerate(questions, 1):
        display_question(i, question)
        
        # Get user answer
        while True:
            user_answer = input("Your answer: ").upper().strip()
            if user_answer in ['A', 'B', 'C', 'D']:
                break
            print("❌ Invalid input! Please enter A, B, C, or D.")
        
        # Check answer
        if user_answer == question['answer']:
            print("✅ Correct! Well done!")
            score += 1
        else:
            print(f"❌ Wrong! The correct answer was {question['answer']}")
        
        input("\nPress Enter for next question...")
    
    # Display final results
    print("\n" + "="*50)
    print("   QUIZ COMPLETED!")
    print("="*50)
    print(f"\n📊 Your Score: {score}/{total_questions}")
    
    # Calculate percentage
    percentage = (score / total_questions) * 100
    print(f"📈 Percentage: {percentage:.1f}%")
    
    # Grade
    if percentage >= 90:
        grade = "A+ 🌟"
        message = "Outstanding! You're a genius!"
    elif percentage >= 80:
        grade = "A 😊"
        message = "Excellent work!"
    elif percentage >= 70:
        grade = "B 👍"
        message = "Good job!"
    elif percentage >= 60:
        grade = "C 😐"
        message = "Not bad, but you can do better!"
    else:
        grade = "F 😞"
        message = "Keep studying and try again!"
    
    print(f"🎯 Grade: {grade}")
    print(f"💬 {message}")
    print("\n" + "="*50)
    print("Thanks for playing!")

# Run the quiz
if __name__ == "__main__":
    quiz_game()
```

### 🔍 How It Works:

1. **Data Structure**: List of dictionaries for questions
2. **Loop Through Questions**: Enumerate for question numbering
3. **Input Validation**: While loop ensures valid answer format
4. **Score Tracking**: Increment score for correct answers
5. **Grading System**: Calculate percentage and assign grade

### 🚀 Extensions:

* Load questions from external file (JSON/CSV)
* Add multiple quiz categories
* Implement timer for each question
* Add lifelines (50:50, skip question)
* Create leaderboard system
* Add difficulty levels

---

## 📝 Final Quiz: Comprehensive Project Review

**Q1. What is the main benefit of organizing questions as a list of dictionaries?**
- A) It makes the code shorter
- B) It allows easy addition/modification of questions and structured data access
- C) It makes the code run faster
- D) It's required by Python

<details>
<summary>Show Answer</summary>
**Answer: B) It allows easy addition/modification of questions and structured data access**

Using a list of dictionaries makes the quiz scalable and maintains a clear structure for each question's data.
</details>

**Q2. Which project concept is common across most of these projects?**
- A) File handling
- B) User input and validation
- C) Database operations
- D) Web scraping

<details>
<summary>Show Answer</summary>
**Answer: B) User input and validation**

All projects require user input and proper validation to ensure the program works correctly with various inputs.
</details>

**Q3. Why is error handling important in these projects?**
- A) To make the code longer
- B) To prevent crashes from invalid user input
- C) It's not important
- D) To slow down the program

<details>
<summary>Show Answer</summary>
**Answer: B) To prevent crashes from invalid user input**

Error handling (try-except blocks) prevents programs from crashing when users enter unexpected input.
</details>

**Q4. What programming concept is demonstrated by breaking code into functions?**
- A) Recursion
- B) Inheritance
- C) Modular programming
- D) Polymorphism

<details>
<summary>Show Answer</summary>
**Answer: C) Modular programming**

Breaking code into functions is modular programming, which improves code organization, reusability, and maintainability.
</details>

**Q5. Which project would be best to learn about data structures?**
- A) Number Guessing Game
- B) Calculator
- C) To-Do List or Quiz Game
- D) Rock Paper Scissors

<details>
<summary>Show Answer</summary>
**Answer: C) To-Do List or Quiz Game**

---

🎉 **Congratulations!** You've mastered many Programs and made Small projects. Now make more projects !! Happy Coding