var button = document.getElementById('btn');
button.onclick = function () {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
       if(request.readyState===XMLHttpRequest.DONE){
           if(request.status===200){
               var num=request.responseText;
               var span = document.getElementById('count');
               span.innerHTML = num.toString();
           }
       } 
    };
    var span = document.getElementById('count');
    span.innerHTML = num.toString();
    
    request.open('GET', 'http://ktssaiteja.imad.hasura-app.io/counter', true);
    request.send(null);
};