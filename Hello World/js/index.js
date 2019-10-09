var progress = 10;
var myDB;


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




myDB.transaction(function (tran) {
	tran.executeSql('SELECT * FROM Brands', [], function (tran, data) {
		for (i = 0; i < data.rows.length; i++) {
			var element = document.createElement("option");
			element.innerHTML = data.rows[i].Name;
			element.value = data.rows[i].Name;
			document.getElementById("createDropdown").appendChild(element);
		}
	});
});

var createButton = document.getElementById("createButton");
createButton.addEventListener("click", function () {
	var valueDropdown = document.getElementById("createDropdown");
	var product = document.getElementById("createInput").value;

	myDB.transaction(function (tran) {
		tran.executeSql("SELECT ID FROM Brands WHERE Name='"+valueDropdown.options[valueDropdown.selectedIndex].value+"'", [], function (tran, data) {
			tran.executeSql('insert into Products (Name, BrandID) values ("' + product + '", ' + data.rows[0].ID + ')');
		});

	});
});