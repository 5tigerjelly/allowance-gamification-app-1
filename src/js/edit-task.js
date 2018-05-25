var database = firebase.database();
let familyUID = sessionStorage.getItem("familyUID");
let userUID = sessionStorage.getItem("userUID");

function goBack() {
    window.history.back();
}