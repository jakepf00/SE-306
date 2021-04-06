
INSERT INTO ConcessionsInventory (SKU, ItemName, Cost, Quantity, Location)
values
	(1000000001, 'Water', 1.50, 80, 'Cooler 1'),
	(1000000002, 'Mtn Dew', 3.00, 75, 'Cooler 2'),
	(1000000003, 'Frito Lays Original', 2.00, 200, 'Dry Storage'),
	(1000000004, 'Pepsi', 3.00, 80, 'Cooler 2'),
	(1000000005, 'Coca Cola', 3.00, 70, 'Cooler 1'),
	(1000000006, 'Fruit Punch Gatorade', 2.00, 50, 'Cooler 1'),
	(1000000007, 'Hot Dog', 1.50, 100, 'Freezer 1'),
	(1000000008, 'Vanilla Ice Cream', 4.00, 250, 'Freezer 1'),
	(1000000009, 'Chocolate Ice Cream', 4.00, 250, 'Freezer 1'),
	(1000000010, 'Nacho Cheese', 0, 500, 'Freezer 1');

INSERT INTO CustomerInfo (Customer_ID, fName, lName, Address, Age, PostalCode, Email, eventType, City, State)
values
	(1, 'John', 'Doe', '123 3rd St N', 35, 57007, 'JohnDoe@email.com', 2, 'Brookings', 'SD'),
	(2, 'Jane', 'Meyers', '100 Minnesota Ave SW', 24, 57104, 'MeywrsJ@email.com', 2, 'Siuox Falls', 'SD'),
	(3, 'Tyler', 'Corrow', '812 Onaka Trail', 21, 56006, 'tyler.corrow@gmail.com', 1, 'Brookings', 'SD'),
	(4, 'Maxwell', 'Fire', '6142 8th St S', 18, 56258, 'fireman18@outlook.com', 3, 'Marshall', 'MN'),
	(5, 'Parker', 'Greyhound', '101 12 Ave NW', 45, 57006, 'Greyhound@gmail.com', 1, 'Brookings', 'SD');

INSERT INTO EmployeeInfo (Employee_ID, fName, lName, Address, Age, PostalCode, Email, SSN, pay_rate, department, City, State)
values
	(1, 'Roberto', 'Marquez', '909 7th St E', 41, 57006, 'RobMarquez@gmail.com', 75359831, 25, 'General Manager', 'Brookings', 'SD'),
	(2, 'Karen', 'Smith', '547 23 Ave SW', 21, 57104, 'Karen.Smith@yahoo.com', 909034642, 13, 'Concessions Worker', 'Sioux Falls', 'SD'),
	(3, 'Kenny', 'Roberts', '303 13St S', 31, 57006, 'RobertsKenny@outlook.com', 790714615, 19 ,'Equipment Manager', 'Brookings', 'SD'),
	(4, 'James', 'Brown', '564 2nd St W', 22, 56374, 'JBrown@gmail.com', 652254215, 12, 'Front Desk', 'Saint Joseph', 'MN'),
	(5, 'Marcia', 'Robin', '4895 Hill St NE', 34, 57007, 'MarciaRobin@hotmail,com', 123456789,  19,'Concessions Manager', 'Brookings', 'SD');

INSERT INTO Equipment (Eq_ID, Name, Location, Quantity)
values
	(0001, 'Baseball Bat', 'Batting Cage Storage', 20),
	(0002, 'Large Soccer Net', 'Field Storage', 8),
	(0003, 'Small Soccer Net', 'Field Storage', 10),
	(0004, 'Softball Bat', 'Batting Cage Storage', 20),
	(0005, 'Hurdles', 'Field Storage', 24),
	(0006, 'Baseball', 'Batting Cage Storage', 250),
	(0007, 'Softball', 'Batting Cage Storage', 250),
	(0008, 'Soccer Ball', 'Field Storage', 25),
	(0009, 'Football', 'Field Storage' , 15),
	(0010, 'Batting Helmet', 'Batting Cage Storage', 20);

SELECT * FROM CustomerInfo;
SELECT * FROM Equipment;
SELECT * FROM EmployeeInfo;
SELECT * FROM ConcessionsInventory;
