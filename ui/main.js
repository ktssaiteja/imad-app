var button = document.getElementById('btn');
var num = 0;
button.onclick = function () {
    num = num + 1;
    var span = document.getElementById('count');
    span.innerHTML = num.toString();
}