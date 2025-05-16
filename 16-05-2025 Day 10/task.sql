create table students(student_id serial primary key, 
name text, email text, phone text 
)

create table courses(
course_id serial primary key, course_name text, category text,
duration_days interval not null
);

create table trainers(trainer_id serial primary key,
trainer_name text not null, expertise text
);

create table enrollments(
enrollment_id serial primary key, student_id int not null,
course_id int not null, enrolled_date timestamp ,
foreign key(student_id) references students(student_id),
foreign key(course_id) references courses(course_id)
)

create table certifications(
certificate_id serial primary key, enrollment_id int not null,
issued_date timestamp, serial_no text unique not null
);

create table courses_trainers(courses_trainers_id serial primary key, course_id int not null, trainer_id int not null,
foreign key(course_id) references courses(course_id),
foreign key(trainer_id) references trainers(trainer_id)
)

/*
Phase 2: DDL & DML

* Create all tables with appropriate constraints (PK, FK, UNIQUE, NOT NULL)
* Insert sample data using `INSERT` statements
* Create indexes on `student_id`, `email`, and `course_id`
*/

insert into students (name, email, phone) values 
('john doe', 'john.doe@example.com', '1234567890'),
('jane smith', 'jane.smith@example.com', '0987654321'),
('mike brown', 'mike.brown@example.com', '5551234567');

insert into trainers (trainer_name, expertise) values 
('alice johnson', 'data science'),
('bob williams', 'web development');

insert into courses (course_name, category, duration_days) values 
('python for data science', 'data science', '30 days'),
('full-stack web development', 'web development', '45 days');

insert into enrollments (student_id, course_id, enrolled_date) values 
(1, 1, current_timestamp),
(2, 2, current_timestamp);

insert into certifications (enrollment_id, issued_date, serial_no) values 
(1, current_timestamp, 'CERT001'),
(2, current_timestamp, 'CERT002');

insert into courses_trainers (course_id, trainer_id) values 
(1, 1),
(2, 2);

create index idx_student_id on students(student_id);
create index idx_student_email on students(email);
create index idx_course_id on courses(course_id);

/*

Phase 3: SQL Joins Practice

Write queries to:

1. List students and the courses they enrolled in
2. Show students who received certificates with trainer names
3. Count number of students per course

*/


select * from students;
select * from courses;
select * from enrollments;

--1
select name,email,course_name from students s join enrollments e on s.student_id=e.student_id join courses c on c.course_id=e.course_id;

--2
select s.name from students s
join enrollments e on s.student_id = e.student_id
join certifications cert on e.enrollment_id = cert.enrollment_id
join courses c on e.course_id = c.course_id
join courses_trainers ct on c.course_id = ct.course_id
join trainers t on ct.trainer_id = t.trainer_id;

--3
select * from enrollments;

select course_name , count(student_id) as CountOfStudents from enrollments e left join courses c on e.course_id=c.course_id group by course_name;




/*

Phase 4: Functions & Stored Procedures

Function:

Create `get_certified_students(course_id INT)`
→ Returns a list of students who completed the given course and received certificates.

Stored Procedure:

Create `sp_enroll_student(p_student_id, p_course_id)`
→ Inserts into `enrollments` and conditionally adds a certificate if completed (simulate with status flag).

*/

create or replace function get_certified_students(course_id int)

returns table (name text, email text)
as $$
begin 
	return query select s.name, s.email from students s join enrollments e on s.student_id =e.student_id
	join certifications ct on ct.enrollment_id=e.enrollment_id where e.course_id =1;
end;
$$ language plpgsql;

select * from get_certified_students(1);


create or replace procedure sp_enroll_student(p_student_id int, p_course_id int, flag int) as $$
begin
    insert into enrollments (student_id, course_id, enrolled_date)
    values (p_student_id, p_course_id, current_timestamp);

    if flag = 1 then
        insert into certifications (enrollment_id, issued_date, serial_no)
        values (currval('enrollments_enrollment_id_seq'), current_timestamp, 'CERT' || currval('enrollments_enrollment_id_seq'));
    end if;
end;
$$ language plpgsql;

call sp_enroll_student(1,1,1)

select * from certifications;

/*
Phase 5: Cursor

Use a cursor to:

* Loop through all students in a course
* Print name and email of those who do not yet have certificates

---
*/

do $$
declare
    rec record;
begin
    for rec in select s.name, s.email from students s
    join enrollments e on s.student_id = e.student_id
    left join certifications cert on e.enrollment_id = cert.enrollment_id
    where e.course_id = 1 and cert.certificate_id is null
    loop
        raise notice 'Student: %, Email: %', rec.name, rec.email;
    end loop;
end;
$$ language plpgsql;



/*
Phase 6: Security & Roles

1. Create a `readonly_user` role:

   * Can run `SELECT` on `students`, `courses`, and `certificates`
   * Cannot `INSERT`, `UPDATE`, or `DELETE`
   

2. Create a `data_entry_user` role:

   * Can `INSERT` into `students`, `enrollments`
   * Cannot modify certificates directly

*/

 
CREATE ROLE readonly_user LOGIN PASSWORD 'root';
GRANT SELECT ON students, courses, certifications TO readonly_user;

CREATE ROLE data_entry_user LOGIN PASSWORD 'root';

GRANT USAGE, SELECT ON SEQUENCE students_student_id_seq TO data_entry_user;
GRANT INSERT ON students, enrollments TO data_entry_user;
REVOKE INSERT, UPDATE, DELETE ON certificaions FROM data_entry_user;

/*

Phase 7: Transactions & Atomicity

Write a transaction block that:

* Enrolls a student
* Issues a certificate
* Fails if certificate generation fails (rollback)

```sql
BEGIN;
-- insert into enrollments
-- insert into certificates
-- COMMIT or ROLLBACK on error
```

---
*/


do $$
begin
	insert into enrollments (student_id, course_id, enrolled_date)
	values (4, 1, current_timestamp);
	
	insert into certifications (enrollment_id, issued_date, serial_no)
	values (currval('enrollments_enrollment_id_seq'), current_timestamp, 'CERT' || currval('enrollments_enrollment_id_seq'));
	
	commit;
	exception when others then
	raise notice 'Error %',sqlerrm;
		rollback;
end;
$$;

select * from enrollments;