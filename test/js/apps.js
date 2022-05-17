let todoInput = document.querySelector('.taskInput');
let taskButton = document.querySelector('.addTask');
let todoList = document.querySelector('.todoList');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
taskButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

function addTodo(event) {
    event.preventDefault();
    
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    
    //create Li
    const newTodo = document.createElement('li'); 
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo); 
    //ADD TODO TO LOCALSTORAGE
    saveLocalTodos(todoInput.value);
    // Check mark button
    const checkedButton = document.createElement('button');
    checkedButton.innerHTML = '<i class="bi bi-check"></i>';
    checkedButton.classList.add('complete-btn');
    todoDiv.appendChild(checkedButton);
    // trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="bi bi-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
//    Element.setAttribute(name, value);
    
    //Append to list
    todoList.appendChild(todoDiv);
    
    // clear todo input value
    todoInput.value = '';
}

function deleteCheck(e) {
    const item = e.target;
    //delete
    if(item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function() {
            todo.remove();
        });
        
    }
    
    //check mark
    if(item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
      switch(e.target.value) {
          case "all":
              todo.style.display = 'flex';
              break;
          case 'completed':
              if(todo.classList.contains('completed')) {
                  todo.style.display = 'flex';
              } else {
                  todo.style.display = 'none';
              }
              break;
          case 'uncompleted':
              if(!todo.classList.contains('completed')) {
                  todo.style.display = 'flex';
              } else {
                  todo.style.display = 'none';
              }
            break;
      }            
    });
}



function saveLocalTodos(todo) {
    //check --- do i already have things in there?
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else { 
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else { 
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    
    todos.forEach(function(todo) {
        const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    
    //create Li
    const newTodo = document.createElement('li'); 
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo); 
    // Check mark button
    const checkedButton = document.createElement('button');
    checkedButton.innerHTML = '<i class="bi bi-check"></i>';
    checkedButton.classList.add('complete-btn');
    todoDiv.appendChild(checkedButton);
    // trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="bi bi-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
//    Element.setAttribute(name, value);
    
    //Append to list
    todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else { 
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}