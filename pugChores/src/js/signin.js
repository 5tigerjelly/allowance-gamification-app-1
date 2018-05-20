var database = firebase.database();

function onButtonPress() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var auth = firebase.auth();
    console.log()
    auth.signInWithEmailAndPassword(email, password)
        .then((userInfo) => {
            var emailHash = md5(email);
            database.ref("users")
                .once("value")
                .then(function(userRef) {
                    userRef.forEach(function(userObj) {
                        console.log(userObj.key);
                        let child = userObj.child(userObj.key);
                        console.log(child.val());
                        // console.log(child.val().emailHash);
                        // let familyUID = child.val().familyUID;
                        // let userUID = child.val().userUID;
                        // let userStatus = child.val().role;
                        // if (emailHash === user.key) {
                        //     sessionStorage.setItem("familyUID", familyUID);
                        //     sessionStorage.setItem("userUID", userUID);
                        //     sessionStorage.setItem("email", email);
                        //     sessionStorage.setItem("emailHash", emailHash);
                        //     navigateToView(userStatus);
                        // }
                    })
                });
        })
        .catch(function(error) {
            invalidPassword();
        });
}

function invalidPassword() {
    let passwordElem = document.getElementById("password");
    passwordElem.classList.add("invalid");
}

function navigateToView(role) {
    if (role == "Parent") {
        window.location.replace("parent-tasks.html");
    } else {
        window.location.replace("child-tasks.html");
    }
}