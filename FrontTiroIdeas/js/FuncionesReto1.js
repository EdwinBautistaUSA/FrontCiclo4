const nombre = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password1 = document.getElementById("password1");
const form = document.getElementById("form");
const parrafo = document.getElementById("warnings");
const emailIngreso = document.getElementById("emailIngreso");
const passIngreso =document.getElementById('passIngreso');

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, options);
    var instance = M.Modal.getInstance(elem);
    instance.open();
});



form.addEventListener("submit", (e) => {
  e.preventDefault();
  let warnings = "";
  let regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  /*let regexEmail1 = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;*/
  let entrar = false;
  parrafo.innerHTML = "";
  if (nombre.value.length <= 0) {
    warnings += `Debes digitar tu nombre <br>`;
    entrar = true;
  }else if (!regexEmail.test(email.value)) {
    warnings += `El email es incorrecto <br>`;
    entrar = true;
  }else if (password.value.length <= 0) {
    warnings += `Debes diligenciar el password <br>`;
    entrar = true;
  } else if (password.value != password1.value) {
    warnings += `Las contraseñas no coinciden <br>`;
    entrar = true;
  }
  
  if (entrar) {
    parrafo.innerHTML = warnings;
  } else {
      let datosUsuario = {
      email: $("#email").val(),
      password: $("#password").val(),
      name: $("#name").val(),
    };
    let datosJson = JSON.stringify(datosUsuario);
    $.ajax({
      url: "http://localhost:8080/api/user/new",
      data: datosJson,
      type: "POST",
      dataType: "JSON",
      contentType: "application/json; charset=utf-8",

      success: function (respuesta) {
        /*let id = respuesta.id;
        let name = respuesta.name;
        let email = respuesta.email;
        if (id === null) {
           alert("El email" + " " + email + " " +"ya existe");
           $("#email").focus();
        } else {*/
          alert("Se ha registrado correctamente");
          $("#nombre").val("");
          $("#email").val("");
          $("#password").val("");
          $("#password1").val("");
      },
    });
  }

});

function saveUser() {
    let datosUser = {
        id: $("#id").val(),
        identification: $("#identification").val(),
        name: $("#name").val(),
        address: $("#address").val(),
        cellPhone: $("#cellPhone").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        zone: $("#zone").val(),
        type: $("#type").val()
    };
    let datosJson = JSON.stringify(datosUser);
    $.ajax({
        url: 'http://localhost:8080/api/user/new',
        data: datosJson,
        type: 'POST',
        dataType: 'JSON',
        contentType: "application/json; charset=utf-8",
        
        success:function (respuesta) {
            console.log("Se ha Registrado Correctamente");
            getUsers();
            alert("El registro se ha guardado con exito");
                $("#id").val("");
                $("#identification").val("");
                $("#name").val("");
                $("#address").val("");
                $("#cellPhone").val("");
                $("#email").val("");
                $("#password").val("");
                $("#zone").val("");
                $("#type").val("");
        }
    });
}

function getUsers() {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'http://localhost:8080/api/user/all');
    xhttp.send();
    
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200){
            let users = JSON.parse(this.responseText);
            
            let res = document.querySelector('#resUsers');
            res.innerHTML = '';

            for (let item of users) {
                res.innerHTML += `
                <tr>
                <td>${item.id}</td>
                <td>${item.identification}</td>
                <td>${item.name}</td>
                <td>${item.address}</td>
                <td>${item.cellPhone}</td>
                <td>${item.email}</td>
                <td>${item.password}</td>
                <td>${item.zone}</td>
                <td>${item.type}</td>
                <td><button class="btn" onclick="borrarUsers(${item.id})"><i class="material-icons right">delete_forever</i>Eliminar</button></td>
                <td><button class="btn" onclick="updateUser(${item.id})"><i class="material-icons right">edit</i>Editar</button></td>
                </tr>   `
            }
        }
    }
}

function borrarUsers(idUser) {
    let datosUser = {
        id : idUser
    };
    let datosJson = JSON.stringify(datosUser);
    $.ajax({
        url: "http://localhost:8080/api/user/"+idUser,
        data: datosJson,
        type: 'DELETE',
        dataType: 'JSON',
        contentType: "application/json; charset=utf-8",
        
        success:function (respuesta) {
            $("#resUsers").empty();
            getUsers();
            alert("Se ha eliminado el Registro correctamente");
        }
    });
}

function updateUser(idUser) {
    let datosUser1 = {
        id: idUser,
        identification: $("#identification").val(),
        name: $("#name").val(),
        address: $("#address").val(),
        cellPhone: $("#cellPhone").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        zone: $("#zone").val(),
        type: $("#type").val()
    };
    let datosJson = JSON.stringify(datosUser1);
    $.ajax({
        url: "http://localhost:8080/api/user/update",
        data: datosJson,
        type: 'PUT',
        dataType: 'JSON',
        contentType: "application/json; charset=utf-8",

        success : function (respuesta) {
            $("#identification").val("");
            $("#name").val("");
            $("#address").val("");
            $("#cellPhone").val("");
            $("#email").val("");
            $("#password").val("");
            $("#zone").val("");
            $("#type").val("");
            $("#id").val("");
            getUsers();
            alert("Registro se ha actualizado correctamente");
        },
        error : function (xhr,status) {
            alert("ha sucedido un problema" + status);
        }
    });
}

