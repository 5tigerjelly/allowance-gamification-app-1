
let fam = document.getElementById("family-name");
fam.innerText = sessionStorage.getItem("familyName");

function logout(){
    sessionStorage.clear();
    firebase.auth().signOut().then(function() {
        console.log("success");
    }).catch(function(error) {
        console.log(error);
    });
    window.location.replace("./index.html");
}

function changeBgColor() {
    // let bodyElem = document.querySelectorAll("body *");
    // if (bodyElem.classList.contains("dropdownBgColor")) {
    //     bodyElem.classList.remove("dropdownBgColor");
    // } else {
    //     bodyElem.classList.add("dropdownBgColor");
    // }
    var els = document.getElementsByTagName("*");
    for(var i = 0, all = els.length; i < all; i++){   
         els[i].classList.add('dropdownBgColor');
     }
}