/*
Locking Mechanism
PostgreSQL automatically applies locks, but you can control them manually when needed.

Types of Locks

MVCC VS Locks
MVCC allows readers and writers to work together without blocking.
Locks are needed when multiple writers try to touch the same row or table.

Simple Rule of Locks
Readers don’t block each other.
Writers block other writers on the same row.


Row-Level Locking (Default Behavior) / Implicit Lock
Two Users updating the same row
-- Trans A
*/
BEGIN;
UPDATE products
SET price = 500
WHERE id = 1;
-- Trans A holds a lock on row id = 1

-- Trans B
BEGIN;
UPDATE products
SET price = 600
WHERE id = 1;

/*
Result:
B waits until A commits or rollbacks
Row Level Locking
*/

-- Table-Level Locks / Explicit Table Lock
1. ACCESS SHARE -- select
-- Allows reads and writes

2. ROW SHARE
-- SELECT ... FOR UPDATE -> lock the selected row for later update

BEGIN;	
LOCK TABLE products
IN ACCESS SHARE MODE;
-- Allows other SELECTS, even INSERT/DELETE at the same time.

BEGIN;
LOCK TABLE products
IN ROW SHARE MODE;
-- SELECT .. FOR UPDATE, reads are allowed, conflicting row locks are blocked, writes allowed

3. EXCLUSIVE
-- Blocks writes (INSERT, UPDATE, DELETE) but allows reads (SELECT)

BEGIN;
LOCK TABLE products
IN EXCLUSIVE MODE;

4. ACCESS EXCLUSIVE  -- Most agressive lock 
-- Blocks everything, Used by ALTER TABLE, DROP TABLE, TRUNCATE, 
-- Internally used by DDL.


-- A
BEGIN;
LOCK TABLE products IN ACCESS EXCLUSIVE MODE;
-- Table is now fully locked!

-- B
SLEECT * FROM products;
-- B will wait until A commits or rollbacks.

-- Explicit Row Locks --> SELECT ... FOR UPDATE
-- A
BEGIN;
SELECT * FROM products
WHERE id = 1
FOR UPDATE;
-- Row id = 1 is now locked

-- B
BEGIN;
UPDATE products
SET price = 700
WHERE id = 1;
-- B is blocked until A finishes.

-- SELECT ... FOR UPDATE locks the row early so no one can change it midway.
-- Banking, Ticket Booking, Inventory Management Systems
/*
A deadlock happens when:
Transaction A waits for B
Transaction B waits for A
They both wait forever.

-- Trans A
*/
BEGIN;
UPDATE products
SET price = 500
WHERE id = 1;
-- A locks row 1

-- Trans B
BEGIN;
UPDATE products
SET price = 600
WHERE id = 2;
-- B locks row 2

-- Trans A
UPDATE products
SET price = 500
WHERE id = 2;
-- A locks row 2 (already locked by B)

-- Trans B
UPDATE products
SET price = 600
WHERE id = 1
--B locks row 1 (already locked by A)

/*
psql detects a deadlock
ERROR: deadlock detected
It automatically aborts a transaction to resolve deadlock.
*/

-- Advisory Lock / Custom Locks
-- Get a lock with ID 12345
SELECT pg_advisory_lock(12345);

-- critical ops

-- Releas the lock
SELECT pg_advisory_unlock(12345);






--row level lock
select * from products;
begin;
update products set price=500 where id =1;

begin;
update products set price=600
where id=1;

--table level lock
1. Access share 
--allows read and write 

begin;
lock table products
in access share mode;


2. Row share 
begin;
lock table products
in row share mode;

3. Exclusive
begin;
lock table products
in exclusive mode;


4. access exclusive

begin;
lock table products
in access exclusive mode;

--trans A
begin;
update products set price =500 where id =1;--locks row 1

--trans B
begin;
update products set price=600 where id =2; --locks row 2

--trans A
update products set proce=500 where id=2; -- tries to locks row 2(already locked by trans B)

--trans B-0
update products set price =600 where id -1;--tries to locks row 1(already locked by trans A)
/*the above transactions leads to deadlock 
 it automatically aborts a transaction to resolve deadlock
*/








--advisry lock

--to lock
select pg_advisory_lock()
--to unlock
select pg_advisory_lock(12345);


---triggers

create table audit_log
(audit_id serial primary key,
table_name text,
field_name text,
old_value text,
new_value text,
updated_date Timestamp default current_Timestamp)

create or replace function Update_Audit_log()
returns trigger 
as $$
begin
	Insert into audit_log(table_name,field_name,old_value,new_value,updated_date) 
	values('customer','email',OLD.email,NEW.email,current_Timestamp);
	return new;
end;
$$ language plpgsql


create trigger trg_log_customer_email_Change
before update
on customer
for each row
execute function Update_Audit_log();

drop trigger trg_log_customer_email_Change on customer
drop table audit_log;
select * from customer order by customer_id

select * from audit_log
update customer set email = 'mary.smith@sakilacustomer.org' where customer_id = 1








create trigger trg_log_customer_email_Change
before update
on customer
for each row
execute function Update_Audit_log();

drop trigger trg_log_customer_email_Change on customer
drop table audit_log;
select * from customer order by customer_id

select * from audit_log
update customer set email = 'mary.smiths@sakilacustomer.org' where customer_id = 1


create or replace function Update_Audit_log()
returns trigger 
as $$
declare 
   col_name text := TG_ARGV[0];
   tab_name text := TG_ARGV[1];
   o_value text;
   n_value text;
begin
    EXECUTE FORMAT('select ($1).%I::TEXT', COL_NAME) INTO O_VALUE USING OLD;
    EXECUTE FORMAT('select ($1).%I::TEXT', COL_NAME) INTO N_VALUE USING NEW;
	if o_value is distinct from n_value then
		Insert into audit_log(table_name,field_name,old_value,new_value,updated_date) 
		values(tab_name,col_name,o_value,n_value,current_Timestamp);
	end if;
	return new;
end;
$$ language plpgsql




--EXECUTE FORMAT('select ($1).%I::TEXT', COL_NAME) INTO O_VALUE USING OLD
--EXECUTE FORMAT('select ($1).%I::TEXT', COL_NAME) INTO N_VALUE USING NEW

create trigger trg_log_customer_email_Change
after update
on customer
for each row
execute function Update_Audit_log('email','customer');









