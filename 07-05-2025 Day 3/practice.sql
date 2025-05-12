use pubs 
go

select name from sys.tables;
select * from publishers;
select * from titles;
select * from titleauthor;

select titles.pub_id,title  from titles join publishers
on titles.pub_id = publishers.pub_id

select au_id , title from titleauthor JOIN titles on titleauthor.title_id = titles.title_id;

select * from authors;
select * from titleauthor;
select * from titles;

select concat(a.au_fname,' ',a.au_lname), t.title from authors a join titleauthor ta on a.au_id=ta.au_id 
join titles t on ta.title_id=t.title_id;

select * from publishers
select * from sales;

select p.pub_name,t.title,s.ord_date from publishers p join titles t on p.pub_id=t.pub_id 
join sales s on s.title_id=t.title_id group by p.pub_name;

SELECT p.pub_name Publisher_Name, MIN(s.ord_date) First_Sale_Date
FROM publishers p
left outer JOIN titles t ON p.pub_id = t.pub_id
left outer JOIN sales s ON t.title_id = s.title_id
GROUP BY p.pub_name order by 2 desc;

select * from sales;
select * from stores;
select * from titles;

select s.stor_address,t.title from stores s join sales sa on sa.stor_id=s.stor_id join titles t on t.title_id=sa.title_id;


--stored procedure
create procedure proc_FirstProcedure
as 
begin
	print 'Hello World Rizwan'
end 

exec proc_FirstProcedure

create table Products
(id int identity(1,1) constraint pk_productId primary key,
name nvarchar(100) not null,
details nvarchar(max))
Go
create or alter proc proc_InsertProduct(@pname nvarchar(100),@pdetails nvarchar(max))
as
begin
	print 'sa'
    insert into Products(name,details) values(@pname,@pdetails)
end
go
proc_InsertProduct 'Laptop','{"brand":"Dell","spec":{"ram":"16GB","cpu":"i5"}}'
go
select * from Products

--specific details from json query

select JSON_QUERY(details, '$.spec') Product_Specification from products
-- update ram using stored procedure
create proc proc_UpdateProductSpec(@pid int,@newvalue varchar(20))
as
begin
   update products set details = JSON_MODIFY(details, '$.spec.ram',@newvalue) where id = @pid
end

proc_UpdateProductSpec 1, '24GB'

select id, name, JSON_VALUE(details, '$.spec.ram') Brand_Name
from Products

--bulkdata in json

  create table Posts
  (id int primary key,
  title nvarchar(100),
  user_id int,
  body nvarchar(max))
Go

  select * from Posts

  create proc proc_BulInsertPosts(@jsondata nvarchar(max))
  as
  begin
		insert into Posts(user_id,id,title,body)
	  select userId,id,title,body from openjson(@jsondata)
	  with (userId int,id int, title varchar(100), body varchar(max))
  end

  delete from Posts

  proc_BulInsertPosts '
[
  {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    "userId": 1,
    "id": 2,
    "title": "qui est esse",
    "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  }]'

  select * from products;
  select * from Products where 
  try_cast(JSON_VALUE(details,'$.spec.cpu') as nvarchar(20) )='i5'

  select from posts where user_id=1;

  create or alter proc postByUserID(@id int)
  as
  begin
	select body from posts where user_id=@id
  end
  postByUserId 1