$(document).ready(function () {
    $('.tabs').tabs();
});

let fam = document.getElementById("family-name");
fam.innerText = sessionStorage.getItem("familyName");