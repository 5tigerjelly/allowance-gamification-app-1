function toggleCurrPasswordIcon() {
    let visibilityIcon = document.getElementById("currPasswordIcon");
    if (visibilityIcon.classList.contains("hidden")) {
        visibilityIcon.classList.remove("hidden");
    } else {
        visibilityIcon.classList.add("hidden");
    }
}

function toggleNewPasswordIcon() {
    let visibilityIcon = document.getElementById("newPasswordIcon");
    if (visibilityIcon.classList.contains("hidden")) {
        visibilityIcon.classList.remove("hidden");
    } else {
        visibilityIcon.classList.add("hidden");
    }
}

function toggleConfirmNewPassIcon() {
    let visibilityIcon = document.getElementById("confirmNewPassIcon");
    if (visibilityIcon.classList.contains("hidden")) {
        visibilityIcon.classList.remove("hidden");
    } else {
        visibilityIcon.classList.add("hidden");
    }
}

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