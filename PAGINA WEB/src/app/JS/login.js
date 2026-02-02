document.getElementById("loginBtn").onclick=function(){
let email=document.getElementById("email").value;
let pass=document.getElementById("pass").value;

let savedEmail=localStorage.getItem("email");
let savedPass=localStorage.getItem("pass");

if(email===savedEmail && pass===savedPass){
alert("Bienvenido");
window.location.href="inicio.html";
}else{
document.getElementById("msg").innerText="Datos incorrectos";
}
}
