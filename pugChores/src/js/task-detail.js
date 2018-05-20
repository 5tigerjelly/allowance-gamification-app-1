var database = firebase.database();

var url_string = window.location.href
var url = new URL(url_string);
var taskUID = url.searchParams.get("taskUID");
var rewardUID = url.searchParams.get("rewardUID");

let familyUID = "-LCw5ow5u64CdtprojEp"; //sessionStorage.getItem("familyUID"); TODO: change
let userUID = "-LCwAQIZMo3tGGDwZWgr"; //sessionStorage.getItem("userUID"); TODO: change
let userPoints = 20; //sessionStorage.getItem("userPoints"); TODO: change

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


function deleteTask() {
    database.ref("family/" + familyUID + "/tasks/" + taskUID)
        .remove();
    window.location.replace("parent-tasks.html");
}

function deleteReward() {
    database.ref("family/" + familyUID + "/rewards/" + rewardUID)
        .remove();
    window.location.replace("parent-rewards.html");
}

function redeemReward() {
    var completedRewardObject = {
        name: name.textContent,
        value: value.textContent,
        description: note.textContent,
        completedBy: userUID
    };
    database.ref("family/" + familyUID + "/rewards/" + rewardUID)
        .remove();
    database.ref("family/" + familyUID + "/completed").push(completedRewardObject);
    let deductedPoints = userPoints - parseInt(value.textContent);
    database.ref("family/" + familyUID + "/familyUsers/" + userUID)
        .update({
            "points": deductedPoints
        });
    sessionStorage.setItem("userPoints", deductedPoints);
    window.location.replace("child-rewards.html");
}