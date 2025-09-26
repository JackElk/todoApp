const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const toDoList = document.getElementById('todo-body');

const tasks = []

function addTask(task) {
    tasks.push(task);

    const taskRow = document.createElement('tr');

    const taskCell = document.createElement('td');
    taskCell.textContent = task.text;

    const dateCell = document.createElement('td');
    dateCell.textContent = task.date

    const statusCell = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', () => {
        task.done = checkbox.checked;
    });
    statusCell.appendChild(checkbox);

    const deleteCell = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✖';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
        taskRow.remove();
        const index = tasks.indexOf(task);
        if (index > -1) {
            tasks.splice(index, 1);
        }
    });
    deleteCell.appendChild(deleteBtn);

    taskRow.append(taskCell, dateCell, statusCell, deleteCell);
    toDoList.appendChild(taskRow);
    input.value = '';
}


addBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) return;
    if (tasks.length > 2) {
        alert('you can\'t add more than 3 tasks')
        return;
    }
    const task = {
        text: text,
        date: new Date().toLocaleDateString('en-GB'),
        done: false
    }
    addTask(task);
});
