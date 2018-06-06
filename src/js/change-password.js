// function toggleCurrPasswordIcon() {
//     let visibilityIcon = document.getElementById("currPasswordIcon");
//     if (visibilityIcon.classList.contains("hidden")) {
//         visibilityIcon.classList.remove("hidden");
//     } else {
//         visibilityIcon.classList.add("hidden");
//     }
// }

// function toggleNewPasswordIcon() {
//     let visibilityIcon = document.getElementById("newPasswordIcon");
//     if (visibilityIcon.classList.contains("hidden")) {
//         visibilityIcon.classList.remove("hidden");
//     } else {
//         visibilityIcon.classList.add("hidden");
//     }
// }

// function toggleConfirmNewPassIcon() {
//     let visibilityIcon = document.getElementById("confirmNewPassIcon");
//     if (visibilityIcon.classList.contains("hidden")) {
//         visibilityIcon.classList.remove("hidden");
//     } else {
//         visibilityIcon.classList.add("hidden");
//     }
// }

let currPasswordIcon = document.getElementById("currPasswordIcon");
let currPasswordElem = document.getElementById("currPassword");
currPasswordIcon.addEventListener("click", function() {
    if (currPasswordIcon.innerText == "visibility_off") {
        currPasswordIcon.innerText = "visibility";
        currPasswordElem.type = "text";
    } else {
        currPasswordIcon.innerText = "visibility_off";
        currPasswordElem.type = "password";
    }
});

let newPasswordIcon = document.getElementById("newPasswordIcon");
let newPasswordElem = document.getElementById("newPassword");
newPasswordIcon.addEventListener("click", function() {
    if (newPasswordIcon.innerText == "visibility_off") {
        newPasswordIcon.innerText = "visibility";
        newPasswordElem.type = "text";
    } else {
        newPasswordIcon.innerText = "visibility_off";
        newPasswordElem.type = "password";
    }
});

let confirmNewPassIcon = document.getElementById("confirmNewPassIcon");
let confirmPassElem = document.getElementById("confirmNewPassword");
confirmNewPassIcon.addEventListener("click", function() {
    if (confirmNewPassIcon.innerText == "visibility_off") {
        confirmNewPassIcon.innerText = "visibility";
        confirmPassElem.type = "text";
    } else {
        confirmNewPassIcon.innerText = "visibility_off";
        confirmPassElem.type = "password";
    }
});

function goBack() {
    window.history.back();
}

function save() {
    let actualCurrPassword = sessionStorage.getItem("userPasswordHash");
    let currPasswordElem = document.getElementById("currPassword");
    let currPassword = document.getElementById("currPassword").value;
    let newPassword = document.getElementById("newPassword").value;
    let confirmNewPassword = document.getElementById("confirmNewPassword").value;
    let passHelperText = document.getElementById("passHelperText");

    if (md5(currPassword) !== actualCurrPassword) {
        currPasswordElem.classList.add("invalid");
    } else if (newPassword.length < 6) {
        shortPassword();
    } else if (newPassword !== confirmNewPassword) {
        missMatchPasswords();
    } else {
        var user = firebase.auth().currentUser;

        user.updatePassword(confirmNewPassword).then(function () {
            console.log("Updated Password Successfully!");
            sessionStorage.setItem("userPasswordHash", md5(confirmNewPassword));
            goBack();
        }).catch(function (error) {
            console.log("Error: " + error);
            passHelperText.setAttribute("data-error", error);
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    user.updatePassword(confirmNewPassword).then(function () {
                        sessionStorage.setItem("userPasswordHash", md5(confirmNewPassword));
                        goBack();
                    }).catch(function (error) {
                        passHelperText.setAttribute("data-error", error);
                    });
                }
            });
        });
    }
}

function missMatchPasswords() {
    let confirmNewPassword = document.getElementById("confirmNewPassword");
    confirmNewPassword.classList.add("invalid");
}

function shortPassword() {
    let newPassword = document.getElementById("newPassword");
    newPassword.classList.add("invalid");
}