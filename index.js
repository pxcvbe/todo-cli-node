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

    default:
        console.log('📝 Todo CLI - Simple Task Manager\n');
        console.log('Usage:');
        console.log('   todo add <task>    - Add new task');
        console.log('   todo list          - Show all tasks');
        console.log('\nExample:');
        console.log('   todo add "Buy groceries in Alfamidi"');
        console.log('   todo list');
}