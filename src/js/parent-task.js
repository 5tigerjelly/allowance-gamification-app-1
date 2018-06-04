var database = firebase.database();
var url_string = window.location.href
var url = new URL(url_string);
let famId = sessionStorage.getItem("familyUID");
let userUID = sessionStorage.getItem("userUID");
let userRole = sessionStorage.getItem("role");

let avaiable = document.getElementById("available");
let inprogress = document.getElementById("inprogress");
let completed = document.getElementById("completed");

database.ref('family/' + famId + '/tasks')
    .once('value')
    .then(function (snapshot) {
        snapshot.forEach(element => {
            data = element.val();
            // console.log(data);
            let task = createTaskItem(data, element.key);

            if ('inProgress' == data.status) {
                // console.log(task);
                //inprogress onlly used by parent
                inprogress.appendChild(task);
                // location.reload();
            } else if ('completed' == data.status && (userRole == "parent" || data.completedBy == userUID)) {
                //completed task
                completed.appendChild(task);
                // location.reload();
            } else {
                //avaiable task
                avaiable.appendChild(task)
            }
        });
    });


function createTask() {
    let taskName = document.getElementById("taskName").value;
    let value = document.getElementById("value").value;
    let note = document.getElementById("note").value;
    let familyUID = sessionStorage.getItem("familyUID");

    var taskObject = {
        name: taskName,
        value: value,
        description: note,
        status: "available"
    };

    if (taskName.length > 10) {
        M.toast({ html: 'Num of characters must be 10 or less' });
    }

    let save = document.querySelector('save');
    // check for empty values {notes, points, and titles}
    if (value == 0 || value < 0 || taskName.length == 0 || note.length == 0) {
        let save = document.getElementsByClassName('save');
        save.disabled = true;
        // save.classList.add('disabled');
        M.toast({ html: 'Points must be greator than 0' });
    } else {
        // save.style.backgroundColor = "grey";
        database.ref("family/" + familyUID + "/tasks").push(taskObject);
        window.location.href = "parent-tasks.html";
    }
}

function invalidValue(value) {
    value.classList.add("invalid");
}
// reload the page every time a new task is created 
// var functions = require('firebase-functions');
// const admin = require('firebase-admin');
// functions.auth.user().onCreates(event => {
//     // render the tasks on the uncliamed list 
database.ref('family/' + famId + '/tasks')
    .once('value')
    .then(function (snapshot) {
        snapshot.forEach(element => {
            data = element.val();
            createTaskItem(data, element.key)
        });
    });
// })

function createTaskItem(data, taskUID) {
    // <img id="gravatar" src="https://www.gravatar.com/avatar/0d3529caf9cff46012bf2b9afa0448a4" alt="">

    let img = document.createElement('img'); //  a gravatar img 

    let a = document.createElement('a');  // make it a link 
    let task = document.createElement('div'); // represents one task 

    let title = document.createElement('span');  // a span for the title of that task 
    title.classList.add('blue-text', 'text-darken-2'); // added the class names 
    let name = document.createTextNode(data.name);     // the title of the task 
    title.appendChild(name);
    let pointsDiv = document.createElement('div');
    let points = document.createElement('span');   // a span for the points of the task
    points.classList.add('right', 'right-align');  // added class for the points 
    let pointValue = document.createTextNode(data.value + " pt");  // actual points 
    points.appendChild(pointValue);
    if (data.status == 'inProgress' || data.status == 'completed') {
        let img = document.createElement('img'); //  a gravatar img 
        img.classList.add('circle', 'responsive-img'); //  
        img.setAttribute("id", 'gravatar');
        img.setAttribute('src', 'https://www.gravatar.com/avatar/' + data.inProgressByHash);
        img.setAttribute('alt', 'gravator image');

        task.appendChild(img);
    }

    task.appendChild(title);
    task.appendChild(points)

    task.classList.add('card-panel', 'task');
    a.appendChild(task);
    a.setAttribute('href', 'parent-task-detail.html?taskUID=' + taskUID);
    return a;
}

// function taskItemsWithProfile(data, taskUID, emailHash) {
//     let img = document.createElement('img'); //  a gravatar img 
//     img.classList.add('circle', 'responsive-img'); //  
//     img.setAttribute("id", 'gravatar');
//     img.setAttribute('src', 'https://www.gravatar.com/avatar/' + emailHash);
//     img.setAttribute('alt', userUID + '');
//     // gravatar.src = gravatarRoot + data.emailHash;


//     let a = document.createElement('a');  // make it a link 
//     let task = document.createElement('div'); // represents one task 

//     let title = document.createElement('span');  // a span for the title of that task 
//     title.classList.add('blue-text', 'text-darken-2'); // added the class names 
//     let name = document.createTextNode(data.name);     // the title of the task 
//     title.appendChild(name);

//     let pointsDiv = document.createElement('div');
//     let points = document.createElement('span');   // a span for the points of the task
//     points.classList.add('right', 'right-align');  // added class for the points 
//     let pointValue = document.createTextNode(data.value + " pt");  // actual points 
//     points.appendChild(pointValue);

//     task.appendChild(img);
//     task.appendChild(title);
//     task.appendChild(points)

//     task.classList.add('card-panel', 'task');
//     a.appendChild(task);
//     a.setAttribute('href', 'parent-task-detail.html?taskUID=' + taskUID);
//     return a;
// }


