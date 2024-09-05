
window.onload = function () {
    // confirm("visit?");
    // var p = document.getElementById("p1");
    // p.innerHTML = new Date();
    var p = document.getElementById("p1");
    document.getElementById("ceva").onclick = function () {
        var paragrafe = document.getElementsByClassName("a");
        window.alert("nr de paragrafe cu clasa 'a': " + paragrafe.length);
        paragrafe[3].className = "b";
        window.alert("nr de paragrafe cu clasa 'a': " + paragrafe.length);
    }
    document.getElementById("create_button").onclick = function () {
        var pgf = document.createElement("p");
        pgf.className = "a";
        pgf.innerHTML = "<b>pgf creat<b>";
        console.log(pgf);
        document.getElementById("dv").appendChild(pgf);
    }
    document.getElementById("create_button2").onclick = function () {
        var pgf = document.createElement("p");
        pgf.className = "a";
        pgf.innerHTML = "pgf creat";
        console.log(pgf);
        document.body.appendChild(pgf);
    }
    document.getElementById("create_button_input").onclick = function () {
        var pgf = document.createElement("p");
        pgf.className = "a";
        pgf.innerHTML = document.getElementById("i_text").value;
        document.getElementById("dv").appendChild(pgf);
    }
    document.getElementById("remove_button").onclick = function () {
        var paragrafe = document.getElementsByTagName("p");
        paragrafe[paragrafe.length - 1].remove();
    }
    document.getElementById("remove_button2").onclick = function () {
        var paragrafe = document.getElementById("dv").getElementsByTagName("p");
        paragrafe[paragrafe.length - 1].remove();
    }

}

var show_date_button = document.getElementById("show_date_button");
show_date_button.onclick = function () {
    show_date_button.innerHTML = new Date();
};