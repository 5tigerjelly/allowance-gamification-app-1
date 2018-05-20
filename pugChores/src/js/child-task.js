let database = firebase.database();


var url_string = window.location.href
var url = new URL(url_string);
// var taskUID = url.searchParams.get("taskUID");
// let taskUID = '-LCwAQxLb8pc0ubVYwfa';
let famId = '-LCw5ow5u64CdtprojEp'; // sessionStorage.getItem("familyUID");
let userUID = '-LCwAQIZMo3tGGDwZWgr'; //sessionStorage.getItem("userUID");

let taskName = document.getElementById("taskName");
let value = document.getElementById("value");
let note = document.getElementById("note");

let avaiable = document.getElementById("available");
let completed = document.getElementById("completed");


database.ref('family/' + famId + '/tasks')
    .once('value')
    .then(function (snapshot) {
        snapshot.forEach(element => {
            data = element.val();
            let task = createTaskItem(data, element.key);
            if ('inProgress' in data) {
                //inprogress onlly used by parent
            }else{
                
                //avaiable task
                avaiable.appendChild(task)
            }
        });
    });

database.ref('family/' + famId + '/completed')
    .once('value')
    .then(function (snapshot) {
        snapshot.forEach(element => {
            data = element.val();
            let completedTask = createTaskItem(data, element.key);
            completed.appendChild(completedTask);
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

    a.setAttribute('href', 'child-task-detail.html?taskUID=' + taskUID);
    return a;
    document.querySelector('section').appendChild(a);
}

