document.getElementById("registerForm").addEventListener("submit", function(e){
e.preventDefault();

let inputs=document.querySelectorAll("input");
let name=inputs[0].value;
let email=inputs[1].value;
let pass=inputs[2].value;
let confirm=inputs[3].value;

if(pass!==confirm){
alert("Las contraseñas no coinciden");
return;
}

localStorage.setItem("name",name);
localStorage.setItem("email",email);
localStorage.setItem("pass",pass);

alert("Registro exitoso");
window.location.href="login.html";
});
