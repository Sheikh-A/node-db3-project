-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.

select 
c.CategoryName,
p.ProductName

from category as c

join Product p on c.Id = p.CategoryId 

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.

select
o.id,
s.CompanyName
from [order] as o

left join Shipper s on o.shipvia = s.id

where o.orderdate < '2012-08-09';


-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.

select
p.ProductName,
count(o.id)

from product as p
left join OrderDetail o on p.id = o.productid

where o.orderid = '10251'
group by p.ProductName
order by ProductName;

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.
select 
o.id as orderId,
c.CompanyName as CompanyName,
e.lastname as EmployeeLastName

from [order] o
join Customer c on o.customerId = c.id
join Employee e on o.employeeId = e.id
order by CompanyName;