function saveAcc() {
    let datosAcc = {
        reference : $("#reference").val(),
        brand : $("#brand").val(),
        category : $("#category").val(),
        material : $("#material").val(),
        description : $("#description").val(),
        available : $("#available").val(),
        price : $("#price").val(),
        quantity : $("#quantity").val(),
        photography : $("#photography").val()
    };
    let datosJson = JSON.stringify(datosAcc);

    const reference = document.getElementById("reference");
    const brand = document.getElementById("brand");
    const category = document.getElementById("category");
    const material = document.getElementById("material");
    const description = document.getElementById("description");
    const available = document.getElementById("available");
    const price =document.getElementById("price");
    const quantity = document.getElementById("quantity");
    const photography = document.getElementById("photography");

    let warnings = ""
    let entrar = false;
    parrafo.innerHTML = "";

    if (reference.value.length <= 0){
        warnings += `Debes digitar la referencia <br>`;
        entrar = true;
    }else if (brand.value.length <= 0){
        warnings += `Debes digitar la marca <br>`;
        entrar = true;
    }else if (category.value.length <=0){
        warnings += `Debes digitar la Categoria <br>`;
        entrar = true;
    }else if (material.value.length <=0){
        warnings += `Debes digitar el Material <br>`;
        entrar = true;
    }else if (photography.value.length <=0){
        warnings += `Debes digitar la Fotografia <br>`;
        entrar = true;
    }else if (description.value.length <= 0){
        warnings += `Debes digitar la Descripción <br>`;
        entrar = true;
    }else if (available.value.length <=0){
        warnings += `Debes validar la Disponibilidad <br>`;
        entrar = true;
    }else if (price.value.length <= 0){
        warnings += `Debes digitar el precio <br>`;
        entrar = true;
    }else if (quantity.value.length <= 0){
        warnings += `Debes digitar la Cantidad <br>`;
        entrar = true;
    }if (entrar){
        parrafo.innerHTML = warnings;
    }else {
        console.log("Felicidades")
        $.ajax({
            url : 'http://localhost:8080/api/accessory/new',
            data : datosJson,
            dataType : 'JSON',
            type : 'POST',
            contentType: "application/json; charset=utf-8",

            success : function (respuesta) {
                console.log("Registro almacenado con exito");
                alert("Se ha almacenado con exito");
                $("#reference").val("");
                $("#brand").val("");
                $("#category").val("");
                $("#material").val("");
                $("#description").val("");
                $("#available").val("");
                $("#price").val("");
                $("#quantity").val("");
                $("#photography").val("");
            }
        });
    }/**/
}

function getAccesories() {
    const xhttp1 = new XMLHttpRequest();
    xhttp1.open('GET', 'http://localhost:8080/api/accessory/all');
    xhttp1.send();

    xhttp1.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200){
            let accesory = JSON.parse(this.responseText);

            let res = document.querySelector('#resAcces');
            res.innerHTML = '';

            for (let item of accesory) {
                res.innerHTML += `
                <tr>
                <td>${item.reference}</td>
                <td>${item.brand}</td>
                <td>${item.category}</td>
                <td>${item.material}</td>
                <td>${item.description}</td>
                <td>${item.availability}</td>
                <td>${item.price}</td>
                <td>${item.quantity}</td>
                <td>${item.photography}</td>
                <td><button class="btn" onclick="borrarAccesory(${item.reference})"><i class="material-icons right">delete_forever</i>Eliminar</button></td>
                <td><button class="btn modal-trigger" href="#modalupdate" onclick="obtenerAccesoryId(${item.reference})" type="button"><i class="material-icons right">edit</i>Editar</button></td>
                </tr>   
                `
            }
        }
    }
}

function borrarAccesory(idReference) {
    let datosReference = {
        reference : idReference
    };
    let datosJson = JSON.stringify(datosReference);

    $.ajax({
        url : "http://localhost:8080/api/accessory/"+idReference,
        data: datosJson,
        type: 'DELETE',
        dataType: 'JSON',
        contentType: "application/json; charset=utf-8",

        success : function (respuesta){
            /*$("#resAcces").empty();*/
            getAccesories();
            alert("Se ha eliminado el Registro correctamente");
            console.log("borrado");
        }
    });
}

function obtenerAccesoryId(id){
    parametro = {
        reference : id
    }
    $.ajax({
        url : "http://localhost:8080/api/accessory/"+id,
        data: parametro,
        type: 'GET',
        dataType: 'JSON',
        contentType: "application/json; charset=utf-8",

        success : function (respuesta){
            console.log(respuesta);
            for (i=0; i<respuesta.items.length; i++){
                $("#referenceUpdate").val(respuesta.items[i].reference);
                $("#brandUpdate").val(respuesta.items[i].brand);
                /*$("#job").val(respuesta.items[i].job);
                $("#mgr").val(respuesta.items[i].mgr);
                $("#sal").val(respuesta.items[i].sal);*/
            }
        }
    });

}