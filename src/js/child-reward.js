let database = firebase.database();


var url_string = window.location.href
var url = new URL(url_string);

let famId = sessionStorage.getItem("familyUID");
let userUID = sessionStorage.getItem("userUID");
let userRole = sessionStorage.getItem("role");

let avaiable = document.getElementById("available");
let completed = document.getElementById("claimed");


database.ref('family/' + famId + '/rewards')
    .once('value')
    .then(function (snapshot) {
        snapshot.forEach(element => {
            data = element.val();
            let reward = createTaskItem(data, element.key);
            avaiable.appendChild(reward)
        });
    });

database.ref('family/' + famId + '/claimed')
    .once('value')
    .then(function (snapshot) {
        snapshot.forEach(element => {
            data = element.val();
            let claimedReward = createTaskItem(data, element.key);
            completed.appendChild(claimedReward);
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

    a.setAttribute('href', userRole + '-reward-detail.html?rewardUID=' + taskUID);
    return a;
}

function createReward() {
    let rewardName = document.getElementById("rewardName").value;
    let value = document.getElementById("value").value;
    let note = document.getElementById("note").value;

    let familyUID = sessionStorage.getItem("familyUID");

    var rewardObject = {
        name: rewardName,
        value: value,
        description: note
    };

    database.ref("family/" + familyUID + "/rewards").push(rewardObject);
    window.location.replace("./parent-rewards.html");
}