var database = firebase.database();

function onButtonPress() {
    var emailElem = document.getElementById("email");
    var email = document.getElementById("email").value;
    email = email.toLowerCase();
    var password = document.getElementById("password").value;

    var auth = firebase.auth();

    auth.signInWithEmailAndPassword(email, password)
        .then((userInfo) => {
            let firebaseUID = userInfo.user.uid;
            var emailHash = md5(email);
            // console.log(emailHash);
            database.ref("users")
                .once("value")
                .then(function (userRef) {
                    if (!emailAvailability) {
                        emailElem.classList.add("invalid");
                    } else {
                        userRef.forEach(function (userObj) {
                            let familyName = userObj.val().familyName;
                            let familyUID = userObj.val().familyUID;
                            let userUID = userObj.val().userUID;
                            let userRole = userObj.val().role;

                            if (emailHash === userObj.key) {
                                sessionStorage.setItem("familyName", familyName);
                                sessionStorage.setItem("familyUID", familyUID);
                                sessionStorage.setItem("userUID", userUID);
                                sessionStorage.setItem("email", email);
                                sessionStorage.setItem("emailHash", emailHash);
                                sessionStorage.setItem("role", userRole);
                                sessionStorage.setItem("userPasswordHash", md5(password));
                                database.ref("family/" + familyUID + "/familyUsers/" + userUID)
                                    .once("value")
                                    .then(function (snapshot) {
                                        let data = snapshot.val();
                                        sessionStorage.setItem("points", data.points);
                                    });
                                navigateToView(userRole);
                            }
                        })
                    }
            database.ref("users/" + firebaseUID)
                .once("value")
                .then(function (userRef) {
                    let userData = userRef.val();
                    sessionStorage.setItem("familyName", userData.familyName);
                    sessionStorage.setItem("familyUID", userData.familyUID);
                    sessionStorage.setItem("userUID", userData.userUID);
                    sessionStorage.setItem("email", email);
                    sessionStorage.setItem("emailHash", md5(email));
                    sessionStorage.setItem("role", userData.role);
                    sessionStorage.setItem("userPasswordHash", md5(password));
                    database.ref("family/" + userData.familyUID + "/familyUsers/" + userData.userUID)
                        .once("value")
                        .then(function (snapshot) {
                            let data = snapshot.val();
                            sessionStorage.setItem("points", data.points);
                        });
                    navigateToView(userData.role);
                })
        })
        .catch(function (error) {
            invalidPassword();
        });
    });
}

function invalidPassword() {
    let passwordElem = document.getElementById("password");
    passwordElem.classList.add("invalid");
}

var emailAvailability = false;

// Checks if the email is not used in the app
// function isEmailAvailable() {
//     emailAvailability = false;
//     let email = document.getElementById("email");
//     let emailVal = document.getElementById("email").value;
//     emailVal = emailVal.toLowerCase();
//     console.log(email);
//     let hashedEmail = md5(emailVal);
//     email.classList.remove("invalid");
//     database.ref("users")
//         .once("value")
//         .then(function (userRef) {
//             userRef.forEach(function(user) {
//                 if (hashedEmail == user.key) {
//                     emailAvailability = true;
//                 }
//             });
//         })
//         .finally(() => {
//             if (!emailAvailability) {
//                 email.classList.add("invalid");
//             }
//         });
// }

function togglePasswordIcon() {
    let visibilityIcon = document.getElementById("passwordIcon");
    let passwordElem = document.getElementById("password");

    if (visibilityIcon.classList.contains("hidden")) {
        visibilityIcon.classList.remove("hidden");
    } else {
        visibilityIcon.classList.add("hidden");
    }
}

let passwordElem = document.getElementById("password");
let visibilityIcon = document.getElementById("passwordIcon");

visibilityIcon.addEventListener("click", function () {
    if (visibilityIcon.innerHTML == "visibility_off") {
        visibilityIcon.innerHTML = "visibility";
        passwordElem.type = "text";
    } else {
        visibilityIcon.innerHTML = "visibility_off";
        passwordElem.type = "password";
    }
});

function navigateToView(role) {
    if (role == "parent") {
        window.location.href = "parent-tasks.html";
    } else {
        window.location.href = "child-tasks.html";
    }
}