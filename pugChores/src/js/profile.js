var url_string = window.location.href
var url = new URL(url_string);
var from = url.searchParams.get("from");

let goBack = document.getElementById("goBack");
goBack.href = from;