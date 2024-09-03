
window.onload = function () {
    // confirm("visit?");
    // var p = document.getElementById("p1");
    // p.innerHTML = new Date();
}

var show_date_button = document.getElementById("show_date_button");
show_date_button.onclick = function () {
    show_date_button.innerHTML = new Date();
};