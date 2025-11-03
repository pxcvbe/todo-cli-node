# Todo CLI Node.js

A simple yet powerful command-line todo list manager built with Node.js by Ivan K

### Clone Repo
```bash
git clone https://github.com/pxcvbe/todo-cli-node.git
```
**Or you can just download the _.zip_ files 👌**

## Installation
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
• node index.js update <id> <new description> 
• node index.js edit <id> <new description> 
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
- [ ] Due dates
- ✅ Priority levels
- [ ] Categories/Tags
- [ ] Search tasks
- [ ] Export/Import