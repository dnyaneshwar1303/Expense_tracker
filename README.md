Tech Stack: 
FrontendL- React.js, Axios, React router dom
backend: Node.js, Express.js, MYSQL, JWT Authentication, bcrypt, dotenv
Database: MySQL

Backup setup:
- cd backend
- npm install
- npm start

Frontend setup
- cd frontend
- cd vite-project
- npm install
- npm run dev

Environment Variables:

- create a '.env' file inside backend folder:
port=4100
host=localhost
user=root
password=your_password
database=expense_tracker
secretkey=your_secret_key

Database Schema:

create database expense;
use expense;

create table user(
user_id int auto_increment primary key,
username varchar(20) not null,
fullName varchar(50) not null,
email varchar(50) not null unique,
password varchar(225) not null
);

create table expense(
expense_id int auto_increment primary key,
name varchar(20) not null,
amount decimal(10,2) not null,
date date not null,
description text,
user_id int,
foreign key(user_id) references user(user_id)
);

select * from user;
select * from expense;
