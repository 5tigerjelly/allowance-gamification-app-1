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
    let nameElem = document.getElementById("name");
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
    if (!nameAvailability) {
        nameElem.classList.add("invalid");
    } else if (password.length < 6) {
        shortPassword();
    } else if (password !== confirmPassword) {
        this.missMatchPasswords();
    } else if (!emailAvailability) {
        emailElem.classList.add("invalid");
    } else {
        firebase.auth().createUserWithEmailAndPassword(email, confirmPassword)
            .then(() => {
                console.log("Successfully created user!");
                var familyUID = "";
                if (sessionStorage.getItem("lastPage") == "create") {
                    // Create the reference of family in Firebase
                    var familyObject = {
                        name: familyName,
                        password: familyPassword
                    };
                    let familyRef = database.ref("family");
                    familyUID = familyRef.push(familyObject).key;
                } else {
                    familyUID = sessionStorage.getItem("familyUID");
                }

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
                sessionStorage.setItem("userPasswordHash", md5(password));

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

var nameAvailability = true;

function isNameAvailable() {
    nameAvailability = true;
    let familyUID = sessionStorage.getItem("familyUID");
    let name = document.getElementById("name");
    name.classList.remove("invalid");
    database.ref("family/" + familyUID + "/familyUsers")
        .once("value")
        .then(function (userRef) {
            userRef.forEach(function(user) {
                console.log(user.val().name);
                if (user.val().name == name.value) {
                    nameAvailability = false;
                }
            });
        })
        .finally(() => {
            if (!nameAvailability) {
                name.classList.add("invalid");
            }
        });
}

var emailAvailability = true;

// Checks if the email is not used in the app
function isEmailAvailable() {
    emailAvailability = true;
    let email = document.getElementById("email");
    let emailHelper = document.getElementById("email-helper");
    let hashedEmail = md5(email.value);
    email.classList.remove("invalid");
    database.ref("users")
        .once("value")
        .then(function (userRef) {
            userRef.forEach(function(user) {
                if (hashedEmail == user.key) {
                    emailAvailability = false;
                }
            });
        })
        .finally(() => {
            if (!emailAvailability) {
                email.classList.add("invalid");
                emailHelper.setAttribute("data-error", "Email is already taken.");
            } else {
                emailHelper.setAttribute("data-success", "Valid Email");
            }
        });
}

function validateEmail() {
    let email = document.getElementById("email");
    let emailHelper = document.getElementById("email-helper");
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(re.test(String(email.value).toLowerCase()));
    if (!re.test(String(email.value).toLowerCase())) {
        email.classList.add("invalid");
        emailHelper.setAttribute("data-error", "Invalid Email");
    } else {
        email.classList.remove("invalid");
    }
}

function togglePasswordIcon() {
    let visibilityIcon = document.getElementById("passwordIcon");
    if (visibilityIcon.classList.contains("hidden")) {
        visibilityIcon.classList.remove("hidden");
    } else {
        visibilityIcon.classList.add("hidden");
    }
}

function toggleConfirmPassIcon() {
    let visibilityIcon = document.getElementById("confirmPassIcon");
    if (visibilityIcon.classList.contains("hidden")) {
        visibilityIcon.classList.remove("hidden");
    } else {
        visibilityIcon.classList.add("hidden");
    }
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