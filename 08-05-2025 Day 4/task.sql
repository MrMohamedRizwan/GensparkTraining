select * from sys.tables;

select * from Orders;
select * from [Order Details];
select * from Products;
--1)
select c.CompanyName, concat(e.Firstname,' ', e.LastName) as EmployeeName,* from orders o join Customers c on
c.CustomerID=o.CustomerID join Employees e on e.EmployeeID=o.EmployeeID;

--2)
select c.CategoryName,s.CompanyName, * from products p join Categories c on c.CategoryID=p.CategoryID
join Suppliers s on p.SupplierID=s.SupplierID;

--3)
select * ,p.ProductName, od.Quantity, od.UnitPrice from Orders o join [Order Details] od on o.OrderID=od.OrderID
join Products p on od.ProductID=p.ProductID

--4)
--select * from Employees;
select concat(e.LastName, ' ' , e.FirstName) as EmployeeName , concat(r.LastName, ' ' , r.FirstName) as reportingTo
from Employees e join Employees r on r.ReportsTo=e.EmployeeID;

--5)
select c.CompanyName, count(o.OrderID) as Total_Count from Customers c join Orders o on o.CustomerID=c.CustomerID group by c.CompanyName;

--6)
select CategoryName,avg(UnitPrice) as Average from Categories c join Products p on p.CategoryID=c.CategoryID group by CategoryName;

--7)
select CompanyName from Customers where ContactTitle Like '%Owner%';

--8)
select * from Products order by UnitPrice desc 
offset 0 rows fetch next 5 rows only;

--9)
select OrderID, sum(Quantity*UnitPrice) as salesAmount from [Order Details] group by OrderID;

--10)
create or alter proc AllOrdersOfCustomer(@customerId nvarchar(10))
as
begin
	select * from Orders where CustomerID=@customerId;
end

exec AllOrdersOfCustomer 'VINET'


--11)
select * from Products;

create or alter proc AddNewproduct (@ProductName nvarchar(50),
    @SupplierID int,
    @CategoryID int,
    @QuantityPerUnit nvarchar(50),
    @UnitPrice decimal(10, 2),
    @UnitsInStock int,
    @UnitsOnOrder int,
    @ReorderLevel int,
    @Discontinued bit
	)
	as
	begin
	insert into Products (ProductName, SupplierID, CategoryID, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued)
        values (@ProductName, @SupplierID, @CategoryID, @QuantityPerUnit, @UnitPrice, @UnitsInStock, @UnitsOnOrder, @ReorderLevel, @Discontinued);

	end

	EXEC AddNewProduct 
    @ProductName = 'Chocolate Cookies', 
    @SupplierID = 10, 
    @CategoryID = 4, 
    @QuantityPerUnit = '12 - 100 g packs', 
    @UnitPrice = 8.50, 
    @UnitsInStock = 100, 
    @UnitsOnOrder = 20, 
    @ReorderLevel = 15, 
    @Discontinued = 0;

	select * from products;


--12)
--select * from [Order Details];
--select* from Orders
--select * from Employees

create proc GetTotalSalesPerEmployee
as
begin
select  e.EmployeeID, concat(e.FirstName, ' ',e.LastName) as EmployeeName,sum(od.UnitPrice*od.Quantity*(1-od.Discount)) as TotalSales
from Orders o join Employees e on e.EmployeeID=o.EmployeeID join [Order Details] od on od.OrderID=o.OrderID group by e.EmployeeID,e.FirstName,e.LastName;
end

exec GetTotalSalesPerEmployee

--13)
--select * from Products;

with ProductRank as (
	select ProductID,ProductName,CategoryID,UnitPrice,
	RANK() over (partition by CategoryID order by UnitPrice desc) as RankByPrice
	from Products
)
select * from ProductRank order by RankByPrice,CategoryID;

--14)
with CaculateTotalRevenue as (
	select p.ProductID, p.ProductName,sum(o.UnitPrice*o.Quantity) as TotalRevenue
	from Products p join [Order Details] o on o.ProductID=p.ProductID
	group by p.ProductID,p.ProductName
)
select * from CaculateTotalRevenue where TotalRevenue>10000

--15)
with EmployeeHierarchy as (
    select
        EmployeeID,FirstName,LastName,Title,ReportsTo,
        cast(FirstName + ' ' + LastName as nvarchar(100)) as EmployeePath,
        0 as level from Employees where ReportsTo IS NULL
    union all
    select
        e.EmployeeID, e.FirstName, e.LastName, e.Title, e.ReportsTo,
        cast(eh.EmployeePath + ' -> ' + e.FirstName + ' ' + e.LastName as nvarchar(100)) as EmployeePath,
        eh.Level + 1 as Level
    from Employees e
    Join EmployeeHierarchy eh on e.ReportsTo = eh.EmployeeID
)

select Level, EmployeeID, FirstName, LastName, Title, EmployeePath from EmployeeHierarchy
order by Level, EmployeeID;
