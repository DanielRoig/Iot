function createDB() {

	myDB = openDatabase('myDDBB', '1.0', 'This is a client side database', 2 * 1024 * 1024);

	if (!myDB) {
		alert('La BBDD no se ha creado correctamente');
	}

	myDB.transaction(function (tran) {

		tran.executeSql('DROP TABLE Products');
		tran.executeSql('DROP TABLE Brands');

		tran.executeSql('CREATE TABLE IF NOT EXISTS Products (ID INTEGER PRIMARY KEY, Name VARCHAR, BrandID INTEGER, FOREIGN KEY (BrandID) REFERENCES Brands(ID))');
		tran.executeSql('CREATE TABLE IF NOT EXISTS Brands (ID INTEGER PRIMARY KEY, Name VARCHAR)');

		tran.executeSql('insert into Brands (Name) values ("Apple")');
		tran.executeSql('insert into Brands (Name) values ("Samsung")');
		
		tran.executeSql('insert into Products (Name, BrandID) values ("iPhone", 1)');
		tran.executeSql('insert into Products (Name, BrandID) values ("iPad", 1)');
		tran.executeSql('insert into Products (Name, BrandID) values ("Galaxy S10", 2)');
		tran.executeSql('insert into Products (Name, BrandID) values ("Galaxy Fold", 2)');

	});
}