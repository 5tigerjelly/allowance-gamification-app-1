var database = firebase.database();

var url_string = window.location.href
var url = new URL(url_string);
var taskUID = url.searchParams.get("taskUID");
var rewardUID = url.searchParams.get("rewardUID");

let familyUID = sessionStorage.getItem("familyUID");
let userUID = sessionStorage.getItem("userUID");
let userHash = sessionStorage.getItem("emailHash");
let userPoints = sessionStorage.getItem("points");
let userRole = sessionStorage.getItem("role");

let name = document.getElementById("name");
let value = document.getElementById("value");
let note = document.getElementById("note");
let editBtn = document.getElementById("editBtn");

if (taskUID != null) {
    database.ref("family/" + familyUID + "/tasks/" + taskUID)
        .once('value')
        .then(function (snapshot) {
            let data = snapshot.val();
            name.innerText = data.name;
            value.innerText = data.value;
            sessionStorage.setItem("inprogress-points", data.value)
            note.innerText = data.description;
            editBtn.href = "./edit-task.html?taskUID=" + snapshot.key;
            if (data.status == "available") {
                document.getElementById("accpetBtn").style.display = "block";
            }
            console.log(snapshot.key);
            
        });
} else {
    database.ref("family/" + familyUID + "/rewards/" + rewardUID)
        .once('value')
        .then(function (snapshot) {
            let data = snapshot.val();
            name.innerText = data.name;
            value.innerText = data.value;
            note.innerText = data.description;
            editBtn.href = "./edit-reward.html?rewardUID=" + snapshot.key;
            if (data.status == "avaliable") {
                document.getElementById("claimBtn").style.display = "block";
            }
        });
}


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
    let rewardValue = parseInt(value.textContent);

    if (userPoints < rewardValue) {
        M.toast({ html: 'You do not have enough points' });
    } else {
        database.ref("family/" + familyUID + "/rewards/" + rewardUID)
            .update({
                "completedBy": userUID,
                "status": "claimed"
            });
        let deductedPoints = userPoints - rewardValue;
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
            "inProgressByHash": userHash,
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
    database.ref("family/" + familyUID + "/tasks/" + taskUID)
        .once('value')
        .then(function (snapshot) {
            let data = snapshot.val();
            if (data.status == 'inprogress') {
                window.location.href = "./inProgress.html?taskUID=" + taskUID;
            } else {
                window.location.href = "./child-task-detail.html?taskUID=" + taskUID;
            }
        })
}

function completeInProgress() {
    database.ref("family/" + familyUID + "/tasks/" + taskUID)
        .update({
            "status": "completed"
        });
    let value =  sessionStorage.getItem("inprogress-points");
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

// database.ref('family/' + familyUID + '/tasks')
//     .once('value')
//     .then(function (snapshot) {
//         snapshot.forEach(element => {
//             data = element.val();
//             if (data.status == 'completed') {
//                 // window.location.href = "./child-task-completed.html?taskUID=" + taskUID;
//             }
//         })
//     })
    // window.location.href = "./inProgress.html?taskUID=" + taskUID;

