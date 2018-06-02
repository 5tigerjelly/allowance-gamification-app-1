var database = firebase.database();
let familyUID = sessionStorage.getItem("familyUID");
let userUID = sessionStorage.getItem("userUID");

var url_string = window.location.href
var url = new URL(url_string);
var rewardUID = url.searchParams.get("rewardUID");

let title = document.getElementById('rewardName');
let points = document.getElementById('value');
let notes = document.getElementById('note');

database.ref("family/" + familyUID + "/rewards/"+ rewardUID).once('value').then(function (snapshot) {
    let data = snapshot.val();
    console.log(data);
    title.value = data.name;
    points.value = data.value;
    notes.value = data.description;
}).then(() => {
    M.updateTextFields();
})

function update(){
    database.ref("family/" + familyUID + "/rewards/"+ rewardUID)
        .update({
            name: title.value,
            value: points.value,
            description: notes.value
        }).then(() => {
            window.location.href = "parent-reward-detail.html?rewardUID=" + rewardUID;
        });
}
