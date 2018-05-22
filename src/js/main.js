
let fam = document.getElementById("family-name");
fam.innerText = sessionStorage.getItem("familyName");

function logout(){
    sessionStorage.clear();
    window.location.replace("./index.html");
}