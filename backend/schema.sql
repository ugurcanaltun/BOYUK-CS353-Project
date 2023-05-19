CREATE DATABASE IF NOT EXISTS pompa;
CREATE TABLE User (
	TCK BIGINT(11) CHECK (TCK >= 10000000000 AND TCK < 100000000000),
	password VARCHAR(40),
	fullname VARCHAR(255),
	address VARCHAR(255),
	birth-year INT,
	role VARCHAR(40),
	PRIMARY KEY(TCK)
);
CREATE TABLE Doctor (
	TCK INT,
	expertise-field VARCHAR(40),
	hospital-id INT,
	PRIMARY KEY(TCK),
	FOREIGN KEY(hospital_id) references Hospital,
	FOREIGN KEY(TCK) references User
);
CREATE TABLE Admin (
	admin-id INT,
	PRIMARY KEY(admin-id),
	FOREIGN KEY(admin-id) references User
);
CREATE TABLE Patient (
	TCK INT,
	expertise-field VARCHAR(40),
	hospital-id INT,
	PRIMARY KEY(TCK),
	FOREIGN KEY(hospital_id) references Hospital,
	FOREIGN KEY(TCK) references User
);
CREATE TABLE Hospital (
	hospital-id INT,
	name VARCHAR(40),
	city VARCHAR(40),
	PRIMARY KEY(hospital-id),
);
CREATE TABLE BankAccount (
	back-account-no INT,
	bank-account-password VARCHAR(40),
	active VARCHAR(40),
	PRIMARY KEY(bank-account-no),
);
CREATE TABLE Prescription (
	presc-id INT,
	date datetime(40),
	PRIMARY KEY(presc-id),
);
CREATE TABLE Prescribes (
	doctor-TCK INT,
	patient-TCK INT,
	presc-id INT,
	PRIMARY KEY(doctor-TCK, patient-TCK, presc-id),
	FOREIGN KEY(doctor-TCK, patient-TCK) references User
	FOREIGN KEY(presc-id) references Prescription
);
CREATE TABLE Illness (
	illness-name VARCHAR(40),
	type VARCHAR(40),
	PRIMARY KEY(illness-name),
);
CREATE TABLE HasIllness (
	patient-TCK INT,
	illness-name VARCHAR(40),
	PRIMARY KEY(patient-TCK, illness-name),
	FOREIGN KEY(patient-TCK) references Patient,
	FOREIGN KEY(illness-name) references Illness
);
CREATE TABLE PharmaceuticalWarehouseWorker (
	TCK INT NOT NULL,
	warehouse-id INT,
	PRIMARY KEY(TCK),
	FOREIGN KEY(TCK) references User
	FOREIGN KEY(warehouse-id) references PharmaceuticalWarehouse
);
CREATE TABLE PharmaceuticalWarehouse (
	warehouse-id INT NOT NULL,
	warehouse-name VARCHAR(40),
	warehouse-city VARCHAR(40),
	PRIMARY KEY(warehouse-id)
);
CREATE TABLE Pharmacy (
	pharmacy-id INT NOT NULL,
	pharm-name VARCHAR(255),
	pharm-city VARCHAR(40),
	PRIMARY KEY(pharmacy-id)
);
CREATE TABLE Pharmacist (
	TCK INT NOT NULL,
	pharmacy-id INT,
	PRIMARY KEY(TCK),
	FOREIGN KEY(pharmacy-id) references Pharmacy,
	FOREIGN KEY(TCK) references User
);
CREATE TABLE Drug(
	drug-id INT NOT NULL,
name VARCHAR(255) NOT NULL,
needs-prescription VARCHAR(255),
drug-class VARCHAR(255),
drug-type VARCHAR(255),
price INT,
PRIMARY KEY(drug-id)
);
CREATE TABLE Restocks (
	pharmacist-TCK INT,
	warehouse-id INT,
	drug-id INT,
	restock-date DATETIME
	PRIMARY KEY(pharmacist-TCK, warehouse-id, drug-id),
	FOREIGN KEY(pharmacist-TCK) references Pharmacist,
	FOREIGN KEY(warehouse-id) references Warehouse,
	FOREIGN KEY(drug-id) references Drug
);
CREATE TABLE HasDrug(
	drug-id INT NOT NULL,
	pharmacy-id INT NOT NULL,
	PRIMARY KEY(drug-id,pharmacy-id),
	FOREIGN KEY(drug-id) references Drug,
	FOREIGN KEY(pharmacy-id) references Pharmacy
);
CREATE TABLE SideEffect(
effect-name VARCHAR(255) NOT NULL,
	drug-id INT NOT NULL,
	INTensity INT,
PRIMARY KEY(effect-name),
FOREIGN KEY(drug-id) references Drug
);
CREATE TABLE Dosage(
	age-group VARCHAR(255) NOT NULL,
	no-per-day INT NOT NULL,
	dosage-per-use INT NOT NULL,
	PRIMARY KEY(age-group, no-per-day, dosage-per-use)
);
CREATE TABLE Orders(
	bank-account-no INT,
	patient-TCK INT,
	drug-id INT,
	order-date datetime,
	status VARCHAR(40),
	PRIMARY KEY( bank-account-no, drug-id, patient-TCK),
	FOREIGN KEY(bank-account-no) references BankAccount,
	FOREIGN KEY(patient-TCK) references Patient,
	FOREIGN KEY(drug-id) references Drug
);
CREATE TABLE Contains(
	presc-id INT,
	drug-id INT ,
	PRIMARY KEY(presc-id, drug-id),
	FOREIGN KEY(presc-id) references Prescription,
	FOREIGN KEY(drug-name) references Drug
);
CREATE TABLE HasBankAccount(
	bank-account-no INT,
	patient-TCK INT,
	PRIMARY KEY(bank-account-no, patient-TCK),
	FOREIGN KEY(bank-account-no) references BankAccount,
	FOREIGN KEY(patient-TCK) references Patient
);
CREATE TABLE HasDosage(
	drug-id INT NOT NULL,
	age-group VARCHAR(255) NOT NULL,
	no-per-day INT NOT NULL,
	dosage-per-use INT NOT NULL,
PRIMARY KEY(drug-id, age-group, no-per-day, dosage-per-use)
	FOREIGN KEY(age-group, no-per-day, dosage-per-use) references Dosage,
	FOREIGN KEY(drug-id) references Drug
);

CREATE VIEW patient-age as
SELECT TCK, TIMESTAMPDIFF (YEAR, birth_year,NOW()) AS age
FROM Patient

CREATE VIEW drug-count as
SELECT name, count(*) AS cnt
FROM Has-Drug
GROUP BY name
WHERE pharmacy-id = $pharmacy-id

CREATE VIEW patient-order AS
SELECT name, order-date, status
FROM Orders NATURAL JOIN Drug
WHERE patient-TCK = $patient-TCK

