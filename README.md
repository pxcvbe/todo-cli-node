# Todo CLI Node.js

A `feature-rich command-line todo list manager` built with `Node.js`. Stay organized with **``priorities``**, **``due dates``**, **``tags``**, and **``more!``**

[![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Jetbrains+Mono&size=14&pause=1000&color=0DBBAD&width=900&lines=Created+By%3A+Ivan.K)](https://git.io/typing-svg)
---

### The Program Looks Like
<img width="876" height="586" alt="image" src="https://github.com/user-attachments/assets/5f1a0f52-0d8e-474a-b68a-24e6e1bf8427" />

### ⿻ Clone Repo
```bash
git clone https://github.com/pxcvbe/todo-cli-node.git
```
**Or you can just download the _.zip_ files 👌**

## ⬇️ Installation
```bash
npm install
```

## Usage (Example)
#### 🚀 Add Task:
```bash
• node index.js add "Cooking water for 12 minutes"      # Default

# Test priority
• node index.js add "Urgent bug fix" --priority high    # Priority -> high
• node index.js add "Code review" --priority medium     # Priority -> medium
• node index.js add "Update docs" --priority low        # Priority -> low

# Test due date
node index.js add "Submit report" --due 2024-12-15
node index.js add "Fix critical bug" --priority high --due 2024-11-05
```
#### 📋 List Task:
```bash
• node index.js list               # Show all

# Test filter
• node index.js list --completed   # Show only completed
• node index.js list --pending     # Show only pending
```
#### ✅ Complete Task (Mark as Complete):
```bash
• node index.js done <id>
• node index.js completed <id>
• node index.js finish <id>
```
#### 🗑️ Delete Task:
```bash
• node index.js delete <id>
• node index.js remove <id>
• node index.js rm <id>
```
#### 🛠️ Update / Edit Task:
```bash
• node index.js update <id> "<new description>"
• node index.js edit <id> "<new description>"
```
#### ⛔ Uncomplete A Task:
```bash
• node index.js undone <id>
• node index.js uncomplete <id>
• node index.js incomplete <id>
```
#### 🧹 Clean or Clear All Completed Tasks:
```bash
• node index.js clear
• node index.js clean
```
#### 📊 Show Statistics Task:
```bash
• node index.js stats
• node index.js statistics
• node index.js status
```
#### 🔎 Search Task:
```bash
node index.js search "<keywords>"
```
#### 📤 Export File:
```bash
node index.js export
```
#### 📥 Import File:
```bash
node index.js import <filename>
```

## 📝 Run Examples
```bash
# Add tasks with different priorities
node index.js add "Critical bug" --priority high --tag work
node index.js add "Code review" --priority medium --tag work
node index.js add "Update docs" --priority low --tag work

# Add personal tasks
node index.js add "Buy birthday gift" --priority high --due 2024-11-20 --tag personal
node index.js add "Book dentist appointment" --tag personal

# Work with tasks
node index.js list --pending
node index.js search "bug"
node index.js done 1234567890
node index.js stats

# Backup your tasks with export features
node index.js export
```

### Command Aliases
- `delete` = `remove` = `rm`
- `done` = `complete` = `finish`
- `undone` = `uncomplete` = `incomplete`
- `update` = `edit`
- `clear` = `clean`
- `stats` = `statistics` = `status`
- `search` = `find`

## Statistics Example
```bash
→ user@DESKTOP-12345 ~ $ node index.js stats

📊 Task Statistics

━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 Total Tasks:      10
✅ Completed:        7
⏳ Pending:          3
📈 Progress:         70%
━━━━━━━━━━━━━━━━━━━━━━━━━━━

[██████████████░░░░░░] 70%

💪 Great progress! Keep it up!
```

## 🎨 Visual Indicators
```
• Priority: 🔴 High | 🟡 Medium | 🟢 Low
• Status: ✓ Completed | ○ Pending
• Due Date: 📅 Normal | ⚠️ Overdue
• Tag: 🏷️ Category label
```

## 📁 Data Storage
Tasks are stored in **``todos.json``** in the project directory. You can backup this file or use the export/import commands.

## Features
- ✅ Add tasks
- ✅ List tasks
- ✅ Delete tasks
- ✅ Mark as complete
- ✅ Update / Edit tasks
- ✅ Uncomplete task - Return task to incomplete status
- ✅ Clear completed tasks
- ✅ Show stats
- ✅ Filter tasks
- ✅ Due dates
- ✅ Priority levels
- ✅ Categories/Tags
- ✅ Search tasks
- ✅ Export/Import
