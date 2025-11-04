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

    // Parse priority flag
    let priority = 'medium';
    let cleanDescription = description.trim();
    let dueDate = null;

    // Match priority match dengan regex
    const priorityMatch = description.match(/--priority\s+(high|medium|low)/i);
    if (priorityMatch) {
        priority = priorityMatch[1].toLowerCase();
        cleanDescription = description.replace(/--priority\s+(high|medium|low)/i, '').trim();
    }

    // Parse due date flag dengan regex
    const dueDateMatch = description.match(/--due\s+(\d{4}-\d{2}-\d{2})/);
    if (dueDateMatch) {
        dueDate = dueDateMatch[1];
        cleanDescription = cleanDescription.replace(/--due\s+\d{4}-\d{2}-\d{2}/, '').trim();
    }

    const todos = loadTodos();
    const newTodo = {
        id: Date.now(),
        description: cleanDescription,
        completed: false,
        priority: priority,
        dueDate: dueDate,
        createdAt: new Date().toISOString()
    };

    todos.push(newTodo);
    saveTodos(todos);

    const priorityEmoji = priority === 'high' ? '🔴' : priority === 'medium' ? '🟡' : '🟢';

    console.log("✅ Task added successfully!");
    console.log(`   ID: ${newTodo.id}`);
    console.log(`   Task: ${newTodo.description}`);
    console.log(`   Priority: ${priorityEmoji} ${priority.toUpperCase()}`);
    if (dueDate) {
        console.log(`   Due Date: 📅 ${dueDate}`);
    }
}

