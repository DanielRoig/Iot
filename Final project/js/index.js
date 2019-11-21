var myDB;

createDB();


myDB.transaction(function (tran) {
	tran.executeSql('SELECT * FROM Brands', [], function (tran, data) {
		for (var i = 0; i < data.rows.length; i++) {
			var element = document.createElement("option");
			element.innerHTML = data.rows[i].Name;
			element.value = data.rows[i].Name;

/* 			document.getElementById("createDropdown").appendChild(element.cloneNode(true));
			document.getElementById("readDropdown").appendChild(element.cloneNode(true));
			document.getElementById("deleteDropdownBrands").appendChild(element.cloneNode(true));
 */
		}
	});
});

/* var createButton = document.getElementById("createButton");
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
}); */

/* var createButtonBrand = document.getElementById("createButtonBrand");
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
}); */

/* var readDropdown = document.getElementById("readDropdown")
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
}); */

/* 
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
}); */

/* var deleteButton = document.getElementById("deleteButton");
deleteButton.addEventListener("click", function () {

	var deleteDropdownProducts = document.getElementById("deleteDropdownProducts");
	myDB.transaction(function (tran) {
		tran.executeSql("DELETE FROM Products WHERE Name = '" + deleteDropdownProducts.options[deleteDropdownProducts.selectedIndex].value + "'", [], function (tran, data) {
			deleteDropdownProducts.removeChild(deleteDropdownProducts.options[deleteDropdownProducts.selectedIndex]);
			
		});
	});
}); */

var epc = []
var x = new XMLHttpRequest();
x.open("GET", "http://localhost:3161/devices/simulator/inventory/", true);
x.onreadystatechange = function () {
  if (x.readyState == 4 && x.status == 200)
  {
    var doc = x.responseXML;
	  console.log(doc);
      var size = doc.getElementsByTagName("size")[0].firstChild.nodeValue;
	  console.log(size);
      var AdvanNetId = doc.getElementsByTagName("advanNetId")[0].firstChild.nodeValue;
	  console.log(AdvanNetId);
          
      // We read all the epcs
      for(var i=0; i < doc.getElementsByTagName("epc").length; i++){
		  epc.push(doc.getElementsByTagName("epc")[i].childNodes[0].nodeValue);
      }
	  console.log(epc);
  }
};

x.send(epc);

myDB.transaction (function (tran,id){
	var trx = "";
	id=epc;
	tran.executeSql('insert into Cars (ID, Name, License, OrderID ) values (?, "Toyota", "477663 RTT", ?)',[id[0], id[1]])
	trx= tran.executeSql('select * from Cars');
	console.log(trx);
});



// open -n -a /Applications/Google\ Chrome.app --args --user-data-dir="/Users/jordi/unirepos/Iot/IoT-simulator-2.3.18_02" --disable-web-security
// $ open -a Google\ Chrome --args --disable-web-security --/Users/jordi/unirepos/Iot/Chrome_test

