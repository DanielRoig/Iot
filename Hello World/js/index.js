var myDB;

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