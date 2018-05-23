var database = firebase.database();

let gravatarRoot = "https://www.gravatar.com/avatar/";

let familyUID = sessionStorage.getItem("familyUID");
let userUID = sessionStorage.getItem("userUID");

let gravatar = document.getElementById("gravatar");
let name = document.getElementById("name");
let email = document.getElementById("email");
var oldEmailHash = "";

database.ref("family/" + familyUID + "/familyUsers/" + userUID)
        .once('value')
        .then(function (snapshot) {
            let data = snapshot.val();
            name.value = data.name;
            email.value = data.email;
            oldEmailHash = data.emailHash;
        })
        .then(() => {
            M.updateTextFields();
        });

function goBack(){
    window.history.back();
}

function save () {
    var user = firebase.auth().currentUser;
    user.updateEmail(email.value).then(function() {
        console.log("success");
    }).catch(function(error) {
        console.log(error);
    });
    var userRef = database.ref("users");
    userRef.child(oldEmailHash).once("value")
        .then(function(snap) {
            var data = snap.val();
            let newEmailHash = md5(email.value);
            database.ref("users/" + newEmailHash).set(data);
        })
        .then(
            database.ref("family/" + familyUID + "/familyUsers/" + userUID)
                .update({
                    name : name.value,
                    email : email.value,
                    emailHash : md5(email.value)
                })
        );
    setTimeout(function() {
        removeOldUser();       
    }, 1000);
    setTimeout(function() {
        goBack();    
    }, 1200);
}

function removeOldUser () {
    var oldReference = database.ref("users/" + oldEmailHash);
    oldReference.remove();
}

