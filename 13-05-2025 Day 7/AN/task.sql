--Cursors

--1)Write a cursor to list all customers and how many rentals each made. Insert these into a summary table.

select * from customer;
select * from rental;

create table rental_summary(
summary_id serial primary key,customer_id int, first_name text, last_name text, total_rentals int
)

do $$
declare 
	customer_record RECORD;
	rental_count int;
	customer_cursor cursor for 
		select customer_id,first_name,last_name from customer;


begin
	open customer_cursor;
	loop
		fetch next from customer_cursor into customer_record;
		exit when not found;

		select count(*) into rental_count from rental where customer_id=customer_record.customer_id;
		
		RAISE notice 'Customer ID: %, Name : % %, Total Rentals: %',customer_record.customer_id,customer_record.first_name,customer_record.last_name, rental_count;
		insert into rental_summary(customer_id,first_name,last_name,total_rentals) values(customer_record.customer_id,customer_record.first_name,customer_record.last_name, rental_count);
		
	
	end loop;
	close customer_cursor;
end;
$$ language plpgsql;

select * from rental_summary;


--2)Using a cursor, print the titles of films in the 'Comedy' category rented more than 10 times.

select * from film_category;
select * from category;
select *from rental

select * from inventory;

do $$
declare 
	film_title record;
	cur_comedy cursor for 
		select f.title from film f
		join film_category fc on f.film_id=fc.film_id 
		join category c on fc.category_id= c.category_id 
		join inventory i on f.film_id = i.film_id 
		join rental r on i.inventory_id=r.inventory_id 
		where c.name='Comedy' group by f.title having count(r.rental_id)>10;  

begin 
	open cur_comedy;

	loop 
		fetch cur_comedy into film_title;
		exit when not found;
		raise notice 'Film Title %',film_title.title;
	end loop;
close cur_comedy;
end;
$$ language plpgsql;


--3)Create a cursor to go through each store and count the number of distinct films available, and insert results into a report table.


select * from store;
select * from inventory;
select * from film ;

--select count(distinct  film_id) as film_count,s.store_id from inventory i join store s on i.store_id = s.store_id group by s.store_id;

CREATE TABLE  film_count_report (store_id INT,film_count INT);

do $$
declare
	store record;
	distinct_film_cur cursor for 
	select s.store_id, count(distinct  i.film_id) as film_count
	from inventory i join store s on i.store_id = s.store_id group by s.store_id;

begin
	open distinct_film_cur;
	loop 
		fetch distinct_film_cur into store;
		exit when not found;
		raise notice 'Store id %,  Film Count: %', store.store_id, store.film_count;
		
		insert into film_count_report (store_id, film_count)
        values (store.store_id, store.film_count);
	end loop;
	close distinct_film_cur;
end;
$$ language plpgsql;

	
select * from  film_count_report;


--4) Loop through all customers who haven't rented in the last 6 months and insert their details into an inactive_customers table
--select count(*) from customer c left join rental r on r.customer_id=c.customer_id where r.rental_date is null OR r.rental_date < (CURRENT_DATE - INTERVAL '6 months');;
select * from customer;
create table inactive_customer_table(customer_id int, first_name text ,last_name text);

do $$
declare
	inactive_customer record;
	customer_cur cursor for 
	select c.customer_id, c.first_name,c.last_name from customer c 
	left join rental r on r.customer_id=c.customer_id where r.rental_date is null OR r.rental_date < (CURRENT_DATE - INTERVAL '6 months');
begin
	open customer_cur; 
	
	loop
		fetch customer_cur into inactive_customer;
		exit when not found;
		raise notice 'Customer Id %, Name %',inactive_customer.customer_id,concat(inactive_customer.first_name,' ',inactive_customer.last_name);
		
		insert into inactive_customer_table(customer_id , first_name,last_name) 
		values(inactive_customer.customer_id,inactive_customer.first_name,inactive_customer.last_name);
	end loop;
	close customer_cur;
end ;
$$ language plpgsql;

select * from inactive_customer_table;

--Transaction

--1)Write a transaction that inserts a new customer, adds their rental, and logs the payment – all atomically.

do $$
declare
    cust_id int;
    rent_id int;
