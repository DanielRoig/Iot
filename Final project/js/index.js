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


function createNewLabel(nameBrand, plate, nameDriver) {
	var element = document.createElement("a");
	element.className = "list-group-item list-group-item-action";
	element.id = "list-home-list";
	element.href = `#${nameDriver}${nameBrand}`;

	element.setAttribute("data-toggle", "list");
	element.setAttribute("role", "tab");
	element.setAttribute("aria-controls", "home");

	element.innerHTML = `Car: <b>${nameBrand}</b> License plate: <b>${plate}</b>`;

	document.getElementById("list-tab").appendChild(element);
	createNewDetail(nameBrand, plate, nameDriver)
}




function createNewDetail(nameBrand, plate, nameDriver) {
	var element = document.createElement("a");
	element.className = "tab-pane fade";
	element.id = `${nameDriver}${nameBrand}`;

	element.setAttribute("role", "tabpanel");
	element.setAttribute("aaria-labelledby", "list-messages-list");

	element.innerHTML = `<div class="card active">
	<div class="card-body">
	  <h5 class="card-title">${nameBrand} ${plate}</h5>
	  <ul class="list-group">
		<li class="list-group-item d-flex justify-content-between align-items-center">
		  CocaCola
		  <span class="badge badge-primary badge-pill">1</span>
		</li>
		<li class="list-group-item d-flex justify-content-between align-items-center">
		  Spaghetti
		  <span class="badge badge-primary badge-pill">2</span>
		</li>
		<li class="list-group-item d-flex justify-content-between align-items-center">
		  Meat
		  <span class="badge badge-primary badge-pill">1</span>
		</li>
	  </ul>

	  <dl class="row mt-3">
		<dt class="col-sm-3">Description</dt>
		<dd class="col-sm-9">A description list is perfect for defining terms.</dd>

		<dt class="col-sm-3">Euismod</dt>
		<dd class="col-sm-9">
		  <p>Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.</p>
		  <p>Donec id elit non mi porta gravida at eget metus.</p>
		</dd>

		<dt class="col-sm-3">Malesuada </dt>
		<dd class="col-sm-9">Etiam porta sem malesuada magna mollis euismod.</dd>
	  </dl>

	  <div class="text-right mt-3">
		<button class="btn btn-outline-danger">Delete order</button>
		<button class="btn btn-success">Done</button>
	  </div>
	</div>
  </div>`;

	document.getElementById("nav-tabContent").appendChild(element);
}

createNewLabel("opel", 4362346, "juan");
createNewLabel("citroen", 54654694, "marc");
createNewLabel("ferrari", 654746, "david");




var epc = []
var x = new XMLHttpRequest();
x.open("GET", "http://localhost:3161/devices/simulator/inventory/", true);
x.onreadystatechange = function () {
	if (x.readyState == 4 && x.status == 200) {
		var doc = x.responseXML;
		console.log(doc);
		var size = doc.getElementsByTagName("size")[0].firstChild.nodeValue;
		console.log(size);
		var AdvanNetId = doc.getElementsByTagName("advanNetId")[0].firstChild.nodeValue;
		console.log(AdvanNetId);

		// We read all the epcs
		for (var i = 0; i < doc.getElementsByTagName("epc").length; i++) {
			epc.push(doc.getElementsByTagName("epc")[i].childNodes[0].nodeValue);
		}
		console.log(epc);
	}
};

x.send(epc);

myDB.transaction(function (tran, id) {
	var trx = "";
	id = epc;
	tran.executeSql('insert into Cars (ID, Name, License, OrderID ) values (?, "Toyota", "477663 RTT", ?)', [id[0], id[1]])
	trx = tran.executeSql('select * from Cars');
	console.log(trx);
});



// open -n -a /Applications/Google\ Chrome.app --args --user-data-dir="/Users/jordi/unirepos/Iot/IoT-simulator-2.3.18_02" --disable-web-security
// $ open -a Google\ Chrome --args --disable-web-security --/Users/jordi/unirepos/Iot/Chrome_test