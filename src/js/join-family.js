var database = firebase.database();

// function verifyFamily() {
//     var existingFamily = false;
//     var familyName = document.getElementById("familyName").value;
//     console.log(familyName);
//     var ref = database.ref("family")
//         .once("value")
//         .then(function (familyRef) {
//             familyRef.forEach(function (family) {
//                 let child = familyRef.child(family.key);
//                 let tempFamilyname = child.val().name;
//                 console.log(tempFamilyname);
//                 if (familyName === tempFamilyname) {
//                     existingFamily = true;
//                     return existingFamily;
//                 }
//             });
//             return existingFamily;
//         }).then(existingFamily => {
//             if (existingFamily) {
//                 console.log("yo");
//                 if (verifyPassword()) {
//                     alert("all correct");
//                 }
//             }
//         });
    
//     if (existingFamily) {
//         alert("hello");
//     }
// }

function verifyPassword() {
    var correctPassword = false;
    var familyName = document.getElementById("familyName").value;
    var password = document.getElementById("password").value;
    var joinBtn = document.getElementById("join-btn");
    var joinBtnTxt = document.getElementById("join-btn-txt");
    console.log(password);
    
    var ref = database.ref("family")
        .once("value")
        .then(function (familyRef) {
            familyRef.forEach(function (family) {
                let child = familyRef.child(family.key);
                let tempFamilyName = child.val().name;
                let tempFamilyPassword = child.val().password;
                if (tempFamilyName === familyName && password === tempFamilyPassword) {
                    correctPassword = true;
                    // console.log("correct");
                    // setState();
                    joinBtn.classList.remove("hidden");
                    joinBtnTxt.classList.add(family.key);
                    
                    console.log(document.getElementById("join-btn").className);
                }
            });
        })

    // function setState() {
    //     correctPassword = true;
    // }
    // console.log(correctPassword);
    // return correctPassword;
}

function onButtonPress() {
    var familyUID = document.getElementById("join-btn-txt").className;
    sessionStorage.setItem("familyUID", familyUID);
    window.location.replace("signup.html");
}
