var database = firebase.database();

var familyUID = sessionStorage.getItem("familyUID");

function onButtonPress() {
    let name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let userStatus = document.getElementsByName("userStatus");
    
    // for (let i = 0; i < userStatus.length; i++) {
    //     console.log(userStatus[i].checked);
    // }

    // console.log(name);
    // console.log(password);
    // console.log(confirmPassword);
    // console.log(userStatus);
    
    // console.log(childRole);

    let role = "";
    if (userStatus[0].checked === true) {
        role = "Parent";
    } else {
        role = "Child";
    }
    
    // console.log(role);

    if (password !== confirmPassword) {
        this.missMatchPasswords();
    } else {
        firebase.auth().createUserWithEmailAndPassword(email, confirmPassword);

        var familyUsers = {
            name: name,
            email: email,
            emailHash: md5(email),
            points: 0,
            role: role
        };

        emailHash = md5(email);
        var userUID = database.ref("family/" + familyUID + "/familyUsers").push(familyUsers).key;

        var userData = {
            familyUID: familyUID,
            userUID: userUID,
            role: role
        }

        database.ref("users/" + emailHash).set(userData);
        navigateToView(role);
    }
}

function missMatchPasswords() {
    let test = document.getElementById("confirmPassword");
    test.classList.add("invalid");
}

function navigateToView(role) {
    if (role == "Parent") {
        window.location.replace("parent-tasks.html");
    } else {
        window.location.replace("child-tasks.html");
    }
}
