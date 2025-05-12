

CREATE TABLE Accounts(ID INT PRIMARY KEY, balance INT);

INSERT INTO Accounts
VALUES
(1, 1000),(2,2000);

select * from accounts;

--1)In a transaction, if I perform multiple updates and an error happens in the third statement, but I have not used SAVEPOINT, what will happen if I issue a ROLLBACK? Will my first two updates persist?
	begin transaction ;
	update accounts set balance=balace-100 where id=1;
	update accounts set balance=balace+100 where id=2;
	update account set balance=balace-100 where id=3;
	
	rollback;
	
	/*in a transaction if savepoint is not used and if rollback is been executed it goes back to the previous state before the transaction begun
	hence the first two updates does not presist if error occurs in third state and rollback executes
	*/

--2)suppose Transaction A updates Alice’s balance but does not commit. Can Transaction B read the new balance if the isolation level is set to READ COMMITTED?
	select * from accounts;
	begin transaction;
	update accounts set balance = balance -50 where id=1;
	
	--in different session 
	set transaction isolation level read committed;
	select balance from accounts where id =1;
	select * from accounts;
	
	--No transaction b cannot read the new balance if the isolation level is set to READ COMMITTED in PostgreSQL.


/*
--3)
What will happen if two concurrent transactions both execute:
UPDATE tbl_bank_accounts SET balance = balance - 100 WHERE account_name = 'Alice';
at the same time? Will one overwrite the other?
*/
	--transaction A
	Begin
	UPDATE tbl_bank_accounts SET balance = balance - 100 WHERE account_name = 'Alice';
	
	--transaction B
	Begin
	UPDATE tbl_bank_accounts SET balance = balance - 100 WHERE account_name = 'Alice';
	
	--When two concurrent transactions execute the following statement at the same time then problems such as lost update occurs

--4)If I issue ROLLBACK TO SAVEPOINT after_alice;, will it only undo changes made after the savepoint or everything?
	
	begin transaction;
	update accounts set balance = balance - 100 where id = 1;
	savepoint after_alice;
	update accounts set balance = balance - 50 where id = 2;
	rollback to savepoint after_alice;
	commit;

	-- ROLLBACK TO SAVEPOINT after_alice is executed then the query from the start of the transaction to the savepoint gets saved even if rollback is executed


--5) Which isolation level in PostgreSQL prevents phantom reads?
	--serializable prevents phantom reads in isolation level

--6)Can Postgres perform a dirty read (reading uncommitted data from another transaction)?
	--No Postgres cannot perform a dirty read because it does not support the READ UNCOMMITTED isolation level.

--7)If autocommit is ON (default in Postgres), and I execute an UPDATE, is it safe to assume the change is immediately committed?
	--yes if autocommit is ON any UPDATE statement which is executed it is immediately committed to the database.

/*8) If I do this:

BEGIN;
UPDATE accounts SET balance = balance - 500 WHERE id = 1;
-- (No COMMIT yet)
And from another session, I run:

SELECT balance FROM accounts WHERE id = 1;
Will the second session see the deducted balance?
*/

	--No the second session will not see the deducted balance.

