var database = firebase.database();

var url_string = window.location.href
var url = new URL(url_string);
var taskUID = url.searchParams.get("taskUID");
var rewardUID = url.searchParams.get("rewardUID");

let familyUID = sessionStorage.getItem("familyUID");
let userUID = sessionStorage.getItem("userUID");
let userPoints = sessionStorage.getItem("points");
let userRole = sessionStorage.getItem("role");

let name = document.getElementById("name");
let value = document.getElementById("value");
let note = document.getElementById("note");


if (taskUID != null) {
    database.ref("family/" + familyUID + "/tasks/" + taskUID)
        .once('value')
        .then(function (snapshot) {
            let data = snapshot.val();
            name.innerText = data.name;
            value.innerText = data.value;
            note.innerText = data.description;
            if (data.status == "available") {
                document.getElementById("accpetBtn").style.display = "block"
            }
        });
} else {
    database.ref("family/" + familyUID + "/rewards/" + rewardUID)
        .once('value')
        .then(function (snapshot) {
            let data = snapshot.val();
            name.innerText = data.name;
            value.innerText = data.value;
            note.innerText = data.description;
            if (data.status == "avaliable") {
                document.getElementById("claimBtn").style.display = "block"
            }
        });
}



// let editMode = false;

// function editTask() {
//     deleteTask(); // delete that task first 
//     // 
//     editMode = true;
//     if (editMode) {
//         // deleteTask(); // delete that task first 
//         // create-task.html
//         // render the tasks on the uncliamed list 
//         database.ref('family/' + famId + '/tasks')
//             .once('value')
//             .then(function (snapshot) {
//                 snapshot.forEach(element => {
//                     data = element.val();
//                     createTaskItem.createTaskItem(data, element.key)
//                 });
//         });
//     }
// }

function deleteTask() {
    database.ref("family/" + familyUID + "/tasks/" + taskUID)
        .remove();
    window.location.href = "parent-tasks.html";
}

function deleteReward() {
    database.ref("family/" + familyUID + "/rewards/" + rewardUID)
        .remove();
    window.location.href = "parent-rewards.html";
}

function redeemReward() {
    if (false) {

    } else {
        database.ref("family/" + familyUID + "/rewards/" + rewardUID)
            .update({
                "completedBy": userUID,
                "status": "claimed"
            });
        let deductedPoints = userPoints - parseInt(value.textContent);
        database.ref("family/" + familyUID + "/familyUsers/" + userUID)
            .update({
                "points": deductedPoints
            });
        sessionStorage.setItem("points", deductedPoints);
        window.location.href = "./child-rewards.html";
    }
}

function accpetTask() {
    database.ref("family/" + familyUID + "/tasks/" + taskUID)
        .update({
            "inProgressBy": userUID,
            "status": "inProgress"
        });
    window.location.href = "./inProgress.html?taskUID=" + taskUID;
}

function cancelInProgess() {
    database.ref("family/" + familyUID + "/tasks/" + taskUID + "/inProgressBy")
        .remove();

    database.ref("family/" + familyUID + "/tasks/" + taskUID)
        .update({
            "status": "available"
        })
    window.history.back();
}

function goBack() {
    window.history.back();
}

function taskInProgress() {
    window.location.href = "./inProgress.html?taskUID=" + taskUID;
}

function completeInProgress() {
    database.ref("family/" + familyUID + "/tasks/" + taskUID)
        .update({
            "status": "completed"
        });
    let value = document.getElementById("value").innerText;
    let newPoints = parseInt(userPoints) + parseInt(value);
    database.ref("family/" + familyUID + "/familyUsers/" + userUID)
        .update({
            "points": newPoints
        });
    sessionStorage.setItem("points", newPoints)
    // window.location.href = "./child-task-detail.html?taskUID=" + taskUID;
    window.location.href = "./child-tasks.html?taskUID=" + taskUID;
}

function createTaskItem(data, taskUID) {
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

    task.appendChild(title);
    task.appendChild(points)

    task.classList.add('card-panel', 'task');
    a.appendChild(task);
    a.setAttribute('href', userRole + 'child-task-detail.html?taskUID=' + taskUID);
    return a;
}


