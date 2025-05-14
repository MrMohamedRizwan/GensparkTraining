--Create a stored procedure that inserts rental data on the primary server, and verify that changes replicate to the standby server. Add a logging mechanism to track each operation.

--On Primary p 5432
/*

C:\Program Files\PostgreSQL\17\bin>psql -p 5432 -d postgres
psql (17.4)
WARNING: Console code page (437) differs from Windows code page (1252)
         8-bit characters might not work correctly. See psql reference
         page "Notes for Windows users" for details.
Type "help" for help.

postgres=# 

postgres=# SELECT * FROM pg_stat_replication;
  pid  | usesysid |  usename   | application_name | client_addr | client_hostname | client_port |          backend_start           | backend_xmin |   state   | sent_lsn  | write_lsn | flush_lsn | replay_lsn | write_lag | flush_lag | replay_lag | sync_priority | sync_state |            reply_time
-------+----------+------------+------------------+-------------+-----------------+-------------+----------------------------------+--------------+-----------+-----------+-----------+-----------+------------+-----------+-----------+------------+---------------+------------+----------------------------------
 21204 |    16384 | replicator | walreceiver      | 127.0.0.1   |                 |       53564 | 2025-05-14 14:40:49.773022+05:30 |              | streaming | 0/307F4E0 | 0/307F4E0 | 0/307F4E0 | 0/307F4E0  |           |           |            |             0 | async      | 2025-05-14 15:13:23.856889+05:30
(1 row)
*/

CREATE TABLE rental_log (
    log_id SERIAL PRIMARY KEY,
    rental_time TIMESTAMP,
    customer_id INT,
    film_id INT,
    amount NUMERIC,
    logged_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE OR REPLACE PROCEDURE sp_add_rental_log(
    p_customer_id INT,
    p_film_id INT,
    p_amount NUMERIC
)
LANGUAGE plpgsql
AS $$
BEGIN
    BEGIN
        INSERT INTO rental_log (rental_time, customer_id, film_id, amount)
        VALUES (CURRENT_TIMESTAMP, p_customer_id, p_film_id, p_amount);
        RAISE NOTICE 'Rental log added successfully for Customer ID: %, Film ID: %', p_customer_id, p_film_id;
    EXCEPTION
        WHEN OTHERS THEN
            ROLLBACK;
            RAISE NOTICE 'Error occurred: %', SQLERRM;
    END;
END;
$$;

CALL sp_add_rental_log(101, 202, 15.99);
CALL sp_add_rental_log(1, 100, 4.99);

SELECT * FROM rental_log;

CREATE TABLE rental_log_updates (
    history_id SERIAL PRIMARY KEY,log_id INT,old_rental_time TIMESTAMP,new_rental_time TIMESTAMP,old_customer_id INT,
    new_customer_id INT,old_film_id INT,new_film_id INT,old_amount NUMERIC,new_amount NUMERIC,
	updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,updated_by TEXT);


CREATE OR REPLACE FUNCTION log_rental_log_update()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO rental_log_updates (
        log_id, old_rental_time, new_rental_time, old_customer_id, new_customer_id, old_film_id, new_film_id, 
        old_amount, new_amount,updated_by
    ) 
    VALUES (
        OLD.log_id, OLD.rental_time, NEW.rental_time, OLD.customer_id, NEW.customer_id, OLD.film_id, NEW.film_id,
        OLD.amount, NEW.amount, current_user    
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER trg_log_rental_update
AFTER UPDATE ON rental_log
FOR EACH ROW
EXECUTE FUNCTION log_rental_log_update();


UPDATE rental_log SET amount = 25.00 WHERE log_id = 1;

SELECT * FROM rental_log;
SELECT * FROM rental_log_updates;


--On secondary p 5433

/*
C:\Program Files\PostgreSQL\17\bin>psql -p 5433 -d postgres
psql (17.4)

C:\Program Files\PostgreSQL\17\bin>psql -p 5433 -d postgres -c "SELECT pg_is_in_recovery();
 pg_is_in_recovery
-------------------
 t
(1 row)


postgres=# SELECT * FROM rental_log;
 log_id |        rental_time         | customer_id | film_id | amount |         logged_on
--------+----------------------------+-------------+---------+--------+----------------------------
      1 | 2025-05-14 15:06:42.511532 |         101 |     202 |  15.99 | 2025-05-14 15:06:42.511532
      2 | 2025-05-14 15:07:00.299392 |         101 |     202 |  15.99 | 2025-05-14 15:07:00.299392
      3 | 2025-05-14 15:11:05.9711   |         101 |     202 |  15.99 | 2025-05-14 15:11:05.9711
      4 | 2025-05-14 15:11:12.0063   |         101 |     202 |  15.99 | 2025-05-14 15:11:12.0063
      5 | 2025-05-14 15:12:05.581336 |         101 |     202 |  15.99 | 2025-05-14 15:12:05.581336
      6 | 2025-05-14 15:20:57.973144 |         101 |     202 |  15.99 | 2025-05-14 15:20:57.973144
      7 | 2025-05-14 15:22:15.369463 |           1 |     100 |   4.99 | 2025-05-14 15:22:15.369463
(7 rows)
*/