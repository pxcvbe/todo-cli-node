const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'todos.json')

// Inisial data, jika belum ada
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
}

// Helper functions -- muat todos
function loadTodos() {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
}
// Helper functions -- simpan todos
function saveTodos(todos) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
}

// Functions - tambah tugas
function addTask(description) {
    if (!description || description.trim() === '') {
        console.error("Error: Task description cannot be empty!");
        return;
    }

    const todos = loadTodos();
    const newTodo = {
        id: Date.now(),
        description: description.trim(),
        completed: false,
        createdAt: new Date().toISOString()
    };

    todos.push(newTodo);
    saveTodos(todos);

    console.log("✅ Task added successfully!");
    console.log(`ID: ${newTodo.id}`);
    console.log(`Task: ${newTodo.description}`);
}

// Function - list tugas
function listTasks() {
    const todos = loadTodos();

    if (todos.length === 0) {
        console.log('📝 No tasks yet! Add one with: todo add "your task"');
        return;
    }

    console.log(`\n📋 You have ${todos.length} task(s):\n`);
    todos.forEach((todo, index) => {
        const status = todo.completed ? '✓' : '○';
        console.log(`${index + 1}. [${status}] ${todo.description} (ID: ${todo.id})`);
    });
    console.log(``);
}

// Function - hapus tugas
function deleteTask(taskId) {
    if (!taskId) {
        console.log('Error: Please provide a task ID!');
        console.log('   Usage: todo delete <id>');
        return;
    }

    const id = parseInt(taskId);
    if (isNaN(id)) {
        console.log('Error: Invalid task ID! ID must be a number.');
    }

    const todos = loadTodos();
    const taskIndex = todos.findIndex(todo => todo.id === id);

    if (taskIndex === -1) {
        console.log(`Error: Task with ID ${id} not found!`);
        console.log('   Use "todo list" to see all tasks.');
        return;
    }

    const deletedTask = todos[taskIndex];
    todos.splice(taskIndex, 1);
    saveTodos(todos);

    console.log('🗑️ Task deleted successfully!');
    console.log(`✅ Deleted: ${deletedTask.description}`);
}

// Function - tugas selesai (dengan status ditandai ✓)
function completeTask(taskId) {
    if (!taskId) {
        console.log('Error: Please povide a task ID!');
        console.log('   Usage: todo done <id>');
        return;
    }

    const id = parseInt(taskId);
    if (isNaN(id)) {
        console.log('Error: Invalid task ID! ID must be a number.');
        return;
    }

    const todos = loadTodos();
    const task = todos.find(todo => todo.id === id);

    if (!task) {
        console.log(`Error: Task with ID ${id} not found!`);
        console.log('   Use "todo list" to see all tasks.');
        return;
    }

    if (task.completed) {
        console.log('ℹ️ Task is already completed!');
        console.log(`   Task: ${task.description}`);
        return;
    }

    task.completed = true;
    task.completedAt = new Date().toISOString();
    saveTodos(todos);

    console.log('✅ Task marked as complete!');
    console.log(`   ✓ ${task.description}`);
}

// Function - memperbarui / mengubah tugas
function updateTask(taskId, newDescription) {
    if (!taskId) {
        console.log('Error: Please provide a task ID!');
        console.log('   Usage: todo update <id> <new description>');
        return;
    }

    if (!newDescription || newDescription.trim() === '') {
        console.log('Error: New description cannot be empty!');
        console.log('   Usage: todo update <id> <new description>');
        return;
    }

    const id = parseInt(taskId);
    if (isNaN(id)) {
        console.log('Error: Invalid task ID! ID must be a number.');
        return;
    }

    const todos = loadTodos();
    const task = todos.find(todo => todo.id === id);

    if (!task) {
        console.log(`Error: Task with ID ${id} not found!`);
        console.log('   Use "todo list" to see all tasks.');
        return;
    }

    const oldDescription = task.description;
    task.description = newDescription.trim();
    task.updateAt = new Date().toISOString();
    saveTodos(todos);

    console.log('✏️ Task updated successfully');
    console.log(`   Old: ${oldDescription}`);
    console.log(`   New: ${newDescription}`);
}

// Function - kembalikan task ke status 'incomplete'
function uncompleteTask(taskId) {
    if (!taskId) {
        console.log('Error: Please provide a task ID!');
        console.log('   Usage: todo undone <id>');
        return;
    }

    const id = parseInt(taskId);
    if (isNaN(id)) {
        console.log('Error: Invalid task ID! ID must be a number.');
        return;
    }

    const todos = loadTodos();
    const task = todos.find(todo => todo.id === id);

    if (!task) {
        console.log(`Error: Task with ID ${id} not found!`);
        console.log('   Use "todo list" to see all tasks.');
        return;
    }

    if (!task.completed) {
        console.log('ℹ️  Task is not completed yet!');
        console.log(`   Task: ${task.description}`);
        return;
    }

    task.completed = false;
    delete task.completedAt;
    saveTodos(todos);

    console.log('🔄 Task marked as incomplete!');
    console.log(`   ○ ${task.description}`);
}

// Function - hapus semua task yang sudah done
function clearCompleted() {
    const todos = loadTodos();
    const completedTasks = todos.filter(todo => todo.completed);

    if (completedTasks.length === 0) {
        console.log('ℹ️  No completed tasks to clear!');
        return;
    }

    const remainingTasks = todos.filter(todo => !todo.completed);
    saveTodos(remainingTasks);

    console.log(`🧹 Cleared ${completeTask.length} completed task(s)!`);
    console.log(`   Remaining tasks: ${remainingTasks.length}`);
}

// Command parser
const command = process.argv[2];
const args = process.argv.slice(3);

switch (command) {
    case 'add':
        const taskDescription = args.join(' ');
        addTask(taskDescription);
        break;

    case 'list':
        listTasks();
        break;

    case 'delete':
    case 'remove':
    case 'rm':
        deleteTask(args[0]);
        break;
    
    case 'done':
    case 'completed':
    case 'finish':
        completeTask(args[0]);
        break;

    case 'update':
    case 'edit':
        const newDesc = args.slice(1).join(' ');
        updateTask(args[0], newDesc);
        break;

    case 'undone':
    case 'uncomplete':
    case 'incomplete':
        uncompleteTask(args[0]);
        break;

    case 'clear':
    case 'clean':
        clearCompleted();
        break;

    default:
        console.log('------------------------------------------------------------------');
        console.log('📝 Todo CLI - Simple Task Manager\n');
        console.log('Usage:');
        console.log(' • todo add <task>                            - Add new task');
        console.log(' • todo list                                  - Show all tasks');
        console.log(' • todo delete / remove / rm <id>             - Delete task by ID');
        console.log(' • todo done / completed / finish <id>        - Mark task as complete');
        console.log(' • todo undone / uncomplete / incomplete <id> - Mark task as incomplete');
        console.log(' • todo update <id> <new description>         - Update task');
        console.log(' • todo clear                                 - Delete all completed tasks');
        console.log('------------------------------------------------------------------');
        console.log('\nExample:');
        console.log('   todo add "Buy groceries in Alfamidi"');
        console.log('   todo list');
        console.log('   todo done 1730448000000');
        console.log('   todo undone 1730448000000');
        console.log('   todo update 1730448000000 "Buy groceries at Indomaret"');
        console.log('   todo delete 1730448000000');
        console.log('   todo clear');
        console.log();
}
