
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

    if (password !== confirmPassword) {
        this.missMatchPasswords();
    } else if (password.length < 6) {
        this.shortPassword();
    } else if (!isUniqueFamily()) {
        familyNameInput.classList.add("invalid");
    } else {
        sessionStorage.setItem("familyName", familyName);
        sessionStorage.setItem("familyPassword", confirmPassword);
        
        window.location.replace("signup.html");
    }
}

function isUniqueFamily() {
    var isUniqueFamily = true;
    familyNameInput.classList.remove("invalid");
    database.ref("family")
        .once("value")
        .then(function (familyRef) {
            familyRef.forEach(function (family) {
                let child = familyRef.child(family.key);
                let tempFamilyName = child.val().name;
                if (familyNameInput.value == tempFamilyName)  {
                    isUniqueFamily = false;
                }
            })
        })
        .finally(() => {
            if (!isUniqueFamily) {
                familyNameInput.classList.add("invalid");
            }
            return isUniqueFamily; 
        });
}

function missMatchPasswords() {
    let confirmPassword = document.getElementById("confirmPassword");
    confirmPassword.classList.add("invalid");
}

function shortPassword() {
    let password = document.getElementById("password");
    password.classList.add("invalid");
}
