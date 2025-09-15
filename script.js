const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const toDoList = document.getElementById('todo-list');

const tasks = []

function addTask(text) {
    tasks.push(text);

    const li = document.createElement('li');
    li.textContent = text;
    toDoList.appendChild(li);
    input.value = '';
}

addBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) return;    // call the separate function
    if (tasks.length > 2) {
        alert('you can\'t add more than 3 tasks')
        return;
    }
    addTask(text);
});

