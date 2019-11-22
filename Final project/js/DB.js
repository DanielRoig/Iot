async function createDB() {

	myDB = openDatabase('myDDBB', '1.0', 'This is a client side database', 2 * 1024 * 1024);

	myDB.transaction(async tran => {
		
		tran.executeSql('CREATE TABLE IF NOT EXISTS Cars (ID INTEGER PRIMARY KEY, CarName VARCHAR, LicenseNumber VARCHAR, DriverName VARCHAR, DescriptionOrder VARCHAR)'),
		
		tran.executeSql('CREATE TABLE IF NOT EXISTS Products (ProductName VARCHAR, NumProd INTEGER, CarID INTEGER, FOREIGN KEY (CarID) REFERENCES Cars(ID))');

 		tran.executeSql('insert into Cars (CarName, LicenseNumber, DriverName, DescriptionOrder) values ("Nissan", "4561 NFH", "Daniel", "My car is big and yellow")');
		

		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Cocacola", 2, 1)');
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Meat", 1, 1)');
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Donuts", 5, 1)');


		tran.executeSql('insert into Cars (CarName, LicenseNumber, DriverName, DescriptionOrder) values ("Toyota", "9431 JKL", "Jordi", "Im in a hurry")');
		

		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Lettuce", 1, 2)');
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Tomatoes", 6, 2)');
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Potatoes", 7, 2)');


		tran.executeSql('insert into Cars (CarName, LicenseNumber, DriverName, DescriptionOrder) values ("Audi", "9873 KLQ", "Oscar", "I want the products in a big baggs please")');

		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Sugar", 1, 3)');
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Milk", 12, 3)');
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Orange juice", 5, 3)');

		tran.executeSql('insert into Cars (CarName, LicenseNumber, DriverName, DescriptionOrder) values ("Volkswagen", "4456 PHT", "Markus", "I need ")');

		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Eggs", 1, 4)');
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Corn Flakes", 1, 4)');
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Bananas", 4, 4)');
		
	})
}