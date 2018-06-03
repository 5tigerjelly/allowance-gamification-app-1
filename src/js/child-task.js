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
let firstLoad = false;

database.ref('family/' + famId + '/tasks')
    .once('value')
    .then(function (snapshot) {
        snapshot.forEach(element => {
            data = element.val();
            let task = createTaskItem(data, element.key);
            if ('available' == data.status) {
                //inprogress onlly used by parent
                avaiable.appendChild(task);
            } else if ('inProgress' == data.status && userUID == data.inProgressBy) {
                // console.log(element.key)
                window.location.href = "inProgress.html?taskUID=" + element.key;
            } else if (userUID == data.inProgressBy && 'completed' == data.status) {
                //completed task
                completed.appendChild(task);
            }
        });
    });

    database.ref('family/' + famId + '/tasks')
    .on('value', function(snapshot) {
        if(firstLoad){
            location.reload();
        }
        firstLoad = true;
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

    a.setAttribute('href', 'child-task-detail.html?taskUID=' + taskUID);
    return a;
}
