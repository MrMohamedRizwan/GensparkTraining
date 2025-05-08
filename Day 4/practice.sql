use pubs
go
select * from sys.tables;

create proc proc_filterProducts(@pcpu varchar(20), @pcount int out)
as
begin
	 set @pcount =( select count(*) from Products where 
  try_cast(JSON_VALUE(details,'$.spec.cpu') as nvarchar(20) )=@pcpu)
end

begin
declare @cnt int
exec proc_filterProducts 'i5', @cnt out
print(@cnt)
end



--inbuilt stored procedures
sp_help authors


--bulk upload from csv file 
create table people
(id int primary key,
name nvarchar(20),
age int)

create or alter proc proc_BulkInsert(@filepath nvarchar(500))
as
begin
   declare @insertQuery nvarchar(max)

   set @insertQuery = 'BULK INSERT people from '''+ @filepath +'''
   with(
   FIRSTROW =2,
   FIELDTERMINATOR='','',
   ROWTERMINATOR = ''\n'')'
   exec sp_executesql @insertQuery
end

proc_BulkInsert 'C:\Users\vc\OneDrive - Presidio Network Solutions\Documents\Presidio Training\SQL Training\Book1.csv'

select * from people

-- Log Table
create table BulkInsertLog
(LogId int identity(1,1) primary key,
FilePath nvarchar(1000),
status nvarchar(50) constraint chk_status Check(status in('Success','Failed')),
Message nvarchar(1000),
InsertedOn DateTime default GetDate())


create or alter proc proc_BulkInsert(@filepath nvarchar(500))
as
begin
  Begin try
	   declare @insertQuery nvarchar(max)

	   set @insertQuery = 'BULK INSERT people from '''+ @filepath +'''
	   with(
	   FIRSTROW =2,
	   FIELDTERMINATOR='','',
	   ROWTERMINATOR = ''\n'')'

	   exec sp_executesql @insertQuery

	   insert into BulkInsertLog(filepath,status,message)
	   values(@filepath,'Success','Bulk insert completed')
  end try
  begin catch
		 insert into BulkInsertLog(filepath,status,message)
		 values(@filepath,'Failed',Error_Message())
  END Catch
end

proc_BulkInsert 'C:\Users\vc\OneDrive - Presidio Network Solutions\Documents\Presidio Training\SQL Training\Book1.csv'

select * from BulkInsertLog
select * from people
truncate table people


--CTE
with cteAuthors 
as
(select * from authors)

select * from cteAuthors


declare @page int=1, @pageSize int =20;
with PaginatedBooks as
( select  title_id,title, price, ROW_Number() over (order by price desc) as RowNum
  from titles
)

select * from PaginatedBooks where RowNum between((@page-1)*(@pageSize+1)) and(@page*@pageSize)


--stored procedure for the above
create proc ToPrintBooks(@page int,@pageSize int)
as
begin
with PaginatedBooks as(
 select  title_id,title, price, ROW_Number() over (order by price desc) as RowNum
  from titles)
  select * from PaginatedBooks where RowNum between((@page-1)*(@pageSize+1)) and(@page*@pageSize)
end

exec ToPrintBooks 2,5;


--using offset instead of rownumber 
select  title_id,title, price from titles order by price desc
offset 10 rows fetch next 5 rows only


--function

--scalar value function
create or alter function fn_calculateTax(@basePrice float, @tax float)
returns float
as
begin
	return (@baseprice + 10+(@basePrice*(@tax/100)))
end

select dbo.fn_calculateTax(1000,10)

select title,dbo.fn_calculateTax(price,12) from titles;

--table value function
create or alter function fn_table(@minprice float)
returns table 
as
	return select * from titles where price>=@minprice

select * from dbo.fn_table(10);

--previous version 
create function fn_tableSampleOld(@minprice float)
  returns @Result table(Book_Name nvarchar(100), price float)
  as
  begin
    insert into @Result select title,price from titles where price>= @minprice
    return 
end
select * from dbo.fn_tableSampleOld(10)

select * from sys.tables;
select * from people;





-- Step 1: Declare the cursor
DECLARE people_cursor CURSOR FOR 
SELECT * FROM people;

-- Step 2: Open the cursor
OPEN people_cursor;

DECLARE @id INT, @name VARCHAR(50), @age INT;
-- Step 3: Fetch the first row
FETCH NEXT FROM people_cursor INTO @id, @name, @age;
FETCH FIRST FROM PEOPLE_cursor INTO @id, @name, @age;
PRINT 'First Row: ' + @name + ', Age: ' + CAST(@age AS VARCHAR);


-- Step 4: Loop through the result set
WHILE @@FETCH_STATUS = 0
BEGIN
    PRINT 'ID: ' + CAST(@id AS VARCHAR) + ', Name: ' + @name + ', Age: ' + CAST(@age AS VARCHAR);
    FETCH NEXT FROM people_cursor INTO @id, @name, @age;
END

-- Step 5: Close the cursor
CLOSE people_cursor;

-- Step 6: Deallocate the cursor
DEALLOCATE people_cursor;

--trigger
CREATE TRIGGER reminder_people  
ON people  
AFTER INSERT, UPDATE   
AS 
BEGIN
    RAISERROR ('Notify User: Changes made to the people table', 16, 10);  
END;
GO
select * from people;
 -- Too many values
INSERT INTO people (id, name, age) 
VALUES (4, 'Charlie', 28);