var database = firebase.database();


var url_string = window.location.href
var url = new URL(url_string);
function goBack() {
    window.history.back();
}

let gravatarRoot = "https://www.gravatar.com/avatar/";

let familyUID = sessionStorage.getItem("familyUID"); 
let userUID = sessionStorage.getItem("userUID");

let gravatar = document.getElementById("gravatar");
let name = document.getElementById("name");
let email = document.getElementById("email");

database.ref("family/" + familyUID + "/familyUsers/" + userUID)
        .once('value')
        .then(function (snapshot) {
            let data = snapshot.val();
            gravatar.src = gravatarRoot + data.emailHash;
            name.innerText = data.name;
            email.innerText = data.email;
        });