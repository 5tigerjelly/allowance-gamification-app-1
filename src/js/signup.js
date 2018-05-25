var database = firebase.database();

var familyUID = sessionStorage.getItem("familyUID");
var familyName = sessionStorage.getItem("familyName");

function updateGravatar(){
    let gravatarImg = document.getElementById("gravatarImg");
    let email = document.getElementById("email").value;
    let emailHash = md5(email);
    gravatarImg.src = "http://www.gravatar.com/avatar/" + emailHash;
}

function onButtonPress() {
    let name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let userStatus = document.getElementsByName("userStatus");
    var emailHash = md5(email);

    let role = "";
    if (userStatus[0].checked === true) {
        role = "parent";
    } else {
        role = "child";
    }

    // console.log(role);
    if (password.length < 6) {
        shortPassword();
    } else if (password !== confirmPassword) {
        this.missMatchPasswords();
    } else {
        firebase.auth().createUserWithEmailAndPassword(email, confirmPassword)
            .then(() => {
                console.log("Successfully created user!");
                var familyUsers = {
                    name: name,
                    email: email,
                    emailHash: emailHash,
                    points: 0,
                    role: role
                };

                var userUID = database.ref("family/" + familyUID + "/familyUsers").push(familyUsers).key;

                var userData = {
                    familyName: familyName,
                    familyUID: familyUID,
                    userUID: userUID,
                    role: role
                }

                database.ref("users/" + emailHash).set(userData);

                sessionStorage.setItem("familyName", familyName);
                sessionStorage.setItem("familyUID", familyUID);
                sessionStorage.setItem("userUID", userUID);
                sessionStorage.setItem("email", email);
                sessionStorage.setItem("emailHash", emailHash);
                sessionStorage.setItem("role", role);

                navigateToView(role);
            })
            .catch((err) => {
                console.log(err);
            });


    }
}

function missMatchPasswords() {
    let confirmPassword = document.getElementById("confirmPassword");
    confirmPassword.classList.add("invalid");
}

function shortPassword() {
    let password = document.getElementById("password");
    password.classList.add("invalid");
}

function navigateToView(role) {
    if (role == "parent") {
        window.location.replace("parent-tasks.html");
    } else {
        window.location.replace("child-tasks.html");
    }
}
