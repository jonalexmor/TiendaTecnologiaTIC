var username = new URL(location.href).searchParams.get("username");
var user;

$(document).ready(function () {


    fillUsuario().then(function () {

        $("#user-credito").html("$" + user.credito.toFixed());

        getAlquiladas(user.username);
    });

    $("#alquilar-btn").attr("href", `home.html?username=${username}`);

    $("#form-modificar").on("submit", function (event) {

        event.preventDefault();
        modificarUsuario();
    });

    $("#aceptar-eliminar-cuenta-btn").click(function () {

        eliminarCuenta().then(function () {
            location.href = "login.html";
        })
    })

});

async function fillUsuario() {
    await $.ajax({
        type: "GET",
        dataType: "html",
        url: "./ServletUsuarioPedir",
        data: $.param({
            username: username,
        }),
        success: function (result) {
            let parsedResult = JSON.parse(result);

            if (parsedResult != false) {
                user = parsedResult;

                $("#input-username").val(parsedResult.username);
                $("#input-contrasena").val(parsedResult.contrasena);
                $("#input-nombre").val(parsedResult.nombre);
                $("#input-apellidos").val(parsedResult.apellidos);
                $("#input-email").val(parsedResult.email);
                $("#input-credito").val(parsedResult.credito.toFixed(2));
                $("#input-leasing").prop("checked", parsedResult.leasing);

            } else {
                console.log("Error recuperando los datos del usuario");
            }
        }
    });
}

function getAlquiladas(username) {


    $.ajax({
        type: "GET",
        dataType: "html",
        url: "./ServletAlquilerListar",
        data: $.param({
            username: username,
        }),
        success: function (result) {
            let parsedResult = JSON.parse(result);

            if (parsedResult != false) {

                mostrarHistorial(parsedResult)

            } else {
                console.log("Error recuperando los datos de los alquileres");
            }
        }
    });
}

function mostrarHistorial(articulos) {
    let contenido = "";
    if (articulos.length >= 1) {
        $.each(articulos, function (index, articulo) {
            articulo = JSON.parse(articulo);

            contenido += '<tr><th scope="row">' + articulo.id + '</th>' +
                    '<td>' + articulo.nombre + '</td>' +
                    '<td>' + articulo.categoria + '</td>' +
                    '<td><input type="checkbox" name="novedad" id="novedad' + articulo.id 
                    + '" disabled ';
            if (articulo.novedad) {
                contenido += 'checked'
            }
            contenido += '></td><td>' + articulo.fechaAlquiler + '</td>' +
                    '<td><button id="devolver-btn" onclick= "devolverarticulo(' + articulo.id 
                    + ');" class="btn btn-danger">Devolver articulo</button></td></tr>';

        });
        $("#historial-tbody").html(contenido);
        $("#historial-table").removeClass("d-none");
        $("#historial-vacio").addClass("d-none");

    } else {
        $("#historial-vacio").removeClass("d-none");
        $("#historial-table").addClass("d-none");
    }
}


function devolverArticulo(id) {

    $.ajax({
        type: "GET",
        dataType: "html",
        url: "./ServletArticuloDevolver",
        data: $.param({
            username: username,
            id: id,
        }),
        success: function (result) {

            if (result != false) {

                location.reload();

            } else {
                console.log("Error devolviendo el articulo");
            }
        }
    });

}

function modificarUsuario() {

    let username = $("#input-username").val();
    let contrasena = $("#input-contrasena").val();
    let nombre = $("#input-nombre").val();
    let apellidos = $("#input-apellidos").val();
    let email = $("#input-email").val();
    let credito = $("#input-credito").val();
    let leasing = $("#input-leasing").prop('checked');
    $.ajax({
        type: "GET",
        dataType: "html",
        url: "./ServletUsuarioModificar",
        data: $.param({
            username: username,
            contrasena: contrasena,
            nombre: nombre,
            apellidos: apellidos,
            email: email,
            credito: credito,
            leasing: leasing,
        }),
        success: function (result) {

            if (result != false) {
                $("#modificar-error").addClass("d-none");
                $("#modificar-exito").removeClass("d-none");
            } else {
                $("#modificar-error").removeClass("d-none");
                $("#modificar-exito").addClass("d-none");
            }

            setTimeout(function () {
                location.reload();
            }, 3000);

        }
    });

}

async function eliminarCuenta() {

    await $.ajax({
        type: "GET",
        dataType: "html",
        url: "./ServletUsuarioEliminar",
        data: $.param({
            username: username
        }),
        success: function (result) {

            if (result != false) {

                console.log("Usuario eliminado")

            } else {
                console.log("Error eliminando el usuario");
            }
        }
    });
}




