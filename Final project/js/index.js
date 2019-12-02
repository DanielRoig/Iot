var myDB;

createDB();


function createPost(id) {

	if (id != NaN) {
		var data1;
		myDB.transaction(function (tran) {
			tran.executeSql(`SELECT * FROM Cars WHERE ID=${id}`, [], function (tran, data) {
				if (data.rows.length) {
					for (var i = 0; i < data.rows.length; i++) {
						data1 = data.rows[i];
					}

					tran.executeSql(`SELECT * FROM Products WHERE CarID=${id}`, [], function (tran, data) {
						if (data.rows.length) {
							if (!document.getElementById(`${data1.DriverName}${data1.CarName}Label`)) {
								createNewLabel(data1.CarName, data1.LicenseNumber, data1.DriverName, data1.DescriptionOrder, data);
							}
						}
					});
				}
			});
		});
	}
}

const interval = setInterval(function () {
	var epc;
	var x = new XMLHttpRequest();
	x.open("GET", "http://localhost:3161/devices/simulator/inventory/", true);
	x.onreadystatechange = function () {
		if (x.readyState == 4 && x.status == 200) {
			var doc = x.responseXML;

			for (var i = 0; i < doc.getElementsByTagName("epc").length; i++) {
				epc = doc.getElementsByTagName("epc")[i].childNodes[0].nodeValue;
				console.log(parseInt(epc));
				createPost(epc);
			}
		}
	};
	x.send();
}, 500);