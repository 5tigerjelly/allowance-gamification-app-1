let database = firebase.database();
var url_string = window.location.href
var url = new URL(url_string);

let famId = sessionStorage.getItem("familyUID");
let userUID = sessionStorage.getItem("userUID");
let userRole = sessionStorage.getItem("role");

let avaiable = document.getElementById("available");
let completed = document.getElementById("claimed");


function createReward() {
    let rewardName = document.getElementById("rewardName").value;
    let value = document.getElementById("value").value;
    let note = document.getElementById("note").value;

    let familyUID = sessionStorage.getItem("familyUID");

    var rewardObject = {
        name: rewardName,
        value: value,
        description: note,
        status : "avaliable"
    };

    database.ref("family/" + familyUID + "/rewards").push(rewardObject);
    window.location.replace("./parent-rewards.html");
}