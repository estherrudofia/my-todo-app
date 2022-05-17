let addTask = document.querySelector('.addTask');
let tasks = document.querySelector('.add');
let input = document.querySelector('.allTask');
let todo = document.querySelector('.todo');
const filterOption = document.querySelector('.filter-todo');






const addTodo = (e) => {
    let addText = document.querySelector('.add').value;
    console.log(addText);

    
    // create li
    const todoList = document.createElement('li');
    todoList.classList.add('taskList');
    
    const todoDiv1 = document.createElement('div');
    todoDiv1.className = 'input-group-text checkedInput';
    //create checkbox
    const newTodo = document.createElement('input');
    newTodo.className = 'form-check-input mt-0 checkedButton';
    newTodo.setAttribute('type', 'checkbox');
    todoDiv1.appendChild(newTodo);
    todoList.appendChild(todoDiv1);
    //create text
    const newText = document.createElement('input');
    newText.classList.add('form-control', 'task');
    newText.setAttribute('type', 'button');
    newText.value = addText;
    newText.setAttribute('aria-describedby', "basic-addon2");
    todoList.appendChild(newText);
    // Save to Local Storage
    saveLocalTodos(addText);
    //create delete button
    const todoDiv2 = document.createElement('div');
    todoDiv2.className = 'input-group-text trash-btn';
    todoDiv2.innerHTML = '<i class="bi bi-trash btn-outline-danger"></i>';
    todoList.appendChild(todoDiv2);    

    //Append to list
    todo.appendChild(todoList);
    
    
    // clear todo input value
    tasks.value = '';
    
}


const todoBtn = (e) => {
    
    const item = e.target;
    //delete
    if(item.classList[1] === 'bi-trash') {
        const todo = item.parentElement.parentElement;
        // todo.classList.add('fall');
        // console.log(todo);
        removeLocalTodos(todo);
        // todo.addEventListener('transitionend', function() {
            todo.remove();
        // });
    }
    
    //check mark
    if(item.classList.contains('checkedButton')) {
        const todo = item.parentElement;
        const checkedBtn = todo.parentElement;
        checkedBtn.classList.toggle('completed');
    }
}

const filterTodo = (e) => {
    const todos = todo.childNodes;
    todos.forEach((task) => {
      switch(e.target.value) {
          case "all":
              task.style.display = 'flex';
              break;
          case 'completed':
              if(task.classList.contains('completed')) {
                  task.style.display = 'flex';
              } else {
                  task.style.display = 'none';
              }
              break;
          case 'uncompleted':
              if(!task.classList.contains('completed')) {
                  task.style.display = 'flex';
              } else {
                  task.style.display = 'none';
              }
            break;
      }            
    });
}


const saveLocalTodos = (task) => {
    //check --- do i already have things in there?
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else { 
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    
    todos.push(task);
    localStorage.setItem('todos', JSON.stringify(todos));
}

const getTodos = () => {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else { 
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    
    todos.forEach((task) => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('task');

        // create li
        const todoList = document.createElement('li');
        todoList.classList.add('taskList');
    
        const todoDiv1 = document.createElement('div');
        todoDiv1.className = 'input-group-text checkedInput';
        //create checkbox
        const newTodo = document.createElement('input');
        newTodo.className = 'form-check-input mt-0 checkedButton';
        newTodo.setAttribute('type', 'checkbox');
        todoDiv1.appendChild(newTodo);
        todoList.appendChild(todoDiv1);
        //create text
        const newText = document.createElement('input');
        newText.classList.add('form-control', 'task');
        newText.setAttribute('type', 'button');
        newText.value = task;
        newText.setAttribute('aria-describedby', "basic-addon2");
        todoList.appendChild(newText);
        //create delete button
        const todoDiv2 = document.createElement('div');
        todoDiv2.className = 'input-group-text trash-btn';
        todoDiv2.innerHTML = '<i class="bi bi-trash btn-outline-danger"></i>';
        todoList.appendChild(todoDiv2);    

        //Append to list
        todo.appendChild(todoList);
    });
}

const removeLocalTodos = (task) => {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else { 
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = task.children[1].value;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}


// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
addTask.addEventListener('click', addTodo);
todo.addEventListener('click', todoBtn);
filterOption.addEventListener('click', filterTodo);
