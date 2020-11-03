CREATE DATABASE airportdbms;

CREATE TABLE account
(
    username VARCHAR(20) NOT NULL PRIMARY KEY,
    password VARCHAR(20) ,
    account_balance INT
);

CREATE TABLE airlines
(
    airline_code INT NOT NULL PRIMARY KEY,
    name VARCHAR(20),
    headquarters VARCHAR(20)
);

CREATE TABLE flight
(
    airline_code INT ,
    flight_number INT NOT NULL PRIMARY KEY,
    flight_date DATE ,
    origin VARCHAR(30),
    destination VARCHAR(30),
    price INT,
    departure_time TIME,
    arrival_time TIME,
    days INT,
    seats_left INT,
    FOREIGN KEY(airline_code) REFERENCES airlines(airline_code) ON DELETE CASCADE

);

CREATE TABLE bookings
(
    booking_id INT NOT NULL PRIMARY KEY,
    flight_no INT,
    user_id VARCHAR(20),
    booking_time TIME,
    booking_date DATE,
    transaction_id INT,
    FOREIGN KEY(flight_no) REFERENCES flight(flight_number) ON DELETE CASCADE,
    FOREIGN KEY(user_id) REFERENCES account(username) ON DELETE CASCADE,

);

CREATE TABLE transactions
(
    transaction_id INT NOT NULL PRIMARY KEY,
    user_id VARCHAR(20),
    amount INT,
    booking_id INT,
    FOREIGN KEY(user_id) REFERENCES account(username) ON DELETE CASCADE


);

ALTER TABLE bookings ADD FOREIGN KEY(transaction_id) REFERENCES transactions(transaction_id) ON DELETE CASCADE;

ALTER TABLE transactions ADD FOREIGN KEY(booking_id) REFERENCES bookings(booking_id) ON DELETE CASCADE;

ALTER TABLE account ALTER account_balance
SET
DEFAULT 10000;


    

