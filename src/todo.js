const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-btn');
const todoList = document.querySelector('.task-list');
const filterTask = document.querySelector('.todo-filter');

document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteTodo);
filterTask.addEventListener('click', filterTodo);

function addTodo(event) {
    event.preventDefault();

    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')

    const newTodo = document.createElement('li')
    newTodo.innerText = todoInput.value;
    saveLocalTodos(todoInput.value);
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    todoInput.value = '';
    
    const completeBtn = document.createElement('button');
    completeBtn.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
    completeBtn.classList.add('complete-btn');
    todoDiv.appendChild(completeBtn);

    const trashBtn = document.createElement('button');
    trashBtn.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    trashBtn.classList.add('trash-btn');
    todoDiv.appendChild(trashBtn);
    todoList.appendChild(todoDiv);
    
}

// function deleteCheck(event) {
//     const item = event.target;

//     if (item.classList[0] === 'trash-btn') {
//         const todo = item.parentElement;
//         todo.classList.add('fall')
//         removeLocalTodos(todo);
//         todo.addEventListener('transitioned', () => {
//             todo.remove();
//         });
//     }
//     if (item.classList[0] === 'complete-btn') {
//         const todo = item.parentElement;
//         todo.classList.toggle('completed')
//     }
// }

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
    })
}

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos))
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



function deleteTodo(e) {
    const item = e.target;

    if (item.classList[0] === 'trash-btn') {
        // e.target.parentElement.remove();
        const todo = item.parentElement;
        todo.classList.add('fall');
        //at the end
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', (e) => {
            todo.remove();
        });
    }
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
        console.log(todo);
    }
}

