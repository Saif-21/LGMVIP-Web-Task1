

let title = document.getElementById('title')
let desc = document.getElementById('desc')
let task_items = document.getElementById('task_item');

const addTodo = () => {




    let Newdate = new Date();
    let date = String(Newdate.getDate());
    let month = String(Newdate.getMonth() + 1);
    let year = String(Newdate.getFullYear());
    let day = String(Newdate.getDay())
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    let dateResult = `${date}/${month}/${year} :: ${days[day]}`
    // console.log(dateResult)


    let dateElement = document.createElement('span');
    dateElement.classList.add('date');
    dateElement.append(dateResult)


    let buttonDiv = document.createElement('div');
    buttonDiv.classList.add('btns')
    let IconButtonLeft = document.createElement('button');
    let IconButtonright = document.createElement('button');

    IconButtonLeft.classList.add('check')
    IconButtonright.classList.add('delete')

    IconButtonLeft.innerHTML = '<i class=" checkIcon fa-solid fa-circle-check"></i>';
    IconButtonright.innerHTML = '<i class=" deleteIcon fa-solid fa-trash"></i>';

    buttonDiv.append(IconButtonLeft);
    buttonDiv.append(dateElement)
    buttonDiv.append(IconButtonright);
    if (title.value === '') {
        alert("Title field is Mandotory");
        return;


    }


    let titleElement = document.createElement('h4');
    titleElement.classList.add("title");
    titleElement.append(title.value)

    let descElement = document.createElement('span');
    descElement.classList.add('desc');
    descElement.append(desc.value);


    let taskContaineer = document.createElement('div');

    taskContaineer.classList.add("taskContainer")

    taskContaineer.append(titleElement);
    taskContaineer.append(descElement);
    taskContaineer.append(buttonDiv);


    let ListItem = document.createElement('li');
    ListItem.classList.add('task_list')
    ListItem.append(taskContaineer);

    task_items.append(ListItem)


    let data = {
        title: title.value,
        desc: desc.value,
        date: dateResult,
        check: 0,
    }
    savetodo(data)

    title.value = "";
    desc.value = "";
}


task_items.addEventListener('click', (e) => {

    const item = e.target
    // console.log(item)
    if (item.classList[0] === 'deleteIcon') {
        let first = item.parentElement;
        let second = first.parentElement;
        let third = second.parentElement;
        let fourth = third.parentElement;
        fourth.classList.add('fallDiv')

        removeTodo(fourth)

        fourth.addEventListener('transitionend', () => {

            fourth.remove()
        })
    }
    let value = 0;

    // console.log(step)

    if (item.classList[0] === 'checkIcon') {
        // console.log(item)
        let first = item.parentElement;
        let second = first.parentElement;
        let third = second.parentElement;
        let fourth = third.parentElement;
        fourth.classList.toggle('completeTask');
        // console.log(fourth.classList)
        if (fourth.classList[1] === 'completeTask') {
            checkTask(fourth)
        }
        else {
            removeCheck(fourth)
        }


    }

})

function savetodo(data) {

    let todos = [];
    if (localStorage.getItem('item') === null) {
        todos = []
    }
    else {
        todos = JSON.parse(localStorage.getItem('item'));

    }
    todos.push(data);
    localStorage.setItem('item', JSON.stringify(todos))

}


document.addEventListener('DOMContentLoaded', getTodo());
// - Get item from local storage

function getTodo() {
    let todos = [];
    if (localStorage.getItem('item') === null) {
        todos = []
    }
    else {
        todos = JSON.parse(localStorage.getItem('item'));
    }
    // ---------------
    todos.forEach((e) => {


        let dateElement = document.createElement('span');
        dateElement.classList.add('date');
        dateElement.append(e.date)

        let buttonDiv = document.createElement('div');
        buttonDiv.classList.add('btns')
        let IconButtonLeft = document.createElement('button');
        let IconButtonright = document.createElement('button');

        IconButtonLeft.classList.add('check')
        IconButtonright.classList.add('delete')

        IconButtonLeft.innerHTML = '<i class=" checkIcon fa-solid fa-circle-check"></i>';
        IconButtonright.innerHTML = '<i class=" deleteIcon fa-solid fa-trash"></i>';

        buttonDiv.append(IconButtonLeft);
        buttonDiv.append(dateElement)
        buttonDiv.append(IconButtonright);

        let titleElement = document.createElement('h4');
        titleElement.classList.add("title");
        titleElement.append(e.title)

        let descElement = document.createElement('span');
        descElement.classList.add('desc');
        descElement.append(e.desc);


        let taskContaineer = document.createElement('div');


        taskContaineer.classList.add("taskContainer")

        taskContaineer.append(titleElement);
        taskContaineer.append(descElement);
        taskContaineer.append(buttonDiv);


        let ListItem = document.createElement('li');
        ListItem.classList.add('task_list')
        if (e.check === 1) {
            ListItem.classList.add('completeTask')
        }
        ListItem.append(taskContaineer);
        task_items.append(ListItem)
    })
}


// ------------ remove element 
function removeTodo(item) {
    let todos = [];
    if (localStorage.getItem('item') === null) {
        todos = []
    }
    else {
        todos = JSON.parse(localStorage.getItem('item'));

    }
    console.log(todos)
    let value = item.children[0].children[0].innerText;
    // console.log(todos.length)
    let SelectTask;

    for (let i = 0; i < todos.length; i++) {
        if (todos[i].title === value) {
            // console.log(todos[i]);
            SelectTask = todos[i];
            break;
        }
    }

    let index = todos.indexOf(SelectTask)

    todos.splice(index, 1);
    localStorage.setItem('item', JSON.stringify(todos))
}


const checkTask = (item) => {

    // console.log(item)
    let todos = [];
    if (localStorage.getItem('item') === null) {
        todos = []
    }
    else {
        todos = JSON.parse(localStorage.getItem('item'));
    }

    let value = item.children[0].children[0].innerText;
    // console.log(value)
    let SelectTask;
    for (let i = 0; i < todos.length; i++) {
        if (value === todos[i].title) {
            // console.log(todos[i]);
            SelectTask = todos[i];
            break;
        }
    }
    console.log("Value : ", value)
    let index = todos.indexOf(SelectTask);
    console.log(index)
    todos[index].check = 1;
    localStorage.setItem('item', JSON.stringify(todos))

}

// -------------------
const removeCheck = (item) => {
    // console.log(item)
    let todos = [];
    if (localStorage.getItem('item') === null) {
        todos = []
    }
    else {
        todos = JSON.parse(localStorage.getItem('item'));
    }

    let value = item.children[0].children[0].innerText;
    // console.log(value)
    let SelectTask;
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].title === value) {
            // console.log(todos[i]);
            SelectTask = todos[i];
            break;
        }
    }
    let index = todos.indexOf(SelectTask);
    todos[index].check = 0;
    localStorage.setItem('item', JSON.stringify(todos))
}
