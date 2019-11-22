var myDB;

createDB();


function createPost(id) {

	var data1;
	var data2;

	myDB.transaction(function (tran) {
		tran.executeSql(`SELECT * FROM Cars WHERE ID=${id}`, [], function (tran, data) {
			for (var i = 0; i < data.rows.length; i++) {
				data1 = data.rows[i];
			}

			tran.executeSql(`SELECT * FROM Products WHERE CarID=${id}`, [], function (tran, data) {
				createNewLabel(data1.CarName, data1.LicenseNumber, data1.DriverName, data1.DescriptionOrder, data);
			});
		});
	});
}

createPost(1);
createPost(2);





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