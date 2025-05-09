use DVDRental;
select * from actor;

SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
--1)
select title, length,price as rental_rate from film_list order by length desc;


--2)
select concat(c.first_name,' ',c.last_name), count(rental_id) as rcount from customer c join rental r 
on r.customer_id=c.customer_id 
group by c.first_name,c.last_name
order by rcount desc limit 5;

--3)
select * from film
select f.title,i.inventory_id,rental_id from  film f left join inventory i on f.film_id=i.film_id
left join rental r on i.inventory_id=r.inventory_id WHERE r.rental_id IS NULL;

--4)
--select * from film where title = 'Academy Dinosaur';
--select * from film_actor where film_id=1;

--select * from actor;

select a.actor_id,concat(a.first_name ,a.last_name)from actor a join film_actor fa on a.actor_id=fa.actor_id
join film f on f.film_id=fa.film_id where f.title='Academy Dinosaur'

--5)
select * from customer;

select p.customer_id,concat(c.first_name,' ',c.last_name),count(rental_id) ,sum(amount) as total 
from payment p join customer c on c.customer_id=p.customer_id
group by p.customer_id,c.first_name,c.last_name order by p.customer_id asc;


--6)
--select * from rental;
--select * from inventory;

with rental_count as(
select f.title as title,count(r.rental_id) as r_count from film f join inventory i on f.film_id=i.film_id
join rental r on i.inventory_id=r.inventory_id group by title
)
select title , r_count from rental_count order by r_count desc limit 3;

--7)
select * from rental;
with avg_rentals as (
    select avg (rental_count) as avg_rental_count
    from (
        select c.customer_id, count(r.rental_id) as rental_count
        from customer c
        join rental r on c.customer_id = r.customer_id
        group by  c.customer_id
    ) as customer_rental_counts
)
select c.customer_id, c.first_name, c.last_name, count(r.rental_id) as rental_count
from customer c
join rental r on c.customer_id = r.customer_id
group by  c.customer_id, c.first_name, c.last_name
having count(r.rental_id) > (select avg_rental_count from avg_rentals);


--8)

create or replace function get_total_rentals(customer_id int)
returns int as $$
declare
begin
return (select count(r.rental_id) as ctr from rental r where r.customer_id=get_total_rentals.customer_id);
end;
$$ language plpgsql;


select get_total_rentals(5);


--9)
create or replace procedure update_rental_rate(film_id INT, new_rate NUMERIC)
LANGUAGE plpgsql AS $$
begin
update film f set rental_rate=new_rate where f.film_id=update_rental_rate.film_id;
end;
$$;

call update_rental_rate(133,1);


--10)
create or replace procedure due()
LANGUAGE plpgsql AS $$
begin
create temp table od as 
select r.rental_id, concat(c.customer_id,' ', c.first_name), c.last_name, r.rental_date
from rental r join customer c on r.customer_id = c.customer_id
where return_date=NULL or rental_date < now() - INTERVAL '7 days' order by r.rental_date;
end;
$$;
CALL due();
select * from od
