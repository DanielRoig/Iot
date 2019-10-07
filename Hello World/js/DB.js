function createDB() {

	var myDB = openDatabase('myDDBB', '1.0', 'This is a client side database', 2 * 1024 * 1024);

	if (!myDB) {
		alert('La BBDD no se ha creado correctamente');
	}

	myDB.transaction(function (tran) {
		tran.executeSql('CREATE TABLE IF NOT EXISTS Products (id INTEGER PRIMARY KEY, Name VARCHAR)');
		tran.executeSql('CREATE TABLE IF NOT EXISTS Brands (id INTEGER PRIMARY KEY, Name VARCHAR)');

		tran.executeSql('insert into Brands (Name) values ("Apple")');
	});
}