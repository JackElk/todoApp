import "../pages/style.css";
import {Task} from "../types";

class TodoApp {
    private tasks: Task[] = [];
    private input: HTMLInputElement;
    private addBtn: HTMLButtonElement;
    private toDoList: HTMLTableSectionElement;

    constructor() {
        this.input = document.getElementById('todo-input') as HTMLInputElement;
        this.addBtn = document.getElementById('add-btn') as HTMLButtonElement;
        this.toDoList = document.getElementById('todo-body') as HTMLTableSectionElement;

        this.addBtn.addEventListener('click', this.handleAddClick.bind(this));
    }

    private handleAddClick(): void {
        const text = this.input.value.trim();
        if (!text) return;
        if (this.tasks.length >= 3) {
            alert("You can't add more than 3 tasks");
            return;
        }

        const newTask: Task = {
            text,
            date: new Date().toLocaleDateString('en-GB'),
            done: false
        };
        this.addTask(newTask);
    }

    private addTask(task: Task): void {
        this.tasks.push(task);
        const row = this.createTaskRow(task);
        this.toDoList.appendChild(row);
        this.input.value = '';
    }

    private createTaskRow(task: Task): HTMLTableRowElement {
        const row = document.createElement('tr');

        const taskCell = document.createElement('td');
        taskCell.textContent = task.text;

        const dateCell = document.createElement('td');
        dateCell.textContent = task.date;

        const statusCell = document.createElement('td');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.done;
        checkbox.addEventListener('change', () => task.done = checkbox.checked);
        statusCell.appendChild(checkbox);

        const deleteCell = document.createElement('td');
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '✖';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => this.removeTask(task, row));
        deleteCell.appendChild(deleteBtn);

        row.append(taskCell, dateCell, statusCell, deleteCell);
        return row;
    }

    private removeTask(task: Task, row: HTMLTableRowElement): void {
        row.remove();
        this.tasks = this.tasks.filter(t => t !== task);
    }
}

document.addEventListener('DOMContentLoaded', () => new TodoApp());