var database = firebase.database();


var url_string = window.location.href
var url = new URL(url_string);
var from = url.searchParams.get("from");
let goBack = document.getElementById("goBack");
goBack.href = from;

let gravatarRoot = "https://www.gravatar.com/avatar/";

let familyUID = "-LCw5ow5u64CdtprojEp"; //sessionStorage.getItem("familyUID"); TODO: change
let userUID = "-LCwAQIZMo3tGGDwZWgr"; //sessionStorage.getItem("userUID"); TODO: change

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