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

database.ref("family/" + familyUID + "/tasks/" + taskUID).once('value').then(function (snapshot) {
    let data = snapshot.val();
    title.value = data.name;
    points.value = data.value;
    notes.value = data.description;
}).then(() => {
    M.updateTextFields();
})

function goBack() {
    window.history.back();
}

function update() {
    if (title.value.length == 0) {
        let save = document.getElementsByClassName('save');
        save.disabled = true;
        // save.classList.add('disabled');
        M.toast({ html: 'Enter a reward title' });
    } else if (title.value.length > 10) {
        let save = document.getElementsByClassName('save');
        save.disabled = true;
        // save.classList.add('disabled');
        M.toast({ html: 'Title can be at most 10 characters long' });
    } else if (points.value.length == 0) {
        let save = document.getElementsByClassName('save');
        save.disabled = true;
        // save.classList.add('disabled');
        M.toast({ html: 'Enter a point value' });
    } else if (points.value == 0 || points.value < 0) {
        let save = document.getElementsByClassName('save');
        save.disabled = true;
        // save.classList.add('disabled');
        M.toast({ html: 'Points must be greator than 0' });
    } else {
        database.ref("family/" + familyUID + "/tasks/" + taskUID)
            .update({
                name: title.value,
                value: points.value,
                description: notes.value
            }).then(() => {
                window.location.href = "parent-task-detail.html?taskUID=" + taskUID;
            });
    }
}
