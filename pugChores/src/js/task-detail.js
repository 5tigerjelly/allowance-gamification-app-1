var database = firebase.database();

var url_string = window.location.href
var url = new URL(url_string);
var taskUID = url.searchParams.get("taskUID");
let familyUID = "-LCvzr3C6CAO6qIJiaid"; //sessionStorage.getItem("familyUID");

let taskName = document.getElementById("taskName");
let value = document.getElementById("value");
let note = document.getElementById("note");

database.ref("family/" + familyUID + "/tasks/" + taskUID)
    .once('value')
    .then(function (snapshot) {
        data = snapshot.val();
        taskName.innerText = data.name;
        value.innerText = data.value;
        note.innerText = data.description;
    });

function onDeletePress() {
    database.ref("family/" + familyUID + "/tasks/" + taskUID)
        .remove();
    window.location.replace("parent-tasks.html");
}
