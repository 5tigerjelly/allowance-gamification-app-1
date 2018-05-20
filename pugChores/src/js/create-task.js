var database = firebase.database();

function onButtonPress() {
    let taskName = document.getElementById("taskName").value;
    let value = document.getElementById("value").value;
    let note = document.getElementById("note").value;
    console.log(taskName);
    console.log(value);
    console.log(note);
    let familyUID = "-LCugHBEtm2PO1OGJoPA"; //sessionStorage.getItem("familyUID");

    var taskObject = {
        name: taskName,
        value: value,
        description: note
    };
    database.ref("family/" + familyUID + "/tasks" ).push(taskObject);
    window.location.replace("parent-tasks.html");

}
