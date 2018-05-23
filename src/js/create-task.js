
var database = firebase.database();
var url_string = window.location.href
var url = new URL(url_string);
let famId = '-LCw5ow5u64CdtprojEp'; // sessionStorage.getItem("familyUID");

function createTask() {
    let taskName = document.getElementById("taskName").value;
    let value = document.getElementById("value").value;
    let note = document.getElementById("note").value;
    console.log(taskName);
    console.log(value);
    console.log(note);
    let familyUID = "-LCw5ow5u64CdtprojEp"; //sessionStorage.getItem("familyUID");

    var taskObject = {
        name: taskName,
        value: value,
        description: note
    };

    database.ref("family/" + familyUID + "/tasks").push(taskObject);
    window.location.replace("parent-tasks.html");
}
