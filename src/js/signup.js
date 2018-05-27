var database = firebase.database();

var familyPassword = sessionStorage.getItem("familyPassword");
var familyName = sessionStorage.getItem("familyName");

function updateGravatar(){
    let gravatarImg = document.getElementById("gravatarImg");
    let email = document.getElementById("email").value;
    let emailHash = md5(email);
    gravatarImg.src = "http://www.gravatar.com/avatar/" + emailHash;
}

function onButtonPress() {
    let name = document.getElementById("name").value;
    var emailElem = document.getElementById("email");
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

    if (password.length < 6) {
        shortPassword();
    } else if (password !== confirmPassword) {
        this.missMatchPasswords();
    } else if (!isEmailAvailable()) {
        emailElem.classList.add("invalid");
    } else {
        firebase.auth().createUserWithEmailAndPassword(email, confirmPassword)
            .then(() => {
                console.log("Successfully created user!");
                
                // Create the reference of family in Firebase
                var familyObject = {
                    name: familyName,
                    password: familyPassword
                };
                var familyRef = database.ref("family");
                var familyUID = familyRef.push(familyObject).key;

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

// Checks if the email is not used in the app
function isEmailAvailable() {
    var isEmailAvailable = true;
    let email = document.getElementById("email");
    let hashedEmail = md5(email.value);
    email.classList.remove("invalid");
    database.ref("users")
        .once("value")
        .then(function (userRef) {
            userRef.forEach(function(user) {
                if (hashedEmail == user.key) {
                    isEmailAvailable = false;
                }
            });
        })
        .finally(() => {
            if (!isEmailAvailable) {
                email.classList.add("invalid");
            }
            return isEmailAvailable; 
        });
}

function navigateToView(role) {
    if (role == "parent") {
        window.location.replace("parent-tasks.html");
    } else {
        window.location.replace("child-tasks.html");
    }
}

function goBack() {
    let lastPage = sessionStorage.getItem("lastPage");
    if (lastPage == "join") {
        window.location.replace("./join-family.html");
    } else {
        window.location.replace("./create-family.html");
    }
}