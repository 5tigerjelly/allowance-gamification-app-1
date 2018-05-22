
var database = firebase.database();

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
        var familyObject = {
            name: familyName,
            password: confirmPassword
        };
        var familyRef = database.ref("family");
        var familyUID = familyRef.push(familyObject).key;
        console.log(familyUID);
        sessionStorage.setItem("familyUID", familyUID);
        window.location.replace("signup.html");
    }
}

function missMatchPasswords() {
    let confirmPassword = document.getElementById("confirmPassword");
    confirmPassword.classList.add("invalid");
}
