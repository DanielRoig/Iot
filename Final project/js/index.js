var myDB;

createDB();


function createPost(id) {

	if (id != NaN) {
		var data1;
		myDB.transaction(function (tran) {
			tran.executeSql(`SELECT * FROM Cars WHERE ID=${id}`, [], function (tran, data) {
				for (var i = 0; i < data.rows.length; i++) {
					data1 = data.rows[i];
				}

				tran.executeSql(`SELECT * FROM Products WHERE CarID=${id}`, [], function (tran, data) {
					//drivername carname
					if (!document.getElementById(`${data1.DriverName}${data1.CarName}`)) {
						createNewLabel(data1.CarName, data1.LicenseNumber, data1.DriverName, data1.DescriptionOrder, data);
					}
				});
			});
		});
	}
}

//createPost(1);
//createPost(2);
//createPost(3);
//createPost(4);




const interval = setInterval(function () {
	var epc;
	var id = []
	var x = new XMLHttpRequest();
	x.open("GET", "http://localhost:3161/devices/simulator/inventory/", true);
	x.onreadystatechange = function () {
		if (x.readyState == 4 && x.status == 200) {
			var doc = x.responseXML;

			// var size = doc.getElementsByTagName("size")[0].firstChild.nodeValue;
			// console.log(size);
			var AdvanNetId = doc.getElementsByTagName("advanNetId")[0].firstChild.nodeValue;


			// We read all the epcs
			for (var i = 0; i < doc.getElementsByTagName("epc").length; i++) {
				epc = doc.getElementsByTagName("epc")[i].childNodes[0].nodeValue;
				console.log(parseInt(epc));
				createPost(epc);
			}
		}
	};
	x.send();
}, 500);

// open -n -a /Applications/Google\ Chrome.app --args --user-data-dir="/Users/jordi/unirepos/Iot/IoT-simulator-2.3.18_02" --disable-web-security
// $ open -a Google\ Chrome --args --disable-web-security --/Users/jordi/unirepos/Iot/Chrome_test