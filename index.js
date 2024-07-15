document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // Load todos from local storage
    const todos = JSON.parse(localStorage.getItem('todos')) || [];

    // Function to save todos to local storage
    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // Function to render todos
    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = todo.completed ? 'completed' : '';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = todo.completed;
            checkbox.addEventListener('change', function() {
                todos[index].completed = checkbox.checked;
                saveTodos();
                renderTodos();
            });

            li.appendChild(checkbox);

            const span = document.createElement('span');
            span.textContent = todo.text;
            li.appendChild(span);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', function() {
                todos.splice(index, 1);
                saveTodos();
                renderTodos();
            });

            li.appendChild(deleteButton);
            todoList.appendChild(li);
        });
    }

    // Event listener for form submission
    todoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const newTodo = { text: todoInput.value, completed: false };
        todos.push(newTodo);
        todoInput.value = '';
        saveTodos();
        renderTodos();
    });

    // Initial render
    renderTodos();
});