// Function - list tugas
function listTasks() {
    const todos = loadTodos();

    // Parse filter flags
    const args = process.argv.slice(3);
    const showCompleted = args.includes('--completed');
    const showPending = args.includes('--pending');

    let filteredTodos = todos;
    let filterLabel = '';

    if (showCompleted) {
        filteredTodos = todos.filter(todo => todo.completed);
        filterLabel = ' (Completed)';
    } else if (showPending) {
        filteredTodos = todos.filter(todo => !todo.completed);
        filterLabel = ' (Pending)';
    }

    if (todos.length === 0) {
        console.log('📝 No tasks yet! Add one with: todo add "your task"');
        return;
    }

    if (filteredTodos.length === 0) {
        console.log(`📝 No${filterLabel.toLowerCase()} tasks found!`);
        return;
    }

    console.log(`\n📋 You have ${filteredTodos.length} task(s)${filterLabel}:\n`);
    filteredTodos.forEach((todo, index) => {
        const status = todo.completed ? '✓' : '○';
        const priority = todo.priority || 'medium';
        const priorityEmoji = priority === 'high' ? '🔴' : priority === 'medium' ? '🟡' : '🟢';

        let taskLine = `${index + 1}. [${status} ${priorityEmoji} ${todo.description}]`;

        if (todo.dueDate) {
            const today = new Date().toISOString().split('T')[0];
            const isOverdue = todo.dueDate < today && !todo.completed;
            const dueDateEmoji = isOverdue ? '⚠️' : '📅';
            taskLine += ` ${dueDateEmoji} ${todo.dueDate}`;
        }

        taskLine += ` (ID: ${todo.id})`;
        console.log(taskLine);
    });
    console.log('');
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

// Function - tampilkan satistik dari total tugas
function showStats() {

    // Destructuring logic
    const todos = loadTodos();
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const pending = total - completed;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    console.log('\n📊 Task Statistics\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📝 Total Tasks:    ${total}`);
    console.log(`✅ Completed:      ${completed}`);
    console.log(`⏳ Pending:        ${pending}`);
    console.log(`📈 Progress:       ${percentage}%`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    // Progress bar
    const barLength = 20;
    const filledLength = Math.round((percentage / 100) * barLength);
    const emptyLength = barLength - filledLength;
    const progressBar = '█'.repeat(filledLength) + '░'.repeat(emptyLength);

    console.log(`\n[${progressBar} ${percentage}%]\n`);

    // Motivational message
    switch(true) {
        case (percentage === 100):
            console.log('🎉 Amazing! All tasks completed!');
            break;
        case (percentage >= 75):
            console.log('💪 Great progress! Keep it up!');
            break;
        case (percentage >= 50):
            console.log("👍 You're halfway there!");
            break;
        case (percentage >= 25):
            console.log('🚀 Good start! Keep going!');
            break;
        case (percentage > 0):
            console.log('🌱 Every journey starts with a single step!');
            break;
        default:
            console.log('💡 Time to start checking off those tasks!');
        console.log();
    }
}

// Function - cari tugas
function searchTasks(keyword) {
    if (!keyword || keyword.trim() === '') {
        console.log('Error: Please provide a search keyword!');
        console.log('   Usage: todo search <keyword>');
        return;
    }

    const todos = loadTodos();
    const searchTerm = keyword.toLowerCase();
    const results = todos.filter(todo =>
        todo.description.toLowerCase().includes(searchTerm)
    );

    if (results.length === 0) {
        console.log(`🔍 No tasks found matching "${keyword}"`);
        return;
    }

    console.log(`\n🔍 Found ${results.length} task(s) matching "${keyword}:\n`);
    results.forEach((todo, index) => {
        const status = todo.completed ? '✓' : '○';
        const priority = todo.priority || 'medium';
        const priorityEmoji = priority === 'high' ? '🔴' : priority === 'medium' ? '🟡' : '🟢';

        let taskLine = `${index + 1}. [${status}] ${priorityEmoji} ${todo.description}`;

        if (todo.dueDate) {
            const today = new Date().toISOString().split('T')[0];
            const isOverdue = todo.dueDate < today && !todo.completed;
            const dueDateEmoji = isOverdue ? '⚠️' : '📅';
            taskLine += ` ${dueDateEmoji} ${todo.dueDate}`;
        }

        taskLine += ` (ID: ${todo.id})`;
        console.log(taskLine);
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

    case 'stats':
    case 'statistics':
    case 'status':
        showStats();
        break;

    case 'search':
    case 'find':
        const searchKeyword = args.join(' ');
        searchTasks(searchKeyword);
        break;

    default:
        console.log('------------------------------------------------------------------');
        console.log('📝 Todo CLI - Simple Task Manager\n');
        console.log('Usage:');
        console.log(' • todo add <task>                              - Add new task');
        console.log(' • todo add <task> --priority <high|medium|low> - Add task with priority');
        console.log(' • todo add <task> --due <YYYY-MM-DD>           - Add task with due date');
        console.log(' • todo list                                    - Show all tasks');
        console.log(' • todo list --completed                        - Show only completed tasks');
        console.log(' • todo list --pending                          - Show only pending tasks');
        console.log(' • todo search / find <keyword>                 - Search tasks by keyword');
        console.log(' • todo delete / remove / rm <id>               - Delete task by ID');
        console.log(' • todo done / completed / finish <id>          - Mark task as complete');
        console.log(' • todo undone / uncomplete / incomplete <id>   - Mark task as incomplete');
        console.log(' • todo update <id> <new description>           - Update task');
        console.log(' • todo clear / clean                           - Delete all completed tasks');
        console.log(' • todo stats / statistics / status             - Show task statistics');
        console.log('------------------------------------------------------------------');
        console.log('\nExample:');
        console.log('   todo add "Buy groceries in Alfamidi"');
        console.log('   todo add "Fix bugs       - project node.js" --priority high');
        console.log('   todo add "Test app       - project node.js" --priority high');
        console.log('   todo add "Changelog docs - project node.js" --priority low');
        console.log('   todo add "Fix bugs       - project node.js" --priority high --due 2025-11-04');
        console.log('   todo list');
        console.log('   todo list --completed');
        console.log('   todo list --pending');
        console.log('   todo search "bug"');
        console.log('   todo done 1730448000000');
        console.log('   todo undone 1730448000000');
        console.log('   todo update 1730448000000 "Buy groceries at Indomaret"');
        console.log('   todo stats');
        console.log('   todo delete 1730448000000');
        console.log('   todo clear');
        console.log();
}
