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
		for (var i = 0; i < data.rows.length; i++) {
			var element = document.createElement("option");
			element.innerHTML = data.rows[i].Name;
			element.value = data.rows[i].Name;

			document.getElementById("createDropdown").appendChild(element.cloneNode(true));
			document.getElementById("readDropdown").appendChild(element.cloneNode(true));
			document.getElementById("deleteDropdownBrands").appendChild(element.cloneNode(true));

		}
	});
});

var createButton = document.getElementById("createButton");
createButton.addEventListener("click", function () {
	var valueDropdown = document.getElementById("createDropdown");
	var product = document.getElementById("createInput").value;
	if (product != "") {
		myDB.transaction(function (tran) {
			tran.executeSql("SELECT ID FROM Brands WHERE Name='" + valueDropdown.options[valueDropdown.selectedIndex].value + "'", [], function (tran, data) {
				tran.executeSql('insert into Products (Name, BrandID) values ("' + product + '", ' + data.rows[0].ID + ')');
			});

		});
		document.getElementById("createInput").value = "";
	}
});

var readButton = document.getElementById("readButton");
readButton.addEventListener("click", function () {
	var valueDropdown = document.getElementById("readDropdown");
	var textBox = document.getElementById("textBox")
	
	while (textBox.hasChildNodes()) {
		textBox.removeChild(textBox.lastChild);
	}

	myDB.transaction(function (tran) {
		tran.executeSql("SELECT ID FROM Brands WHERE Name='" + valueDropdown.options[valueDropdown.selectedIndex].value + "'", [], function (tran, data) {
			tran.executeSql('SELECT Name FROM Products WHERE PRODUCTS.BrandID=' + data.rows[0].ID, [], function (tran, data) {
				for (var i = 0; i < data.rows.length; i++) {
					var element = document.createElement("div");
					element.innerHTML = data.rows[i].Name;
					element.value = data.rows[i].Name;
					textBox.appendChild(element);
				}
			});
		});
	});
});


var deleteDropdown = document.getElementById("deleteDropdownBrands")
deleteDropdown.addEventListener('change', (event) => {

	var options = document.getElementById("deleteDropdownProducts");

	for (var i = 1; i < options.childElementCount; i++) {
		options.removeChild(options.options[i]);
	}

	myDB.transaction(function (tran) {
		tran.executeSql("SELECT ID FROM Brands WHERE Name='" + event.target.value + "'", [], function (tran, data) {
			tran.executeSql('SELECT Name FROM Products WHERE PRODUCTS.BrandID=' + data.rows[0].ID, [], function (tran, data) {
				for (var i = 0; i < data.rows.length; i++) {

					var element = document.createElement("option");
					element.innerHTML = data.rows[i].Name;
					element.value = data.rows[i].Name;

					document.getElementById("deleteDropdownProducts").appendChild(element.cloneNode(true));
				}
			});
		});
	});
});

var deleteButton = document.getElementById("deleteButton");
deleteButton.addEventListener("click", function () {

	var deleteDropdownProducts = document.getElementById("deleteDropdownProducts");
	myDB.transaction(function (tran) {
		tran.executeSql("DELETE FROM Products WHERE Name = '" + deleteDropdownProducts.options[deleteDropdownProducts.selectedIndex].value + "'", [], function (tran, data) {
			deleteDropdownProducts.removeChild(deleteDropdownProducts.options[deleteDropdownProducts.selectedIndex]);
		});
	});
});