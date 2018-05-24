let database = firebase.database();


var url_string = window.location.href
var url = new URL(url_string);
// var taskUID = url.searchParams.get("taskUID");
// let taskUID = '-LCwAQxLb8pc0ubVYwfa';
let famId = sessionStorage.getItem("familyUID");
let userUID = sessionStorage.getItem("userUID");
let userRole = sessionStorage.getItem("role");

let taskName = document.getElementById("taskName");
let value = document.getElementById("value");
let note = document.getElementById("note");

let avaiable = document.getElementById("available");
let inprogress = document.getElementById("inprogress");
let completed = document.getElementById("completed");


database.ref('family/' + famId + '/tasks')
    .once('value')
    .then(function (snapshot) {
        snapshot.forEach(element => {
            data = element.val();
            let task = createTaskItem(data, element.key);
            if ('inProgress' == data.status) {
                //inprogress onlly used by parent
                inprogress.appendChild(task);
            }else if ('completed' == data.status){
                //completed task
                completed.appendChild(task);
            }else{
                //avaiable task
                avaiable.appendChild(task)
            }
        });
    });

function createTaskItem(data, taskUID) {
    let a = document.createElement('a');  // make it a link 
    let task = document.createElement('div'); // represents one task 

    let title = document.createElement('span');  // a span for the title of that task 
    title.classList.add('blue-text', 'text-darken-2'); // added the class names 
    let name = document.createTextNode(data.name);     // the title of the task 
    title.appendChild(name);

    let points = document.createElement('span');   // a span for the points of the task
    points.classList.add('right', 'right-align');  // added class for the points 
    let pointValue = document.createTextNode(data.value + " pt");  // actual points 
    points.appendChild(pointValue);

    task.appendChild(title);
    task.appendChild(points)

    task.classList.add('card-panel', 'task');
    a.appendChild(task);

    a.setAttribute('href', userRole + '-task-detail.html?taskUID=' + taskUID);
    return a;
}

