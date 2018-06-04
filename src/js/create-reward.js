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
        status: "avaliable"
    };

    if (rewardName.length > 10) {
        M.toast({ html: 'Num of characters must be 10 or less' });
    }

    let save = document.querySelector('save');
    // check for empty values {notes, points, and titles}
    if (value == 0 || value < 0 || rewardName.length == 0) {
        let save = document.getElementsByClassName('save');
        save.disabled = true;
        // save.classList.add('disabled');
        M.toast({ html: 'Points must be greator than 0' });
    } else {
        database.ref("family/" + familyUID + "/rewards").push(rewardObject);
        window.location.replace("./parent-rewards.html");
    }
}