----------Post Lunch----------

---cursor 

--1)
select title from film where length>120;

do $$
declare film_record RECORD;
film_cursor cursor for select title,length from film;

begin 
	open film_cursor;
	loop
	fetch next from film_cursor into film_record;
	exit when not found;
		if film_record.length>120 then 
			RAISE NOTICE 'Title: %',film_record.title;
		end if;
	end loop;
	close film_cursor;
end;
$$ language plpgsql;

--2)
SELECT * FROM rental;
select * from customer;

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
	end loop;
	close customer_cursor;
end;
$$ language plpgsql;


--3)
select * from rental;
select * from film;
select * from inventory;
do $$
declare 
	film_record RECORD;
	rental_count int;
	film_cursor CURSOR for select film_id,title,rental_rate from film;

begin
	open film_cursor;
	loop 
		fetch next from film_cursor into film_record;
		exit when not found;

		select count(*) into rental_count from rental r join inventory i on r.inventory_id=i.inventory_id where i.film_id=film_record.film_id;
		if rental_count<5 then
			update film set rental_rate=rental_rate+1 where film_id=film_record.film_id;
			Raise Notice 'Updated film ID: %, Title: %, NEW Rate: %',film_record.film_id, film_record.title, film_record.rental_rate;
		end if;

	end loop;
	close film_cursor;
end;
$$ language plpgsql;


--4);
create function get_film(category_name text)
returns setof text as $$
declare 
	film_record RECORD;
	film_cursor CURSOR for select f.title from film f join film_category fc on f.film_id=fc.film_id
	join category c on c.category_id=fc.category_id where c.name=category_name;
	begin
	open film_cursor;
	loop
		fetch film_cursor into film_record;
		exit when not found;
		return next film_record.title;
	end loop;
	close film_cursor;
	--return ;
	end;

$$ language plpgsql;

select * from get_film('Action')

--5)

select * from store;
select * from inventory;


do $$ 
declare 
	store_record RECORD;
	film_count int;
	store_cursor CURSOR for select store_id from store;

begin
    open store_cursor;
    loop 
    fetch next from store_cursor into store_record;
    exit when not found;

    select count(distinct i.film_id) into film_count from inventory i where i.store_id=store_record.store_id;
    RAISE notice 'store_id: %, film_count:%',store_record.store_id, film_count;
	end loop;
    close store_cursor;
end;
$$ language plpgsql;




--triggers 
--1)
--DROP TABLE IF EXISTS customer_log;
create table customer_log(
log_id SERIAL primary key ,
customer_id int, first_name TEXT, last_name TEXT, inserted_at TIMESTAMPTZ default now()
);

create or replace function log_new_customer()
returns trigger as $$
begin
	insert into customer_log(customer_id,first_name,last_name) values(new.customer_id,new.first_name,new.last_name);
	return new;
end;

$$ language plpgsql;

create trigger after_customer_insert
after insert on customer
for each row execute function log_new_customer();

INSERT INTO customer (customer_id, store_id, first_name, last_name, email, address_id, activebool, create_date, last_update, active) 
VALUES (1000, 1, 'John', 'Doe', 'john.doe@sakilacustomer.org', 531, true, '2025-05-09', NOW(), 1);

select * from customer_log;

--2)
select * from payment;

create trigger prevent_zero_payment
before insert on payment for each row execute function prevent_zero_payment()

create function prevent_zero_payment()
returns trigger as $$
begin
    if new.amount =0 then
        raise exception 'Zero cannot be inserted';
    end if;
    return new;
end;
$$ language plpgsql;

INSERT INTO payment (payment_id, customer_id, amount, payment_date) 
VALUES (2, 101, 0, NOW());

--3)

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

--4)


CREATE TABLE inventory_log ( log_id SERIAL PRIMARY KEY, operation_type TEXT,inventory_id INT, film_id INT, store_id INT, operation_timestamp TIMESTAMPTZ DEFAULT NOW());

create or replace function log_inventory_changes()
returns trigger as $$
begin
    if TG_OP = 'INSERT' then
        insert into inventory_log (operation_type, inventory_id, film_id, store_id)
        values ('INSERT', NEW.inventory_id, NEW.film_id, NEW.store_id);

    elseif TG_OP = 'DELETE' then
        insert into inventory_log (operation_type, inventory_id, film_id, store_id)
        values ('DELETE', OLD.inventory_id, OLD.film_id, OLD.store_id);
    end if;
    return null;
end;
$$ language plpgsql;


create or replace trigger log_inventory
after insert or delete on inventory for each row execute function log_inventory_changes();

insert into inventory (inventory_id, film_id, store_id)  values (7980, 100, 1);
select * from inventory_log;


--5)

create or replace function check_customer_balance()
returns trigger as $$
declare
	outstanding_balance DECIMAL;
	begin
		select sum(amount) into outstanding_balance
		from payment where customer_id=NEW.customer_id and payment_date>NOW() -interval '30days';
	    if outstanding_balance > 50 then
	        raise exception 'Rental not allowed: customer % has an outstanding balance of $%.2f', NEW.customer_id, outstanding_balance;
	    end if;

    return new;		
	end;
$$ language plpgsql;
	

create trigger prevent_rental 
before insert on rental for each row execute function check_customer_balance();

INSERT INTO rental (rental_id, inventory_id, customer_id, rental_date, return_date, staff_id, last_update) 
VALUES (20021, 5, 102, NOW(), NULL, 1, NOW());


select * from rental



--transactions 
--1)
begin transaction;
do $$ 
declare
    custom_id INT;
begin
    insert into customer (first_name, last_name, email, address_id, active, create_date, store_id)
    values ('akon', 'bkon', 'abc@example.com', 1, 1, NOW(), 1)
    returning  customer_id into custom_id;
    insert into rental (rental_date, inventory_id, customer_id, return_date, staff_id) values NOW(), 1, cust_id, NULL, 1);
end $$;
commit;


select * from customer;


--2)

begin transaction;
update film set rental_duration = 1 where title = 'ACADEMY DINOSAUR';
insert into inventory (film_id, store_id, last_update) values (9990, 1, NOW());
commit;
rollback

--3)
select * from inventory;

begin transaction;
do $$
declare 
	current_store_id integer;
begin
	select store_id into current_store_id from inventory
	where inventory_id=4;
	if current_store_id=1 then 
		update inventory set store_id =2 where inventory_id=4;
	elseif current_store_id =2 then 
		update inventory set store_id=1 where inventory_id=4;
	end if;
end $$;
commit;


--4)

begin;
update payment set amount = amount + 5 where payment_id = 1;
savepoint sp1;
update payment set amount = amount + 10 where payment_id = 2;
savepoint sp2;
update payment set amount = amount + 15 where payment_id = 3;
savepoint sp3;
select payment_id, amount from payment where payment_id IN (1, 2, 3);
rollback to savepoint sp2;
select payment_id, amount from payment where payment_id in (1, 2, 3);
commit;



--5)
do $$
declare v_customer_id INT := 3;
begin
    delete from public.payment
    where customer_id = v_customer_id;
    delete from public.rental
    where customer_id = v_customer_id;
    delete from public.customer
    where customer_id = v_customer_id;
end;
$$;