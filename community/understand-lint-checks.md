---
id: understand-lint-checks
title: Understand Checks before PR
sidebar_label: Understand Checks before PR
sidebar_position: 3
---
# 🧠 Recode Python Backend Development Guide

Welcome to Recode! To maintain a high standard of code quality, we follow a strict development and pull request process.  
Before submitting your PR, please **follow the instructions below and attach a screenshot of the checks passed**.

---

## 📦 Prerequisites

- Python **3.8 or higher**
- `pip` (Python package installer)
- Git

---

## 🛠️ Tools and Configuration

### 🔧 Core Linting and QA Tools

We use the following tools to enforce code quality:

- `flake8`: Enforces PEP8 compliance
- `black`: Code formatting with 88-char line width
- `isort`: Automatically sorts imports
- `mypy`: Static type checking with strict rules
- `bandit`: Security vulnerability scanning
- `safety`: Checks for insecure packages
- `pre-commit`: Git hook to ensure checks are run before commit

### ⚙️ Config Files

| File                      | Purpose                                                             |
|---------------------------|---------------------------------------------------------------------|
| `.flake8`                 | Linting rules with complexity settings                              |
| `pyproject.toml`          | Central config for `black`, `isort`, `mypy`, and `coverage`         |
| `.pre-commit-config.yaml` | Pre-commit setup for linting, typing, formatting, and security      |
| `requirements-dev.txt`    | Dev dependencies with fixed versions                                |
| `.github/workflows/lint.yml` | CI/CD workflow for automated PR checks                           |
| `Makefile`                | Common commands for easy use                                        |

---

## 🧪 Development Setup

### 🔄 Install Dev Dependencies

```bash
pip install -r requirements-dev.txt
pre-commit install


📋 Makefile Commands
Use these commands for a smooth workflow:

make install     # Set up the development environment
make format      # Auto-format code (black + isort)
make lint        # Run flake8, mypy, bandit, etc.
make test        # Run tests with coverage report
make all         # Run everything above in sequence


🧹 Code Quality Checks
🖤 Code Formatting

black .
isort .

🧭 Code Quality Standards
| Standard             | Tool(s)            |
| -------------------- | ------------------ |
| PEP 8 Compliance     | `flake8`           |
| Formatting (88-char) | `black`            |
| Sorted Imports       | `isort`            |
| Static Typing        | `mypy`             |
| Security Checks      | `bandit`, `safety` |
| Git Hook Automation  | `pre-commit`       |
| Test Coverage        | `pytest --cov`     |


📁 Project Structure
📁 backend/
├── __init__.py                  # Package initialization
├── user_service.py              # Service logic with type hints
├── test_user_service.py         # Pytest-based test suite
📁 docs/python/
└── code-quality-setup.md        # Developer setup guide


🚀 GitHub Actions Integration
Our CI/CD pipeline automatically runs on every pull request and includes:

Python versions: 3.8, 3.9, 3.10, 3.11

Code formatting validation (black)

Linting and static typing checks (flake8, mypy)

Security scanning (bandit, safety)

Test execution and coverage report

📸 Pull Request Submission Checklist
Before opening a pull request:

✅ Run make all to ensure all checks pass

✅ Run python validate_config.py

📸 Take a screenshot showing the terminal output

📎 Attach the screenshot as a comment in your PR

🧪 Config Validation Script
Run this before submitting a PR:

bash
Copy
Edit
python validate_config.py
You should see:

pgsql
Copy
Edit
✓ All checks passed! Python linting infrastructure is ready.



🧹 Code Quality Checks
🖤 Code Formatting
bash
Copy
Edit
black .
isort .
🧪 Linting & Typing
bash
Copy
Edit
flake8 .
mypy .
🔐 Security Scans
bash
Copy
Edit
bandit -r .
safety check
🔁 Run Pre-commit on All Files
bash
Copy
Edit
pre-commit run --all-files
🧪 Testing
Run Unit Tests
bash
Copy
Edit
pytest
Run Tests with Coverage Report
bash
Copy
Edit
pytest --cov=. --cov-report=html
## License

This project is licensed under the [MIT License](/License).