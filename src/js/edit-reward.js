var database = firebase.database();
let familyUID = sessionStorage.getItem("familyUID");
let userUID = sessionStorage.getItem("userUID");

var url_string = window.location.href
var url = new URL(url_string);
var rewardUID = url.searchParams.get("rewardUID");

let title = document.getElementById('rewardName');
let points = document.getElementById('value');
let notes = document.getElementById('note');

database.ref("family/" + familyUID + "/rewards/" + rewardUID).once('value').then(function (snapshot) {
    let data = snapshot.val();
    // console.log(data);
    title.value = data.name;
    points.value = data.value;
    notes.value = data.description;
}).then(() => {
    M.updateTextFields();
})

function goBack() {
    window.history.back();
}

function update() {
    if (title.value.length == 0) {
        let save = document.getElementsByClassName('save');
        save.disabled = true;
        // save.classList.add('disabled');
        M.toast({ html: 'Enter a reward title' });
    } else if (title.value.length > 10) {
        let save = document.getElementsByClassName('save');
        save.disabled = true;
        // save.classList.add('disabled');
        M.toast({ html: 'Title can be at most 10 characters long' });
    } else if (points.value.length == 0) {
        let save = document.getElementsByClassName('save');
        save.disabled = true;
        // save.classList.add('disabled');
        M.toast({ html: 'Enter a point value' });
    } else if (points.value == 0 || points.value < 0) {
        let save = document.getElementsByClassName('save');
        save.disabled = true;
        // save.classList.add('disabled');
        M.toast({ html: 'Points must be greator than 0' });
    } else {
        database.ref("family/" + familyUID + "/rewards/" + rewardUID)
            .update({
                name: title.value,
                value: points.value,
                description: notes.value
            }).then(() => {
                window.location.href = "parent-reward-detail.html?rewardUID=" + rewardUID;
            });
    }
}
