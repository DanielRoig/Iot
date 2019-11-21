async function createDB() {

	myDB = openDatabase('myDDBB', '1.0', 'This is a client side database', 2 * 1024 * 1024);

	myDB.transaction(async tran => {



		
			
		tran.executeSql('CREATE TABLE IF NOT EXISTS Cars (ID INTEGER PRIMARY KEY, Name VARCHAR, License VARCHAR, OrderID INTEGER, FOREIGN KEY (OrderID) REFERENCES Order(ID))'),
		
		tran.executeSql('CREATE TABLE IF NOT EXISTS Orders (ID INTEGER PRIMARY KEY, Product VARCHAR, NumProd INTEGER, CarID INTEGER, FOREIGN KEY (CarID) REFERENCES CarID))');

/* 		tran.executeSql('insert into Brands (Name) values ("Apple")'),
		tran.executeSql('insert into Brands (Name) values ("Samsung")'),

		tran.executeSql('insert into Products (Name, BrandID) values ("iPhone", 1)'),
		tran.executeSql('insert into Products (Name, BrandID) values ("iPad", 1)'),
		tran.executeSql('insert into Products (Name, BrandID) values ("Galaxy S10", 2)'),
		tran.executeSql('insert into Products (Name, BrandID) values ("Galaxy Fold", 2)')
 */
		
	})
}