var button = document.getElementById('btn');
var num=0;
button.onClick() = function(){
    
    num+=1;
    var span = document.getElementById('count');
    span.innerHTML=num.toString();
};