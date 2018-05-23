var database = firebase.database();

let gravatarRoot = "https://www.gravatar.com/avatar/";

let familyUID = sessionStorage.getItem("familyUID");
let userUID = sessionStorage.getItem("userUID");

let gravatar = document.getElementById("gravatar");
let name = document.getElementById("name");
let email = document.getElementById("email");
var oldEmail = "";

database.ref("family/" + familyUID + "/familyUsers/" + userUID)
        .once('value')
        .then(function (snapshot) {
            let data = snapshot.val();
            name.value = data.name;
            email.value = data.email;
            oldEmail = data.emailHash;
        })
        .then(() => {
            M.updateTextFields();
        });

function goBack(){
    window.history.back();
}

// var doneSave = save();

// doneSave.done(function() {
//     removeOldUser();
//     goBack();
// });

// $.when(doneSave).done(function() {
//     removeOldUser();
//     goBack();
// });

var save = function () {
    // var user = firebase.auth().currentUser;
    // user.updateEmail(email.value).then(function() {
    //     console.log("success");
    // }).catch(function(error) {
    //     console.log(error);
    // });
    var r = $.Deferred();
    console.log(oldEmail);
    var userRef = database.ref("users");
    userRef.child(oldEmail).once("value")
        .then(function(snap) {
            console.log(snap.key);
            var data = snap.val();
            console.log(data);
            let newEmailHash = md5(email.value);
            console.log(newEmailHash);
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
    return r.resolve();
}

var removeOldUser = function () {
    var oldReference = database.ref("users/" + oldEmail);
    oldReference.remove();
    goBack();
}

save().done(removeOldUser);