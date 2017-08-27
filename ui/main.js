/*var button = document.getElementById('btn');
button.onclick = function () {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
       if(request.readyState===XMLHttpRequest.DONE){
           if(request.status===200){
               var num=request.responseText;
               var span = document.getElementById('count');
               span.innerHTML = num;
           }
       } 
    };
    request.open('GET', 'http://ktssaiteja.imad.hasura-app.io/counter', true);
    request.send(null);
};*/
window.onload = function() {
    var lbutton = document.getElementById('sub');
lbutton.onclick = function () {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
       if(request.readyState===XMLHttpRequest.DONE){
           if(request.status===200){
               console.log("User logged in.");
               alert("Logged in successfully");
           }
           else if(request.status===403){
               alert("Incorrect Password/Username");
           }
           else if(request.status===500){
               alert("something is wrong with the server.");
           }
       } 
    };
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    console.log(username);
    console.log(password);
    request.open('POST', 'http://ktssaiteja.imad.hasura-app.io/login', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({username: username, password: password}));
};
};