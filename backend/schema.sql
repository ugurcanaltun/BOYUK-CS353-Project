CREATE DATABASE IF NOT EXISTS pompa;
CREATE TABLE User (
	TCK BIGINT(11) CHECK (TCK >= 10000000000 AND TCK < 100000000000),
	password VARCHAR(40),
	fullname VARCHAR(255),
	address VARCHAR(255),
	birth_year INT,
	role VARCHAR(40),
	PRIMARY KEY(TCK)
);
CREATE TABLE Hospital (
	hospital_id INT,
	name VARCHAR(40),
	city VARCHAR(40),
	PRIMARY KEY(hospital_id),
);
CREATE TABLE Doctor (
	TCK INT,
	expertise_field VARCHAR(40),
	hospital_id INT,
	PRIMARY KEY(TCK),
	FOREIGN KEY(hospital_id) references Hospital,
	FOREIGN KEY(TCK) references User
);
CREATE TABLE Admin (
	admin_id INT,
	PRIMARY KEY(admin_id),
	FOREIGN KEY(admin_id) references User
);
CREATE TABLE Patient (
	TCK INT,
	expertise-field VARCHAR(40),
	hospital_id INT,
	PRIMARY KEY(TCK),
	FOREIGN KEY(hospital_id) references Hospital,
	FOREIGN KEY(TCK) references User
);
CREATE TABLE BankAccount (
	back_account_no INT,
	bank_account_password VARCHAR(40),
	active VARCHAR(40),
	PRIMARY KEY(bank_account_no),
);
CREATE TABLE Prescription (
	presc_id INT,
	date datetime(40),
	PRIMARY KEY(presc_id),
);
CREATE TABLE Prescribes (
	doctor_TCK INT,
	patient_TCK INT,
	presc_id INT,
	PRIMARY KEY(doctor_TCK, patient_TCK, presc_id),
	FOREIGN KEY(doctor_TCK, patient_TCK) references User
	FOREIGN KEY(presc_id) references Prescription
);
CREATE TABLE Illness (
	illness_name VARCHAR(40),
	type VARCHAR(40),
	PRIMARY KEY(illness_name),
);
CREATE TABLE HasIllness (
	patient_TCK INT,
	illness_name VARCHAR(40),
	PRIMARY KEY(patient_TCK, illness_name),
	FOREIGN KEY(patient_TCK) references Patient,
	FOREIGN KEY(illness_name) references Illness
);
CREATE TABLE PharmaceuticalWarehouse (
	warehouse_id INT NOT NULL,
	warehouse_name VARCHAR(40),
	warehouse_city VARCHAR(40),
	PRIMARY KEY(warehouse_id)
);
CREATE TABLE PharmaceuticalWarehouseWorker (
	TCK INT NOT NULL,
	warehouse_id INT,
	PRIMARY KEY(TCK),
	FOREIGN KEY(TCK) references User
	FOREIGN KEY(warehouse_id) references PharmaceuticalWarehouse
);

CREATE TABLE Pharmacy (
	pharmacy_id INT NOT NULL,
	pharm_name VARCHAR(255),
	pharm_city VARCHAR(40),
	PRIMARY KEY(pharmacy_id)
);
CREATE TABLE Pharmacist (
	TCK INT NOT NULL,
	pharmacy_id INT,
	PRIMARY KEY(TCK),
	FOREIGN KEY(pharmacy_id) references Pharmacy,
	FOREIGN KEY(TCK) references User
);
CREATE TABLE Drug(
	drug_id INT NOT NULL,
name VARCHAR(255) NOT NULL,
needs_prescription VARCHAR(255),
drug_class VARCHAR(255),
drug_type VARCHAR(255),
price INT,
PRIMARY KEY(drug_id)
);
CREATE TABLE Restocks (
	pharmacist_TCK INT,
	warehouse_id INT,
	drug_id INT,
	restock_date DATETIME
	PRIMARY KEY(pharmacist_TCK, warehouse_id, drug_id),
	FOREIGN KEY(pharmacist_TCK) references Pharmacist,
	FOREIGN KEY(warehouse_id) references Warehouse,
	FOREIGN KEY(drug_id) references Drug
);
CREATE TABLE HasDrug(
	drug_id INT NOT NULL,
	pharmacy_id INT NOT NULL,
	PRIMARY KEY(drug_id,pharmacy_id),
	FOREIGN KEY(drug_id) references Drug,
	FOREIGN KEY(pharmacy_id) references Pharmacy
);
CREATE TABLE SideEffect(
effect_name VARCHAR(255) NOT NULL,
	drug_id INT NOT NULL,
	intensity INT,
PRIMARY KEY(effect_name),
FOREIGN KEY(drug_id) references Drug
);
CREATE TABLE Dosage(
	age_group VARCHAR(255) NOT NULL,
	no_per_day INT NOT NULL,
	dosage_per_use INT NOT NULL,
	PRIMARY KEY(age_group, no_per_day, dosage_per_use)
);
CREATE TABLE Orders(
	bank_account_no INT,
	patient_TCK INT,
	drug_id INT,
	order_date datetime,
	status VARCHAR(40),
	PRIMARY KEY( bank_account_no, drug_id, patient_TCK),
	FOREIGN KEY(bank_account_no) references BankAccount,
	FOREIGN KEY(patient_TCK) references Patient,
	FOREIGN KEY(drug_id) references Drug
);
CREATE TABLE Contains(
	presc_id INT,
	drug_id INT ,
	PRIMARY KEY(presc_id, drug_id),
	FOREIGN KEY(presc_id) references Prescription,
	FOREIGN KEY(drug_name) references Drug
);
CREATE TABLE HasBankAccount(
	bank_account_no INT,
	patient_TCK INT,
	PRIMARY KEY(bank_account_no, patient_TCK),
	FOREIGN KEY(bank_account_no) references BankAccount,
	FOREIGN KEY(patient_TCK) references Patient
);
CREATE TABLE HasDosage(
	drug_id INT NOT NULL,
	age_group VARCHAR(255) NOT NULL,
	no_per_day INT NOT NULL,
	dosage_per_use INT NOT NULL,
PRIMARY KEY(drug_id, age_group, no_per_day, dosage_per_use)
	FOREIGN KEY(age_group, no_per_day, dosage_per_use) references Dosage,
	FOREIGN KEY(drug_id) references Drug
);