begin

    insert into customer (store_id,first_name, last_name, email, active, create_date,address_id)
    values (1,'john', 'doe', 'john.doe@example.com', 1, now(),1)
    returning customer_id into cust_id;

    insert into rental (rental_date,staff_id, inventory_id, customer_id, return_date)
    values (now(), 1,101, cust_id, null)
    returning rental_id into rent_id;

    insert into payment (customer_id, rental_id, amount, payment_date,staff_id)
    values (cust_id, rent_id, 9.99, now(),1);


end $$ language plpgsql;
commit;
select * from customer order by customer_id desc;


--2) Simulate a transaction where one update fails (e.g., invalid rental ID), and ensure the entire transaction rolls back.
select * from rental where rental_id=-1;
do $$
declare
    cust_id int;
begin
	
    insert into customer (store_id,first_name, last_name, email, active, create_date,address_id)
    values (1,'jane', 'doe', 'jane.doe@example.com', 1, now(),1)
    returning customer_id into cust_id;
  	
	update rentals --change of table name which dosen't exist
    set return_date = now()
    where rental_id = 1;      
 	
	 commit;
 exception when others then
    rollback;
    raise notice 'transaction failed: %', sqlerrm;
	
end $$ language plpgsql;


--3) Use SAVEPOINT to update multiple payment amounts. Roll back only one payment update using ROLLBACK TO SAVEPOIN


begin;

savepoint sp1;
update payment set amount = amount + 5 where payment_id = 101;

savepoint sp2;
update payment set amount = amount + 3 where payment_id = 102;

savepoint sp3;
update payments  --change of table name which dosen't exist
set amount = amount + 10 where payment_id = 103;  

rollback to savepoint sp3;

savepoint sp4;
update payment set amount = amount + 2 where payment_id = 103;

commit;
--4)Perform a transaction that transfers inventory from one store to another (delete + insert) safely.
do $$
declare
    source_store int := 1;
    target_store int := 2;
    inv_id int := 101;
begin

    delete from inventory
    where inventory_id = inv_id and store_id = source_store;


    insert into inventory (inventory_id, film_id, store_id, last_update)
    select inventory_id, film_id, target_store, now()
    from inventory
    where inventory_id = inv_id;

    commit;
    raise notice 'inventory % successfully transferred from store % to store %', inventory_id, source_store, target_store;

end $$ language plpgsql;

--5) Create a transaction that deletes a customer and all associated records (rental, payment), ensuring referential integrity.

do $$
declare
    customer_to_delete int := 1;
begin

    delete from payment
    using rental
    where payment.rental_id = rental.rental_id and rental.customer_id = customer_to_delete;

    delete from rental
    where customer_id = customer_to_delete;

    delete from customer
    where customer_id = customer_to_delete;

    commit;
  
end $$ language plpgsql;


--Triggers

--1) Create a trigger to prevent inserting payments of zero or negative amount.

select * from payment;

create trigger prevent_zero_payment
before insert on payment for each row execute function prevent_zero_payment()

create function prevent_zero_payment()
returns trigger as $$
begin
    if new.amount <= 0 then
        raise exception 'Zero cannot be inserted';
    end if;
    return new;
end;
$$ language plpgsql;

INSERT INTO payment (payment_id, customer_id, amount, payment_date) 
VALUES (2, 101, 0, NOW());



--2)Set up a trigger that automatically updates last_update on the film table when the title or rental rate is changed.

select * from film;

create or replace function film_last_update()
returns trigger as $$
begin
NEW.last_update := NOW();
return new;
end;
$$ language plpgsql;

create trigger film_last_update
before update on film
for each row execute function film_last_update();

UPDATE film SET title = 'New Movie Title' WHERE film_id = 1;

SELECT title, last_update FROM film WHERE film_id = 1;

--3 )Write a trigger that inserts a log into rental_log whenever a film is rented more than 3 times in a week.

create table  rental_log (log_id serial primary key,film_id int,rental_count int,log_date timestamp default now());

create or replace function log_frequent_rentals()
returns trigger as $$
declare
    rental_count int;
begin
    select count(*) into rental_count from rental r
    join inventory i on r.inventory_id = i.inventory_id
    where i.film_id = new.inventory_id and r.rental_date >= now() - interval '7 days';

    if rental_count > 3 then
        insert into rental_log (film_id, rental_count) values (new.inventory_id, rental_count);
    end if;
    return new;
end;
$$ language plpgsql;

create trigger rental_log_trigger
after insert on rental
for each row
execute function log_frequent_rentals();

select * from rental_log