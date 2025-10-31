const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'todos.json')

// Inisial data, jika belum ada
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
}

const command = process.argv[2];
const args = process.argv.slice(3);

switch (command) {
    case 'add':
        console.log('Add feature - Coming soon!');
        break
    case 'list':
        console.log('List feature - Coming soon!');
        break;
    default:
        console.log('Todo CLI - Usage:');
        console.log('   todo add    - Add new task');
        console.log('   todo list    - Show all tasks');
}