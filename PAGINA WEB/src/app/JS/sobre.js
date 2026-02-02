function talk(){
let input=document.getElementById("userInput").value;
document.getElementById("chatBox").innerHTML+="<p>👤 "+input+"</p>";
document.getElementById("chatBox").innerHTML+="<p>🤖 La IA está aprendiendo sobre "+input+"</p>";
}
//