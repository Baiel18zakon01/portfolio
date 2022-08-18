let main = document.createElement('main')
main.classList.add('container')

document.body.prepend(main)

let projectName = document.createElement('h1')
projectName.innerHTML = 'lets do it'
main.append(projectName)

let listBlock = document.createElement('div')
listBlock.className = 'mainBlock'
main.append(listBlock)

let firDiv = document.createElement('div')
listBlock.append(firDiv)

let texIn = document.createElement('input')
texIn.setAttribute('placeholder', 'Gonna do')
texIn.className = 'textIn'
firDiv.append(texIn)

let setDate = document.createElement('input')
setDate.setAttribute('type', 'date')
firDiv.append(setDate)

let settime = document.createElement('input')
settime.setAttribute('type','time')
firDiv.append(settime)

let addBtn = document.createElement('button')
addBtn.innerHTML = 'add'
addBtn.id = 'addBtn'
firDiv.append(addBtn)

let list = document.createElement('ul')
listBlock.append(list)


let todosArray = localStorage.getItem('todos') == null
    ? []
    : [...JSON.parse(localStorage.getItem('todos'))]
console.log((todosArray));

const renderTodoItem = () => {
    list.innerHTML = ''
    todosArray.map((todo, id) => {
        let li = document.createElement('li')
        li.className = todo.checked ? 'taskItem done': 'taskItem'
        li.id = id

        let doneBtn = document.createElement('img')
        doneBtn.src = 'media/delete.png'
        doneBtn.className = 'btn'
        doneBtn.addEventListener('click', donetodo)

        let checkBtn = document.createElement('img')
        checkBtn.src = 'media/check.png'
        checkBtn.className = 'btn'
        checkBtn.addEventListener('click', checktodo)

        let label = document.createElement('label')

        li.append(label);
        label.append(todo.text+'-' + ' дата :' + todo.date + ' саат -' + todo.time);
        li.append(checkBtn)
        li.append(doneBtn)


        list.prepend(li)
    })
}



const addTodo = () => {
    let newTask = texIn.value
    let date = setDate.value
    let time = settime.value
    if (newTask != '') {
        console.log(newTask);

        todosArray.push({
            text: newTask,
            checked: false,
            date,
            time
        })
        localStorage.setItem('todos', JSON.stringify(todosArray))
        renderTodoItem()
        texIn.value = ''
        setDate.value = ''
        settime.value = ''
    }
}
const donetodo = (e) => {
    e.currentTarget.parentNode.remove(e.parentNode);
}
const checktodo = (e) => {
    // console.log(e.target.parentNode.id);
    let todoTemporary = [...todosArray]

    let index = parseInt(e.target.parentNode.id)

    let objElement = todoTemporary[index].checked

    todoTemporary[index].checked = !objElement

    localStorage.setItem('todos', JSON.stringify(todoTemporary))


    // console.log(objElement);

    let isDone = e.currentTarget.parentNode.classList.contains("done");
    isDone
        ? e.currentTarget.parentNode.classList.remove("done")
        : e.currentTarget.parentNode.classList.add("done");

};

addBtn.addEventListener('click', addTodo)
renderTodoItem()