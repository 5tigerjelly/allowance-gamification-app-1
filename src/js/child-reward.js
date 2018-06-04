let database = firebase.database();
var url_string = window.location.href
var url = new URL(url_string);

let famId = sessionStorage.getItem("familyUID");
let userUID = sessionStorage.getItem("userUID");
let userRole = sessionStorage.getItem("role");

let avaiable = document.getElementById("available");
let completed = document.getElementById("claimed");

let firstLoad = false;

database.ref('family/' + famId + '/rewards')
    .once('value')
    .then(function (snapshot) {
        snapshot.forEach(element => {
            data = element.val();
            let reward = createTaskItem(data, element.key);
            if (data.status == "claimed" && data.completedBy == userUID) {
                completed.appendChild(reward);
            } else if (data.status == "avaliable") {
                avaiable.appendChild(reward);
            }
        });
    });

database.ref('family/' + famId + '/rewards')
    .on('value', function (snapshot) {
        if (firstLoad) {
            location.reload();
        }
        firstLoad = true;
    });

//get score and display
if (sessionStorage.getItem("points") === null) {
    database.ref('family/' + famId + '/familyUsers/' + userUID)
        .once('value')
        .then(function (snapshot) {
            data = snapshot.val()
            document.getElementById("pointsCounter").innerText = data.points || 0;
            sessionStorage.setItem("points", data.points.toString());
        })
} else {
    let points = sessionStorage.getItem("points");
    document.getElementById("pointsCounter").innerText = points;
}


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

    let link = 'child-reward-detail.html?rewardUID=';
    if (data.status == "claimed" && data.completedBy == userUID) {
        link = 'child-reward-claimed.html?rewardUID=';
    }

    a.setAttribute('href', link + taskUID);
    return a;
}
