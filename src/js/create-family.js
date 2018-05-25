
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
    console.log(familyName);
    console.log(password);
    console.log(confirmPassword);
    if (password !== confirmPassword) {
        this.missMatchPasswords();
    } else {
        // var familyObject = {
        //     name: familyName,
        //     password: confirmPassword
        // };
        // var familyRef = database.ref("family");
        // var familyUID = familyRef.push(familyObject).key;

        sessionStorage.setItem("familyName", familyName);
        sessionStorage.setItem("familyPassword", confirmPassword);
        
        window.location.replace("signup.html");
    }
}

function missMatchPasswords() {
    let confirmPassword = document.getElementById("confirmPassword");
    confirmPassword.classList.add("invalid");
}
