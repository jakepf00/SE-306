CREATE TABLE ConcessionsInventory (
	SKU		int,
	ItemName	varchar(255),
	Cost		float,
	Quantity	int,
	Location	varchar(255),
	PRIMARY KEY (SKU)
	);

CREATE TABLE Equipment (
	Eq_ID		int,
	Name		varchar(255),
	Location	varchar(255),
	Quantity	int,
	PRIMARY KEY (Eq_ID)
	);

CREATE TABLE Event_Type (
	id			int,
	EventType	varchar(10) NOT NULL UNIQUE,
	PRIMARY		KEY (ID)
	);

INSERT INTO Event_Type (id, EventType)
values
	(1, 'Tournament'),
	(2, 'Personal'),
	(3, 'Other');

CREATE TABLE CustomerInfo (
	Customer_ID	int,
	fName		varchar(255),
	lName		varchar(255),
	Address		varchar(255),
	Age		int,
	PostalCode	int,
	Email		varchar(255),
	eventType	int not null default 1,
	City 		varchar(255),
	State 		varchar(2),
	constraint fk_event_type foreign key (eventType) REFERENCES Event_Type (id),
	PRIMARY KEY (Customer_ID)
	);

CREATE TABLE EmployeeInfo (
	Employee_ID int,
	fName		varchar(255),
	lName		varchar(255),
	Address		varchar(255),
	Age		int,
	PostalCode	int,
	Email		varchar(255),
	SSN		int,
	pay_rate	float,
	department	varchar(255),
	City 		varchar(255),
	State 		varchar(2),
	PRIMARY KEY (Employee_ID)
	);
