var database = firebase.database();

function onButtonPress() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var auth = firebase.auth();
    // console.log()
    auth.signInWithEmailAndPassword(email, password)
        .then((userInfo) => {
            var emailHash = md5(email);
            console.log(emailHash);
            database.ref("users")
                .once("value")
                .then(function(userRef) {
                    userRef.forEach(function(userObj) {
                        let familyUID = userObj.val().familyUID;
                        let userUID = userObj.val().userUID;
                        let userRole = userObj.val().role;
                        // console.log(userObj.key);
                        if (emailHash === userObj.key) {
                            sessionStorage.setItem("familyUID", familyUID);
                            sessionStorage.setItem("userUID", userUID);
                            sessionStorage.setItem("email", email);
                            sessionStorage.setItem("emailHash", emailHash);
                            sessionStorage.setItem("role", userRole);
                            navigateToView(userRole);
                        }
                    })
                })
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
    if (role === "parent") {
        window.location.replace("parent-tasks.html");
    } else {
        window.location.replace("child-tasks.html");
    }
}