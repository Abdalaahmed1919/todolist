let input = document.querySelector('.input');
let submit = document.querySelector('.add');
let divtasks = document.querySelector('.tasks');
let deletall = document.querySelector('.deletall');

let arrayoftasks = [];
gettaskfromlocalstorge();
if (localStorage.getItem("task")) {
    arrayoftasks = JSON.parse(localStorage.getItem("task"));
}
divtasks.addEventListener("click" , function (e) {
   if (e.target.classList.contains('del')) {
    delettaskfromlocalstorge(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
   } 
   if (e.target.classList.contains("task")) {
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
   }
})
// main operation
submit.onclick = function () {
    if (input.value !== "") {
        addtasktoarray(input.value);
        input.value = "";
    }
}
// functions
function addtasktoarray (texttask) {
    const task = {
        id : Date.now(),
        title : texttask,
        completed : false,
    }
    arrayoftasks.push(task);
    addtasktopage(arrayoftasks);
    addtasktolocalstorge(arrayoftasks);
}
function addtasktopage (arrayoftasks) {
    divtasks.innerHTML = "";
    arrayoftasks.forEach(function (task) {
      let div = document.createElement('div');
      div.className = 'task'; 
       if (task.completed) {
         div.className= 'task done';
        }
      div.setAttribute("data-id" , task.id);
      div.appendChild(document.createTextNode(task.title));
      let span = document.createElement('span');
      span.appendChild(document.createTextNode('Delet'))
      span.className = 'del';
      div.appendChild(span);
      divtasks.appendChild(div);
    })
}
function addtasktolocalstorge (arrayoftasks) {
  window.localStorage.setItem("task" , JSON.stringify(arrayoftasks));
}
function gettaskfromlocalstorge () {
    let data = localStorage.getItem("task");
    if (data) {
        let tasks = JSON.parse(data);
        addtasktopage(tasks);
    }
}
function delettaskfromlocalstorge (taskid) {
    arrayoftasks = arrayoftasks.filter((el) => el.id != taskid);
   addtasktolocalstorge(arrayoftasks);
}
function toggleStatusTaskWith (taskid) {
   for (let i = 0; i < arrayoftasks.length; i++) {
       if (arrayoftasks[i].id == taskid)
    arrayoftasks[i].completed == false ? (arrayoftasks[i].completed = true) : (arrayoftasks[i].completed = false);
 }
 addtasktolocalstorge(arrayoftasks);
}
deletall.onclick = function () {
    divtasks.innerHTML = "";
    localStorage.clear();
}