const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-btn');
const todoList = document.querySelector('.task-list');
const filterTask = document.querySelector('.todo-filter');
const modalBtn = document.querySelector('#modal-btn');
const modalBox = document.querySelector('.modal');

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterTask.addEventListener('click', filterTodo);
modalBtn.addEventListener('click', ()=>{modalBox.classList.toggle('show');})

function createElement(elementType, parentElement, className) {
    const element = document.createElement(elementType);
    if (className) {
        element.className = className;
    }
    parentElement.appendChild(element);
    return element;
}

function addTodo(event) {
    event.preventDefault();

    const todoDiv = createElement('div', todoList, 'todo');

    const newTodo = createElement('li', todoDiv, 'todo-item');
    newTodo.innerText = todoInput.value;
    saveLocalTodos(todoInput.value);
    todoInput.value = '';

    const completeBtn = createElement('button', todoDiv, 'complete-btn');
    completeBtn.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';

    const trashBtn = createElement('button', todoDiv, 'trash-btn');
    trashBtn.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
}

function deleteCheck(event) {
    const item = event.target;

    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall');

        removeLocalTodos(todo);
        todo.addEventListener('transitionend', (e) => {
            todo.remove();
        });
    }
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach((todo) => {
        switch (event.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
        }
    });
}

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        todoInput.value = '';

        const completedButton = document.createElement('button');
        completedButton.innerHTML = `<i class="fas fa-check"></i>`;
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement('button');
        trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}