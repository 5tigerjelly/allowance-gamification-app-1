let database = firebase.database();
let familyUID = sessionStorage.getItem("familyUID");
// let userUID = sessionStorage.getItem("userUID");

var url_string = window.location.href
var url = new URL(url_string);
var taskUID = url.searchParams.get("taskUID");

let title = document.getElementById('taskName');
let points = document.getElementById('value');
let notes = document.getElementById('note');

let oldNotes, oldPoints, oldTitles;

database.ref("family/" + familyUID + "/tasks/"+ taskUID).once('value').then(function (snapshot) {
    let data = snapshot.val();
    title.value = data.name;
    points.value = data.value;
    notes.value = data.description;
}).then(() => {
    M.updateTextFields();
})


function update(){
    database.ref("family/" + familyUID + "/tasks/"+ taskUID)
        .update({
            name: title.value,
            value: points.value,
            description: notes.value
        }).then(() => {
            window.location.href = "parent-task-detail.html?taskUID=" + taskUID;
        });
}

function goBack() {
    window.history.back();
}

// let isNoteAva = true;
// function isNotesAvailable() {
//     database.ref("family/" + familyUID + "/tasks").once('value').then(function (snapshot) {
//         let data = snapshot.val();
//         console.log(data.description);
//         if (data.notes !== oldNotes) {
//             isNoteAva = false;
//         }
//     }).then(() => {
//         if (!isNoteAva) {
//             oldTitles.classList.add("invalid");
//         }
//     });
//     return isNoteAva;
// }

function removeOldTask() {
    let oldTask = database.ref('family/' + familyUID + '/tasks' + taskUID);

    oldTask.remove();
}


function createTask(taskName, points, note) {
    let familyUID = sessionStorage.getItem("familyUID");
    // let value = document.getElementById("value").value;
    // let note = document.getElementById("note").value;

    var taskObject = {
        name: taskName,
        value: points,
        description: note,
        status: "available"
    };
    let save = document.querySelector('save');
    // check for empty values {notes, points, and titles}
    // console.log(taskName.value + " " + points.value + " " + notes.value);
    if (points == 0 || points < 0 || taskName.length == 0 || note.length == 0) {
        let save = document.getElementsByClassName('save');
        save.disabled = true;
        M.toast({ html: 'Points must be greator than 0' });
    } else {
        database.ref("family/" + familyUID + "/tasks").push(taskObject);
        window.location.href = "parent-tasks.html";
    }
}
