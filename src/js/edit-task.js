var database = firebase.database();
let familyUID = sessionStorage.getItem("familyUID");
let userUID = sessionStorage.getItem("userUID");

function goBack() {
    window.history.back();
}

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


isTitleAvailable() {

}

isPointsAvailable() {

}

isNotesAvailable() {

}