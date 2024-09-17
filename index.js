// const { todo } = require("node:test")

const textarea = document.querySelector('textarea')
const addBtn = document.getElementById('addBtn')
const todoContainer = document.querySelector('.todoContainer')

let todoList = []

function initialLoad() {
    console.log("intial storage: ", localStorage.getItem('todos'))
    if (!localStorage.getItem('todos')) {return}  
    todoList = JSON.parse(localStorage.getItem('todos')).todoList
    updateUI()
}

initialLoad()

function addTodo() {
    const todo = textarea.value
    if (!todo) {return}
    console.log('Added Todo', todo)
    todoList.push(todo)
    textarea.value = '' //resets to empty
    updateUI()
}

function editTodo(index) {
    textarea.value = todoList[index]
    todoList = todoList.filter((element, elementIndex) => {
        if (index === elementIndex) {return false}
        return true
    })
    updateUI()
}

function deleteTodo(index){
    todoList = todoList.filter((element, elementIndex) => {
        if (index  === elementIndex) {return false}
        console.log("getting todo", todo)
        return true
    })
    updateUI()
}

function updateUI() {
    let newInnerHTML = ''

    todoList.forEach((todoElement, todoIndex) => {
        newInnerHTML += `
        <div class="todo">
                <p>${todoElement}</p>
                <div class="btnContainer" onclick="editTodo(${todoIndex})">
                    <button class="iconBtn">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="iconBtn" onclick="deleteTodo(${todoIndex})">
                        <i class="fa-solid fa-x"></i>
                    </button>
                </div>
            </div>
        `
    })

    todoContainer.innerHTML = newInnerHTML

    //save to local storage
    localStorage.setItem('todos', JSON.stringify({ todoList }))
}

addBtn.addEventListener('click', addTodo)