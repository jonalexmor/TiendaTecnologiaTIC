var username = new URL(location.href).searchParams.get("username");
var user;

$(document).ready(function () {

    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

    getUsuario().then(function () {

        $("#mi-perfil-btn").attr("href", "profile.html?username=" + username);

        $("#user-credito").html(user.credito.toFixed(2) + "$");

        getArticulos(false, "ASC");

        $("#ordenar-categoria").click(ordenarArticulos);
    });
});

async function getUsuario() {

    await $.ajax({
        type: "GET",
        dataType: "html",
        url: "./ServletUsuarioPedir",
        data: $.param({
            username: username
        }),
        success: function (result) {
            let parsedResult = JSON.parse(result);

            if (parsedResult != false) {
                user = parsedResult;
            } else {
                console.log("Error recuperando los datos del usuario");
            }
        }
    });

}
function getArticulos(ordenar, orden) {

    $.ajax({
        type: "GET",
        dataType: "html",
        url: "./ServletArticuloListar",
        data: $.param({
            ordenar: ordenar,
            orden: orden
        }),
        success: function (result) {
            let parsedResult = JSON.parse(result);

            if (parsedResult != false) {
                mostrarArticulos(parsedResult);
            } else {
                console.log("Error recuperando los datos de los articulos");
            }
        }
    });
}
function mostrarArticulos(articulos) {

    let contenido = "";

    $.each(articulos, function (index, articulo) {

        articulo = JSON.parse(articulo);
        let precio;

        if (articulo.inventario > 0) {

            if (user.leasing) {

                if (articulo.novedad) {
                    precio = (20000 - (20000 * 0.1));
                } else {
                    precio = (10000 - (10000 * 0.1));
                }
            } else {
                if (articulo.novedad) {
                    precio = 20000;
                } else {
                    precio = 10000;
                }
            }

            contenido += '<tr><th scope="row">' + articulo.id + '</th>' +
                    '<td>' + articulo.nombre + '</td>' +
                    '<td>' + articulo.categoria + '</td>' +
                    '<td>' + articulo.tipo + '</td>' +
                    '<td>' + articulo.inventario + '</td>' +
                    '<td><input type="checkbox" name="novedad" id="novedad' + articulo.id + '" disabled ';
            if (articulo.novedad) {
                contenido += 'checked';
            }
            contenido += '></td>' +
                    '<td>' + precio + '</td>' +
                    '<td><button onclick="alquilarArticulo(' + articulo.id + ',' + precio + ');" class="btn btn-success" ';
            if (user.credito < precio) {
                contenido += ' disabled ';
            }

            contenido += '>Alquilar</button></td></tr>'

        }
    });
    $("#articulos-tbody").html(contenido);
}
function ordenarArticulos() {

    if ($("#icono-ordenar").hasClass("fa-sort")) {
        getArticulos(true, "ASC");
        $("#icono-ordenar").removeClass("fa-sort");
        $("#icono-ordenar").addClass("fa-sort-down");
    } else if ($("#icono-ordenar").hasClass("fa-sort-down")) {
        getArticulos(true, "DESC");
        $("#icono-ordenar").removeClass("fa-sort-down");
        $("#icono-ordenar").addClass("fa-sort-up");
    } else if ($("#icono-ordenar").hasClass("fa-sort-up")) {
        getArticulos(false, "ASC");
        $("#icono-ordenar").removeClass("fa-sort-up");
        $("#icono-ordenar").addClass("fa-sort");
    }
}
function alquilarArticulo(id, precio) {

    $.ajax({
        type: "GET",
        dataType: "html",
        url: "./ServletArticuloAlquilar",
        data: $.param({
            id: id,
            username: username

        }),
        success: function (result) {
            let parsedResult = JSON.parse(result);

            if (parsedResult != false) {
                restarDinero(precio).then(function () {
                    location.reload();
                })
            } else {
                console.log("Error en la reserva del articulo");
            }
        }
    });
}


async function restarDinero(precio) {

    await $.ajax({
        type: "GET",
        dataType: "html",
        url: "./ServletUsuarioRestarDinero",
        data: $.param({
            username: username,
            credito: parseFloat(user.credito - precio)

        }),
        success: function (result) {
            let parsedResult = JSON.parse(result);

            if (parsedResult != false) {
                console.log("Saldo actualizado");
            } else {
                console.log("Error en el proceso de pago");
            }
        }
    });
}
