var progress = 10;


//Esto es un "Listener", cada vez que se produce un cambio 
//en un elemento indicado, ejecuta agluna cosa
var button1 = document.getElementById("button1");
button1.addEventListener("click", function () {
	var element = document.getElementById("progress");
	if (progress <= 100) {
		progress += 10;
		element.style.width = progress + "%";
	}
});


//Esto es un "Listener", cada vez que se produce un cambio 
//en un elemento indicado, ejecuta agluna cosa
var checkbox = document.getElementById("customSwitch1");
checkbox.addEventListener("click", function () {
	if (checkbox.checked) {

		document.getElementById("button1").className = "btn btn-warning btn-lg mb-4";
		document.getElementById("progress").className = "progress-bar progress-bar-striped progress-bar-animated bg-warning";
	} else {
		document.getElementById("button1").className = "btn btn-primary btn-lg mb-4";
		document.getElementById("progress").className = "progress-bar progress-bar-striped progress-bar-animated";
	}

});

createDB();