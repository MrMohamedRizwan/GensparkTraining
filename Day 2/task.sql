create table department(
 deptname varchar(100) primary key,
 floor int not null,
 phone varchar(30) not null,
 managerid int null
);

create table employees(
 empno int primary key,
 empname varchar(100) not null,
 salary decimal(10,2) not null check (salary >= 0),
 deptname varchar(100) null,
 bossno int null,
 foreign key (deptname) references department(deptname),
 foreign key (bossno) references employees(empno)
);

insert into department (deptname, floor, phone) values
('management', 5, '34'),
('books', 1, '81'),
('clothes', 2, '24'),
('equipment', 3, '57'),
('furniture', 4, '14'),
('navigation', 1, '41'),
('recreation', 2, '29'),
('accounting', 5, '35'),
('purchasing', 5, '36'),
('personnel', 5, '37'),
('marketing', 5, '38');

insert into employees(empno, empname, salary, deptname, bossno) values
(1, 'alice', 75000, 'management', null),
(2, 'ned', 45000, 'marketing', 1),
(3, 'andrew', 5000, 'marketing', 2),
(4, 'clare', 22000, 'marketing', 2),
(5, 'todd', 38000, 'accounting', 1),
(6, 'nancy', 22000, 'accounting', 5),
(7, 'brier', 43000, 'purchasing', 1),
(8, 'sarah', 56000, 'purchasing', 7),
(9, 'soptile', 35000, 'personnel', 1),
(10, 'sanjay', 15000, 'navigation', 3),
(11, 'rita', 15000, 'books', 4),
(12, 'gigi', 16000, 'clothes', 4),
(13, 'maggie', 11000, 'clothes', 4),
(14, 'paul', 15000, 'equipment', 3),
(15, 'james', 15000, 'equipment', 3),
(16, 'pat', 15000, 'furniture', 3),
(17, 'mark', 15000, 'recreation', 3);

alter table department
add constraint fkdeptemp foreign key (managerid) references employees(empno);

update department set managerid = 1 where deptname = 'management';
update department set managerid = 4 where deptname in ('books', 'clothes');
update department set managerid = 3 where deptname in ('navigation', 'equipment', 'furniture', 'recreation');
update department set managerid = 5 where deptname = 'accounting';
update department set managerid = 7 where deptname = 'purchasing';
update department set managerid = 9 where deptname = 'personnel';
update department set managerid = 2 where deptname = 'marketing';

create table item(
 itemname varchar(100) primary key,
 itemtype varchar(100),
 itemcolor varchar(100)
);

create table sale(
 salesno int primary key,
 salesqty int,
 itemname varchar(100),
 deptname varchar(100),
 foreign key (itemname) references item(itemname),
 foreign key (deptname) references department(deptname)
);

insert into item (itemname, itemtype, itemcolor) values
('pocket knife-nile', 'e', 'brown'),
('pocket knife-avon', null, 'brown'),
('compass', 'n', null),
('geo positioning system', 'n', null),
('elephant polo stick', null, 'bamboo'),
('camel saddle', 'r', 'brown'),
('sextant', 'n', null),
('map measure', 'n', null),
('boots-snake proof', null, 'green'),
('pith helmet', null, 'khaki'),
('hat-polar explorer', null, 'white'),
('exploring in 10 easy lessons', null, null),
('hammock', null, 'khaki'),
('how to win foreign friends', null, 'brown'),
('safari chair', null, 'khaki'),
('safari cooking kit', 'f', 'khaki'),
('stetson', 'c', 'black');

insert into sale (salesno, salesqty, itemname, deptname) values
(101, 2, 'boots-snake proof', 'clothes'),
(102, 1, 'pith helmet', 'clothes'),
(103, 1, 'sextant', 'navigation'),
(104, 3, 'hat-polar explorer', 'clothes'),
(105, 5, 'pith helmet', 'equipment'),
(106, 2, 'pocket knife-nile', 'clothes'),
(107, 3, 'pocket knife-nile', 'recreation'),
(108, 1, 'compass', 'navigation'),
(109, 2, 'geo positioning system', 'navigation'),
(110, 1, 'map measure', 'navigation'),
(111, 1, 'geo positioning system', 'books'),
(112, 1, 'sextant', 'books'),
(113, 1, 'pocket knife-nile', 'books'),
(114, 1, 'pocket knife-nile', 'navigation');
