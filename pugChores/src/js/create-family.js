
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
        database.ref("family").push(familyObject);
        window.location.replace("signup.html");
    }
}

function missMatchPasswords() {
    // console.log(document.getElementById);
    let test = document.getElementById("confirmPassword");
    test.classList.add("invalid");
}
