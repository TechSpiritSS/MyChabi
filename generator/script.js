var password=document.getElementById("password");

function copyPassword() {
 var copyText = document.getElementById("password");
 copyText.select();
 document.execCommand("copy");  
}
var data = 10;
  
document.getElementById("counting").innerText = data;  

function increment() {
    if(data<16){
        data = data + 1;
        document.getElementById("counting").innerText = data;
    }
}
let x=1;
function decrement() {
    if(data>5){
        data = data - 1;
        document.getElementById("counting").innerText = data; 
    }
    if(data<10 && Boolean(x)){
       x=0;
            alert("Preferred to have atleast 10 characters in password for more security");
    } 

}

function genPassword(){ 
   var chars = "$@!%*#?&0123456789ABCDabcdefghijklmnopqrstuv6789wxyzEFGHIJKLMNOPQRSTUVWXYZ";
   var password = "";
    for (var i = 0; i < data; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber +1);
 }
       document.getElementById("password").value = password;
}