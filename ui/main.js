var submit = document.getElementById('submit');
submit.onclick = function(){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            if(request.status === 200){
                var names=request.responseText;
                names = JSON.parse(names);
                var list = '';
                for(var i=0; i<names.length;i++){
                    list == '<li>' + names[i] + '</li>';
                }
                var ul = document.getElementById('namelist');
                ul.innerHTML = list;
            }
        }
    };
    
    var userid = document.getElementById('userid').value;
    var password = document.getElementById('password').value;
    request.open('POST', 'http://lucy31.imad.hasura-app.io/submit-name?name' + name,true);
    request.send(null);
};