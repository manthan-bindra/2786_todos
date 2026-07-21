const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let todos = [];

function addTodo(){
    const item = taskInput.value.trim();

    if(item == ""){
        alert("Enter some value");
        return;
    }

    const todo = {
        text: item,
        completed: false
    };

    todos.push(todo);

    taskInput.value = "";

    saveTodos();

    renderTodo();
}

function createList(item ,index){
    const li = document.createElement("li");
    li.className = "task-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.completed;

    checkbox.addEventListener("change", ()=>{
        toggleComplete(index);
    })

    const span = document.createElement("span");
    span.innerText = item.text;

    if(item.completed){
        span.style.textDecoration = "line-through";
    }

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";

    editBtn.addEventListener("click", ()=>{
        editList(index);
    })

    const deleteBtn = document.createElement("button")
    deleteBtn.innerText = "Delete";

    deleteBtn.addEventListener("click", ()=>{
        deleteList(index);
    })

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn)

    return li;
}

function deleteList(index){
    todos.splice(index, 1);

    saveTodos();

    renderTodo()
}

function editList(index){
    const newText = taskInput.value.trim();

    if(newText === ""){
        alert("Type new task then edit");
        return;
    }

    todos[index].text = newText;

    taskInput.value = "";

    saveTodos();

    renderTodo();
}

function toggleComplete(index){
    todos[index].completed = !todos[index].completed;

    saveTodos();

    renderTodo();
}

function renderTodo(){
    taskList.innerText = "";

    todos.forEach((item ,index)=>{
        const li = createList(item ,index);

        taskList.appendChild(li);
    })
}

function saveTodos(){
    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos(){
    const stored = localStorage.getItem("todos");

    if(stored){
        todos = JSON.parse(stored);
    }

    renderTodo();
}

addBtn.addEventListener("click", addTodo)

loadTodos();
