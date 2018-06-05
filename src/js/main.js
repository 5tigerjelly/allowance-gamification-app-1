
let fam = document.getElementById("family-name");
fam.innerText = sessionStorage.getItem("familyName");

function logout() {
    sessionStorage.clear();
    firebase.auth().signOut().then(function () {
        console.log("success");
    }).catch(function (error) {
        console.log(error);
    });
    window.location.replace("./signin.html");
}

// function reverseEls(elem){

//     var els = Array.prototype.slice.call(elem.childNodes);
//     console.log(elem.childNodes);
//     for (var i = els.length -1; i>=0; i--) {
//         elem.appendChild(els[i]);
//     }
// }

// window.onload = function () { 
//     reverseEls(document.getElementById('available'));
// }
