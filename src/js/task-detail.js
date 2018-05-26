// import createTaskItem from 'js/create-task.js'
var database = firebase.database();

var url_string = window.location.href
var url = new URL(url_string);
var taskUID = url.searchParams.get("taskUID");
var rewardUID = url.searchParams.get("rewardUID");

let familyUID = sessionStorage.getItem("familyUID");
let userUID = sessionStorage.getItem("userUID");
let userPoints = sessionStorage.getItem("currPoints");

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
        });
} else {
    database.ref("family/" + familyUID + "/rewards/" + rewardUID)
        .once('value')
        .then(function (snapshot) {
            let data = snapshot.val();
            name.innerText = data.name;
            value.innerText = data.value;
            note.innerText = data.description;
        });
}



let editMode = false;

function editTask() {
    deleteTask(); // delete that task first 
    // 
    editMode = true;
    if (editMode) {
        // deleteTask(); // delete that task first 
        // create-task.html
        // render the tasks on the uncliamed list 
        database.ref('family/' + famId + '/tasks')
            .once('value')
            .then(function (snapshot) {
                snapshot.forEach(element => {
                    data = element.val();
                    createTaskItem.createTaskItem(data, element.key)
                });
            });
    }
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
        sessionStorage.setItem("currPoints", deductedPoints);
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

function completeInProgress() {

}