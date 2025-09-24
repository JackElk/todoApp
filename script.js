const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const toDoList = document.getElementById('todo-body');

const tasks = []

function addTask(task) {
    tasks.push(task);

    const tr = document.createElement('tr');

    const taskTd = document.createElement('td');
    taskTd.textContent = task.text;

    const dateTd = document.createElement('td');
    dateTd.textContent = task.date

    const doneTd = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    checkbox.addEventListener('change', () => {
        task.done = checkbox.checked;
    });
    doneTd.appendChild(checkbox);

    const actionTd = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✖';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
        tr.remove();
        const index = tasks.indexOf(task);
        if (index > -1) {
            tasks.splice(index, 1);
        }
    });

    actionTd.appendChild(deleteBtn);
    tr.append(taskTd, dateTd, doneTd, actionTd);
    toDoList.appendChild(tr);
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
