/*
mng.bz/
*/

const TODO = [
    {description: "Walk the dog", done: true}, 
    {description:"Water the plants", done: false},
    {description:"Sand the chairs", done: false}
]

const addTodoInput = document.getElementById("todo-input")
const addTodoButton = document.getElementById("add-todo-btn")
const TODOList = document.getElementById("TODO-list")

for( const todo of TODO){
    TODOList.append(renderTodoInReadMode(todo))
}

addTodoInput.addEventListener("input", () => {
    addTodoButton.disabled = addTodoInput.value.length < 3
})

addTodoInput.addEventListener("keydown", ({key}) => {
    if( key === "Enter" && addTodoInput.value.length >= 3 )
        addTodo()
})

addTodoButton.addEventListener("click", () => {
        addTodo()
})

function renderTodoInReadMode(todo)
{
    const li = document.createElement("li")
    const span = document.createElement("span")
    span.textContent = todo.description
    
    if(todo.done){
        span.classList.add("done")
    }

    if(!todo.done){
        span.addEventListener("dblclick", () => {
            const idx = TODO.indexOf(todo)
            TODOList.replaceChild(
                renderTodoInEditMode(todo),
                TODOList.childNodes[idx]
            )
        })
    }

    li.append(span)

    if(!todo.done){
        const button = document.createElement("button")
        button.textContent = "Done"
        button.addEventListener("click", () => {
            const idx = TODO.findIndex( ( val ) => val.description === todo.description )
            removeTodo(idx)
        })
        li.append(button)        
    }

    return li
}// function renderTodoInReadMode(todo){

function renderTodoInEditMode(todo)
{
    const li = document.createElement("li")

    const input = document.createElement("input")
    input.type = "text"
    input.value = todo.description

    li.append(input)

    const saveBtn = document.createElement("button")
    saveBtn.textContent = "Save"
    saveBtn.addEventListener("click", () => {
        const idx = TODO.indexOf(todo)
        updateTodo(idx, input.value)
    })
    li.append(saveBtn)

    const cancelBtn = document.createElement("button")
    cancelBtn.textContent = "Cancel"
    cancelBtn.addEventListener("click", () => {
        const idx = TODO.indexOf(todo)
        TODOList.replaceChild(
            renderTodoInReadMode(todo),
            TODOList.childNodes[idx]
        )
    })
    li.append(cancelBtn)
    return li
}

function todoExists(description) 
{
   const cleanTodos = TODO.map((todo) => todo.description.trim().toLowerCase())
   return cleanTodos.includes(description.trim().toLowerCase())
}


function addTodo()
{
    const description = addTodoInput.value
 
    if (todoExists(description)) {
      alert('Todo already exists')
      return
    }
 
    TODO.push({description: description, done: false})
    const todo = renderTodoInReadMode({description: description, done: false})
    TODOList.append(todo)
    addTodoInput.value = ""
    addTodoButton.disabled = true
}

function removeTodo(index)
{
    TODO[index].done = true
    while(TODOList.firstChild) TODOList.removeChild(TODOList.firstChild);

    for( const todo of TODO){
        TODOList.append(renderTodoInReadMode(todo))
    }
}

function updateTodo(index, description)
{
    TODO[index] = description
    const todo = renderTodoInReadMode(description)
    TODOList.replaceChild(todo, TODOList.childNodes[index])
}


function cons(arg)
{
    console.log(arg)
}