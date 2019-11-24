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
		<button class="btn btn-outline-danger" id="${DriverName}${CarName}DeleteButton" value="${DriverName}">Delete order</button>
		<button class="btn btn-success" id="${DriverName}${CarName}DoneButton" data-drivername="${DriverName}" data-toggle="modal" data-target="#doneModal">Done</button>

	  </div>
	</div>
  </div>`;

  document.getElementById("nav-tabContent").appendChild(element);


  $('#doneModal').on('show.bs.modal', function (e) {

    var drivername = $(e.relatedTarget).data('drivername');
 
    $(e.currentTarget).find('div[class="modal-body"]').text(drivername);

    $(e.currentTarget).find('button[class="btn btn-success done"]').val(drivername);

  });
}

function deleteFromDB(name){

}

function deleteFromFrontEnd(){

}

$('.done').on('click', function (e) {

  var drivername = e.currentTarget.value;


});