
let fam = document.getElementById("family-name");
fam.innerText = sessionStorage.getItem("familyName");

function logout() {
    sessionStorage.clear();
    firebase.auth().signOut().then(function () {
        console.log("success");
    }).catch(function (error) {
        console.log(error);
    });
    window.location.replace("./index.html");
}