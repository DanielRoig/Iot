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

var createButtonBrand = document.getElementById("createButtonBrand");
createButtonBrand.addEventListener("click", function () {
	var brand = document.getElementById("createInputBrand").value;
	if (brand != "") {
		myDB.transaction(function (tran) {
			tran.executeSql('insert into Brands (Name) values ("' + brand + '")');

			var element = document.createElement("option");
			element.innerHTML = brand;
			element.value = brand;

			document.getElementById("createDropdown").appendChild(element.cloneNode(true));
			document.getElementById("readDropdown").appendChild(element.cloneNode(true));
			document.getElementById("deleteDropdownBrands").appendChild(element.cloneNode(true));
		});
		document.getElementById("createInputBrand").value = "";
	}
});

var readDropdown = document.getElementById("readDropdown")
readDropdown.addEventListener('change', (event) => {
	var textBox = document.getElementById("textBox")

	while (textBox.hasChildNodes()) {
		textBox.removeChild(textBox.lastChild);
	}

	myDB.transaction(function (tran) {
		tran.executeSql("SELECT ID FROM Brands WHERE Name='" + readDropdown.options[readDropdown.selectedIndex].value + "'", [], function (tran, data) {
			tran.executeSql('SELECT Name FROM Products WHERE PRODUCTS.BrandID=' + data.rows[0].ID, [], function (tran, data) {
				for (var i = 0; i < data.rows.length; i++) {
					var element = document.createElement("li");
					element.innerHTML = data.rows[i].Name;
					element.value = data.rows[i].Name;
					element.className = "list-group-item";
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

//var inventory= window.open("GET",'file:////Users/jordi/unirepos/Iot/Hello World/inventory.xml',false);
//var epc = [];

//epc[0]=inventory.getElementsByTagName("epc")[0].childNodes[0].nodeValue;

var x = new XMLHttpRequest();
x.open("GET", "http://localhost:3161/devices/simulator/inventory", true);
x.onReadystatechange = function () {
  if (x.readyState == 4 && x.status == 200)
  {
    var doc = x.responseXML;
    console.log(doc);
	// …
	parser = new DOMParser();
	xmlDoc = parser.parseFromString(doc,"text/xml");
	var epc = xmlDoc.getElementsByTagName("epc")[0].childNodes[0].nodeValue;
	console.log(epc);
  }
};
x.send(null);

//var epc = invent.getElementsByTagName("epc")[0].getElementsByTagName("epc")[0].firstChild.nodeValue;

// open -n -a /Applications/Google\ Chrome.app --args --user-data-dir="/Users/jordi/unirepos/Iot/IoT-simulator-2.3.18_02" --disable-web-security
// $ open -a Google\ Chrome --args --disable-web-security --/Users/jordi/unirepos/Iot/Chrome_test
