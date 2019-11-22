function createNewLabel(CarName, LicenseNumber, DriverName, Description, ProductsObject) {
    var element = document.createElement("a");
    element.className = "list-group-item list-group-item-action";
    element.id = "list-home-list";
    element.href = `#${DriverName}${CarName}`;

    element.setAttribute("data-toggle", "list");
    element.setAttribute("role", "tab");
    element.setAttribute("aria-controls", "home");

    element.innerHTML = `Car: <b>${CarName}</b> License plate: <b>${LicenseNumber}</b>`;

    document.getElementById("list-tab").appendChild(element);
    var listElements = '';
    for (var i = 0; i < ProductsObject.rows.length; i++) {
        listElements+= `<li class="list-group-item d-flex justify-content-between align-items-center">
        ${ProductsObject.rows[i].ProductName}
        <span class="badge badge-primary badge-pill">${ProductsObject.rows[i].NumProd}</span>
      </li>`
    }
console.log(listElements)

    createNewDetail(CarName, LicenseNumber, DriverName, Description, listElements)
}


function createNewDetail(CarName, LicenseNumber, DriverName, Description, ProductArray) {
    console.log(ProductArray)
    var element = document.createElement("a");
    element.className = "tab-pane fade";
    element.id = `${DriverName}${CarName}`;

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
		<button class="btn btn-outline-danger">Delete order</button>
		<button class="btn btn-success">Done</button>
	  </div>
	</div>
  </div>`;

    document.getElementById("nav-tabContent").appendChild(element);
}