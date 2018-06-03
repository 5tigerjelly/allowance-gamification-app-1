
var database = firebase.database();

// Preload previously entered family data if the user goes back to edit "create family"
var familyName = sessionStorage.getItem("familyName");
var familyPassword = sessionStorage.getItem("familyPassword");
var familyNameInput = document.getElementById("familyName");
var passwordInput = document.getElementById("password");
var confirmPasswordInput = document.getElementById("confirmPassword");

familyNameInput.value = familyName;
passwordInput.value = familyPassword;
confirmPasswordInput.value = familyPassword;

function onButtonPress() {
    let familyName = document.getElementById("familyName").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if (familyName.length < 3) {
        this.shortFamilyName();
    } else if (password !== confirmPassword) {
        this.missMatchPasswords();
    } else if (password.length < 6) {
        this.shortPassword();
    } else if (!familyAvailability) {
        familyNameInput.classList.add("invalid");
    } else {
        sessionStorage.setItem("familyName", familyName);
        sessionStorage.setItem("familyPassword", confirmPassword);
        sessionStorage.setItem("lastPage", "create");
        window.location.replace("signup.html");
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

let passwordElem = document.getElementById("password");
let confirmPassElem = document.getElementById("confirmPassword");
let passwordVisIcon = document.getElementById("passwordIcon");
let confirmPassVisIcon = document.getElementById("confirmPassIcon");

// passwordElem.addEventListener("focusin", function() {
//     // confirmPassVisIcon.classList.add("hidden");
//     passwordVisIcon.classList.remove("hidden");
// });

// confirmPassElem.addEventListener("focusin", function() {
//     // passwordVisIcon.classList.add("hidden");
//     confirmPassVisIcon.classList.remove("hidden");
// });

// This section allows clicking of the icon to reveal the password
// passwordVisIcon.addEventListener("click", function() {
//     if (passwordVisIcon.innerHTML == "visibility_off") {
//         passwordVisIcon.innerHTML = "visibility";
//         passwordElem.type = "text";
//     } else {
//         passwordVisIcon.innerHTML = "visibility_off";
//         passwordElem.type = "password";
//     }
// });

// confirmPassVisIcon.addEventListener("click", function() {
//     if (confirmPassVisIcon.innerHTML == "visibility_off") {
//         confirmPassVisIcon.innerHTML = "visibility";
//         confirmPassElem.type = "text";
//     } else {
//         confirmPassVisIcon.innerHTML = "visibility_off";
//         confirmPassElem.type = "password";
//     }
// });

function toggleConfirmPassIcon() {
    let visibilityIcon = document.getElementById("confirmPassIcon");
    if (visibilityIcon.classList.contains("hidden")) {
        visibilityIcon.classList.remove("hidden");
    } else {
        visibilityIcon.classList.add("hidden");
    }
}

var familyAvailability = true;

function isUniqueFamily() {
    familyAvailability = true;
    familyNameInput.classList.remove("invalid");
    database.ref("family")
        .once("value")
        .then(function (familyRef) {
            familyRef.forEach(function (family) {
                let child = familyRef.child(family.key);
                let tempFamilyName = child.val().name;
                if (familyNameInput.value == tempFamilyName)  {
                    familyAvailability = false;
                }
            })
        })
        .finally(() => {
            if (!familyAvailability) {
                let famNameHelperText = document.getElementById("famNameHelperText");
                famNameHelperText.setAttribute("data-error", "This family name has already been taken.");
                familyNameInput.classList.add("invalid");
            } 
        });
}

function shortFamilyName() {
    let familyNameElem = document.getElementById("familyName");
    let famNameHelperText = document.getElementById("famNameHelperText");
    famNameHelperText.setAttribute("data-error", "At least 3 characters")
    familyNameElem.classList.add("invalid");
}

function missMatchPasswords() {
    let confirmPassword = document.getElementById("confirmPassword");
    confirmPassword.classList.add("invalid");
}

function shortPassword() {
    let password = document.getElementById("password");
    password.classList.add("invalid");
}

function goBack() {
    sessionStorage.clear();
    window.location.replace("./index.html");
}