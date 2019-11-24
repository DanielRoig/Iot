function createNewLabel(CarName, LicenseNumber, DriverName, Description, ProductsObject) {
  var element = document.createElement("a");
  element.className = "list-group-item list-group-item-action";
  element.id = `${DriverName}${CarName}Label`;
  element.href = `#${DriverName}${CarName}Detail`;

  element.setAttribute("data-toggle", "list");
  element.setAttribute("role", "tab");
  element.setAttribute("aria-controls", "home");

  element.innerHTML = `Car: <b>${CarName}</b> License plate: <b>${LicenseNumber}</b>`;

  document.getElementById("list-tab").appendChild(element);
  var listElements = '';
  for (var i = 0; i < ProductsObject.rows.length; i++) {
    listElements += `<li class="list-group-item d-flex justify-content-between align-items-center">
        ${ProductsObject.rows[i].ProductName}
        <span class="badge badge-primary badge-pill">${ProductsObject.rows[i].NumProd}</span>
      </li>`
  }

  createNewDetail(CarName, LicenseNumber, DriverName, Description, listElements)
}



function createNewDetail(CarName, LicenseNumber, DriverName, Description, ProductArray) {
  var element = document.createElement("a");
  element.className = "tab-pane fade";
  element.id = `${DriverName}${CarName}Detail`;

  element.setAttribute("role", "tabpanel");
  element.setAttribute("aaria-labelledby", "list-messages-list");

  element.innerHTML = `<div class="card active">
	<div class="card-body">
	  <h5 class="card-title">${CarName} ${LicenseNumber}</h5>
	  <ul class="list-group" id="list">
		${ProductArray}
	  </ul>

	  <dl class="row mt-3">
		<dt class="col-sm-4">Description:</dt>
		<dd class="col-sm-8">${Description}</dd>

		<dt class="col-sm-4">Name car driver:</dt>
		<dd class="col-sm-8">${DriverName}</dd>
	  </dl>

	  <div class="text-right mt-3">
		<button class="btn btn-outline-danger" id="${DriverName}${CarName}DeleteButton" data-drivername="${DriverName}" data-id="${DriverName}${CarName}" data-toggle="modal" data-target="#deleteModal">Delete order</button>
		<button class="btn btn-success" id="${DriverName}${CarName}DoneButton" data-drivername="${DriverName}" data-id="${DriverName}${CarName}" data-toggle="modal" data-target="#doneModal">Done</button>

	  </div>
	</div>
  </div>`;

  document.getElementById("nav-tabContent").appendChild(element);


  $('#doneModal').on('show.bs.modal', function (e) {

    var drivername = $(e.relatedTarget).data('drivername');
    var dataID = $(e.relatedTarget).data('id');

    $(e.currentTarget).find('div[class="modal-body"]').text(drivername);

    $(e.currentTarget).find('button[class="btn btn-success done"]').attr("data-id", dataID);

    $(e.currentTarget).find('button[class="btn btn-success done"]').val(drivername);

  });

  $('#deleteModal').on('show.bs.modal', function (e) {

    var drivername = $(e.relatedTarget).data('drivername');
    var dataID = $(e.relatedTarget).data('id');

    $(e.currentTarget).find('div[class="modal-body"]').text(drivername);

    $(e.currentTarget).find('button[class="btn btn-success delete"]').attr("data-id", dataID);

    $(e.currentTarget).find('button[class="btn btn-success delete"]').val(drivername);

  });



}

function deleteFromDB(name, dataId) {
  var id;
  myDB.transaction(function (tran) {
    tran.executeSql(`SELECT ID FROM Cars WHERE DriverName="${name}"`, [], function (tran, data) {
      for (var i = 0; i < data.rows.length; i++) {
        id = data.rows[i].ID;
      }
      tran.executeSql(`DELETE FROM Cars WHERE DriverName="${name}"`, [], function (tran, data) {
        tran.executeSql(`DELETE FROM Products WHERE CarID=${id}`, [], function (tran, data) {
          deleteFromFrontEnd(dataId)
        });
      });
    });
  });
}

function deleteFromFrontEnd(dataId) {
  var element1 = document.getElementById(`${dataId}Label`);
  element1.parentNode.removeChild(element1)

  var element2 = document.getElementById(`${dataId}Detail`);
  element2.parentNode.removeChild(element2)
}


$('.done').on('click', function (e) {
  var drivername = e.currentTarget.value;
  var dataId = e.currentTarget.getAttribute("data-id")
  deleteFromDB(drivername, dataId)
});

$('.delete').on('click', function (e) {
  var drivername = e.currentTarget.value;
  var dataId = e.currentTarget.getAttribute("data-id")
  deleteFromDB(drivername, dataId)
});