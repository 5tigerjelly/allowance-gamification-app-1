var database = firebase.database();
let familyUID = sessionStorage.getItem("familyUID");
let userUID = sessionStorage.getItem("userUID");

let title = document.querySelector('taskName');
let points = document.querySelector('value');
let notes = document.querySelector('note');
let oldNote, oldPoints, oldTitles;

database.ref("family/" + familyUID + "/tasks").once('value').then(function (snapshot) {
    let data = snapshot.val();
    oldTitles = data.name;
    oldPoints = data.value;
    oldNote = data.description;
}).then(() => {
    M.updateTextFields();
})

function save() {

}

let isTitleAvailable = true;
function isTitleAvailable() {
    database.ref("family/" + familyUID + "/tasks").once('value').then(function (snapshot) {
        let data = snapshot.val();
        if (data.name !== oldTitles) {
            isTitleAvailable = false;
        }
    }).then(() => {
        if (!isTitleAvailable) {
            oldTitles.classList.add("invalid");
        }
    });
    return isTitleAvailable;
}

let isPointAvailable = true;
function isPointsAvailable() {
    database.ref("family/" + familyUID + "/tasks").once('value').then(function (snapshot) {
        let data = snapshot.val();
        if (data.value !== oldPoints) {
            isPointAvailable = false;
        }
    }).then(() => {
        if (!isPointAvailable) {
            oldTitles.classList.add("invalid");
        }
    });
    return isPointAvailable;
}

function goBack() {
    window.history.back();
}

let isNoteAvailable = true;
function isNotesAvailable() {
    database.ref("family/" + familyUID + "/tasks").once('value').then(function (snapshot) {
        let data = snapshot.val();
        if (data.notes !== oldNotes) {
            isNoteAvailable = false;
        }
    }).then(() => {
        if (!isNoteAvailable) {
            oldTitles.classList.add("invalid");
        }
    });
    return isNoteAvailable;
}

function remove() {

}