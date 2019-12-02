async function createDB() {

	myDB = openDatabase('myDDBB', '1.0', 'This is a client side database', 2 * 1024 * 1024);

	myDB.transaction(async tran => {


		tran.executeSql('DROP TABLE IF EXISTS Cars'),
		tran.executeSql('DROP TABLE IF EXISTS Products'),

		tran.executeSql('CREATE TABLE IF NOT EXISTS Cars (ID INTEGER PRIMARY KEY, CarName VARCHAR, LicenseNumber VARCHAR, DriverName VARCHAR, DescriptionOrder VARCHAR)'),
		
		tran.executeSql('CREATE TABLE IF NOT EXISTS Products (ProductName VARCHAR, NumProd INTEGER, CarID INTEGER, FOREIGN KEY (CarID) REFERENCES Cars(ID))');

//LIST OF CARS AND PRODUCTS RELATED WITH EVERY CAR:
		//CAR 1:
 		tran.executeSql('insert into Cars (CarName, LicenseNumber, DriverName, DescriptionOrder) values ("Nissan", "4561 NFH", "Daniel", "My car is big and yellow")');
		//PRODUCTS:
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Cocacola", 2, 1)');
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Meat", 1, 1)');
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Donuts", 5, 1)');

		//CAR 2
		tran.executeSql('insert into Cars (CarName, LicenseNumber, DriverName, DescriptionOrder) values ("Toyota", "9431 JKL", "Jordi", "Im in a hurry")');
		//PRODUCTS:
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Lettuce", 1, 2)');
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Tomatoes", 6, 2)');
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Potatoes", 7, 2)');

		//CAR 3
		tran.executeSql('insert into Cars (CarName, LicenseNumber, DriverName, DescriptionOrder) values ("Audi", "9873 KLQ", "Oscar", "I want the products in a big baggs please")');
		//PRODUCTS:
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Sugar", 1, 3)');
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Milk", 12, 3)');
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Orange juice", 5, 3)');
		
		//CAR 4
		tran.executeSql('insert into Cars (CarName, LicenseNumber, DriverName, DescriptionOrder) values ("Volkswagen", "4456 PHT", "Markus", " ")');
		//PRODUCTS:
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Eggs", 1, 4)');
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Corn Flakes", 1, 4)');
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Bananas", 4, 4)');
		
		//CAR 5
		tran.executeSql('insert into Cars (CarName, LicenseNumber, DriverName, DescriptionOrder) values ("Ferrari", "8937 MJL", "David", "The iPhone is a present, could you wrap it up for me, please?")');
		//PRODUCTS:
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Apple iPhone X", 1, 5)');
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Alexa Speaker", 2, 5)');
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Bose HD headphones", 1, 5)');
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Natural Orange juice", 2, 5)');

		//CAR 6
		tran.executeSql('insert into Cars (CarName, LicenseNumber, DriverName, DescriptionOrder) values ("Lamborghini", "9072 LVD", "Rafael", "Put the Ice Cream into a cool pack")');
		//PRODUCTS:
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Bottled water 6-pack", 2, 6)');
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("C-type USB", 4, 6)');
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Star Wars movie", 1, 6)');
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Strawberry Icecream", 2, 6)');
		
		//CAR 7
		tran.executeSql('insert into Cars (CarName, LicenseNumber, DriverName, DescriptionOrder) values ("Mazda", "0712 DNN", "John", " ")');
		//PRODUCTS:
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Chocolate cookies 24-Pack", 1, 7)');
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Pokemon T-Shirt", 1, 7)');
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Oil bottle", 3, 7)');
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Onion 3-Pack", 1, 7)');
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Eggs 12-pack", 1, 7)');

		//CAR 8
		tran.executeSql('insert into Cars (CarName, LicenseNumber, DriverName, DescriptionOrder) values ("Citroen", "7718 NRF", "Paula", "Be careful with the eggs!")');
		//PRODUCTS:
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Chocolate cookies 24-Pack", 1, 8)');
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Pokemon T-Shirt", 1, 8)');
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Oil bottle", 3, 8)');
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Onion 3-Pack", 1, 8)');
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Eggs 12-pack", 1, 8)');

		//CAR 9
		tran.executeSql('insert into Cars (CarName, LicenseNumber, DriverName, DescriptionOrder) values ("Citroen", "9480 PYF", "Tania", "Red wine please!")');
		//PRODUCTS:
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Rice", 1, 9)');
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Wine Bottle", 2, 9)');
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Bluetooth Keyboard", 1, 9)');
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Deodorant", 1, 9)');
		
		//CAR 10
		tran.executeSql('insert into Cars (CarName, LicenseNumber, DriverName, DescriptionOrder) values ("Opel", "9540 FGW", "Carlos", " ")');
		//PRODUCTS:
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Green Tea 12-pack", 1, 10)');
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Salad", 1, 10)');
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Carrot", 3, 10)');
		tran.executeSql('insert into Products (ProductName, NumProd, CarID) values ("Tomatoes", 6, 10)');	
	})
}