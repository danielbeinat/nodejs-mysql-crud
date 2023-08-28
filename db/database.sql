create database if not exists companydb;

use companydb;


create table employee(
    id int(50) NOT NULL AUTO_INCREMENT,
    nombre varchar (50) default null, 
    salario int(50) default null,
    PRIMARY KEY (id)
);


describe employee;

insert into employee values
(1,"juan",1000),
(2, "marta", 2000),
(3, "leonardo",2000),
(4, "florencia", 1000);
