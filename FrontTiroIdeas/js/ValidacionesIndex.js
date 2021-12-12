const form = document.getElementById("form");
const parrafo = document.getElementById("warnings");
const emailIngreso = document.getElementById("emailIngreso");
const passIngreso =document.getElementById('passIngreso');


form.addEventListener("submit", (e) => {
  e.preventDefault();
  let warnings = "";
  let regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  let entrar = false;
  parrafo.innerHTML = "";
  if (!regexEmail.test(emailIngreso.value)) {
    warnings += `El email es incorrecto <br>`;
    entrar = true;
  }else if (passIngreso.value.length <= 0) {
    warnings += `Debes diligenciar el password <br>`;
    entrar = true;
  }
  
  if (entrar) {
    parrafo.innerHTML = warnings;
  } else {
    alert("Bienvenido... ");
  }

});
