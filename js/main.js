/********** funciones de validacion de formularios **********/

function validarRegistro(formulario) {
	
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (formulario.correo.value.trim().length == 0) {
		alert("Debe ingresar un mail para continuar");
	  	return false;
	} else if (!re.test(formulario.correo.value)) {
	  	alert("Email inválido");
	  	return false;
	}
	
	if (formulario.contraseña.value.trim().length == 0) {
		alert("Debe ingresar una contraseña para continuar");
	  	return false;
	} else if (formulario.contraseña.value.trim().length < 9) {
		alert("Debe ingresar más de 8 caracteres");
		return false;
	} 
  
	if (formulario.contraseña.value != formulario.confirmacion.value) {
	  	alert("Contraseña no coincide");
	  	return false;
	}
	if (formulario.genero.value == "") {
		alert("Debe seleccionar un género para continuar");
	  	return false;
	}
  
	if (formulario.edad.value == "") {
	  	alert("Debe seleccionar un rango de edad para continuar");
	  	return false;
	}
  
	if (!formulario.terminos.checked) {
	  	alert("Debe aceptar los términos y condiciones");
	  	return false;
	}
  
	return true;
}

function validarLogin(formulario) {
	
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (formulario.correo.value.trim().length == 0) {
		alert("Debe ingresar un mail para continuar");
	  	return false;
	} else if (!re.test(formulario.correo.value)) {
	  	alert("Email inválido");
	  	return false;
	}
  
	if (formulario.contraseña.value.trim().length == 0) {
		alert("Debe ingresar una contraseña para continuar");
	  	return false;
	} else if (formulario.contraseña.value.trim().length < 9) {
		alert("Debe ingresar más de 8 caracteres");
		
		return false;
	}  
	
	return true;
}

/********** funcion para cargar datos  **********/

function loadTop3() {
	$.getJSON('./datos.json',function(data){
		var topValues = data.canciones.sort((a,b) => b.reproducciones-a.reproducciones).slice(0,3);
		for (var x = 1; x < 4; x++) {
			document.getElementById("top" + x).innerHTML = topValues[x-1].nombre;
			document.getElementById("audio" + x).setAttribute("src","./canciones/" + topValues[x-1].ruta)
		}
		/*console.log(topValues);*/
	});	
}

/********** funcion para cargar los top3 en el index **********/

function loadSongs() {
	var output = '';
	$.getJSON('./datos.json',function(data){
		var arrayLenght = Object.keys(data.canciones).length;	
		$.each(data.canciones,function(key, value){
			output += '<div class="">';
			output += '<div class="m-2" style="border: 1px solid #dadada;">';
			output += '<div class="row m-0" style="background-color: #e2e2e2ad;">';
			output += '<img src="imagenes/icon_' + value.icono + '.svg" width="25%" height="25%" class="d-inline-block mx-auto my-3" alt="Oye">';
			output += '</div>';
			output += '<div class="row m-0" style="background-color: #f8f9fa;">';
			output += '<p class="mx-auto mt-3 mb-1"><b>' + value.nombre + '</b></p>';
			output += '</div>';
			output += '<div class="row m-0" style="background-color: #f8f9fa;">';
			output += '<audio class="mx-auto my-3" controls="">';
			output += '<source src="canciones/' + value.ruta + '" type="audio/mp3">';
			output += '</audio>';
			output += '</div>';
			output += '</div>';
			output += '</div>';
			$('#filter-records').html(output);
		});
		fillFlex(arrayLenght);	  
	})
}

/********** funcion para filtrar live las canciones **********/

function filter(element) {
    var searchField = $(element).val();
    var regex = new RegExp(searchField, "i");
	var cantItems = 0;
    $("#filter-records > div").each(function() {
        if ($(this).text().search(regex) > -1) {
            $(this).show();
			cantItems ++;
        }
        else {
            $(this).hide();
        }
    });
	fillFlex(cantItems);
}

function fillFlex(value) {
    if (value %3 == 0 && value %2 !== 0) {
        place = '<div class="search-placeholder"></div>';
        $('#filter-records').append(place);
          
    } else if (value %3 !== 0 && value %2 == 0) {
        place = '<div class="search-placeholder"></div>';
        place += '<div class="search-placeholder"></div>';
        $('#filter-records').append(place);
            
    } else if (value %3 !== 0 && value %2 !== 0) {
        place = '<div class="search-placeholder"></div>';
        place += '<div class="search-placeholder"></div>';
        place += '<div class="search-placeholder"></div>';
        $('#filter-records').append(place);
    }
}

/********** script para cargar top 3 de canciones en index **********/

loadTop3();

/********** script para cargar todas las canciones en canciones **********/

loadSongs();

/********** script para limpiar el focus luego de cerrar la ventana modal **********/

$('body').on('hidden.bs.modal', '.modal', function() {
    $('.btn').blur();
}); 