var database = firebase.database();

function verifyPassword() {
    var correctPassword = false;
    var familyName = document.getElementById("familyName").value;
    var passwordVal = document.getElementById("password").value;
    var joinBtn = document.getElementById("join-btn");
    var joinBtnTxt = document.getElementById("join-btn-txt");
    var familyNameElem = document.getElementById("familyName");
    var passwordElem = document.getElementById("password");

    familyNameElem.classList.remove("invalid");
    passwordElem.classList.remove("invalid");

    var ref = database.ref("family")
        .once("value")
        .then(function (familyRef) {
            familyRef.forEach(function (family) {
                let child = familyRef.child(family.key);
                let tempFamilyName = child.val().name;
                let tempFamilyPassword = child.val().password;
                if (tempFamilyName === familyName && passwordVal !== tempFamilyPassword) {
                    passwordElem.classList.add("invalid");
                } else if (tempFamilyName === familyName && passwordVal === tempFamilyPassword) {
                    correctPassword = true;
                    passwordElem.classList.remove("invalid");
                    // joinBtn.classList.remove("hidden");
                    sessionStorage.setItem("familyUID", family.key);
                    sessionStorage.setItem("familyName", familyName);
                    sessionStorage.setItem("lastPage", "join");
                    window.location.replace("signup.html");
                }
            });
        })
}

function showJoinBtn() {
    var joinBtn = document.getElementById("join-btn");
    joinBtn.classList.remove("hidden");
}

function checkFamilyExists() {
    var containsFamily = false;
    var familyName = document.getElementById("familyName").value;
    var familyNameElem = document.getElementById("familyName");

    familyNameElem.classList.remove("invalid");

    database.ref("family")
        .once("value")
        .then(function (familyRef) {
            familyRef.forEach(function (family) {
                let child = familyRef.child(family.key);
                let tempFamilyName = child.val().name;
                let tempFamilyPassword = child.val().password;
                if (tempFamilyName === familyName) {
                    containsFamily = true;
                }
            });
        })
        .finally(() => {
            // console.log(containsFamily);
            if (!containsFamily) {
                familyNameElem.classList.add("invalid");
            }
        });
}

function togglePasswordIcon() {
    let visibilityIcon = document.getElementById("passwordIcon");
    if (visibilityIcon.classList.contains("hidden")) {
        visibilityIcon.classList.remove("hidden");
    } else {
        visibilityIcon.classList.add("hidden");
    }
}

// function onButtonPress() {
//     window.location.replace("signup.html");
// }

function goBack() {
    sessionStorage.clear();
    window.location.replace("./index.html");
}
