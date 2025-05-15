/* 1. Create a stored procedure to encrypt a given text
Task: Write a stored procedure sp_encrypt_text that takes a plain text input (e.g., email or mobile number) and returns an encrypted version using PostgreSQL's pgcrypto extension.
*/

create extension pgcrypto;

create or replace procedure sp_encrypt_text(in input_text text,in key text, out encrypted_text text)
language plpgsql as $$

begin
	encrypted_text:= encode(pgp_sym_encrypt(input_text, key, 'compress-algo=1'),'base64');
	    -- RAISE NOTICE 'Encrypted Text: %',encrypted_text;
end;
$$;

DO $$
DECLARE
    encrypted_text TEXT;  
BEGIN
    
    CALL sp_encrypt_text('Data', 'secret_key_123', encrypted_text);
    RAISE NOTICE 'Encrypted Text: %', encrypted_text;
END $$;

create or replace function sp_encrypt_text_func( input_text text, key text)
returns bytea
language plpgsql as $$
begin
	return pgp_sym_encrypt(input_text, key, 'compress-algo=1');
	    -- RAISE NOTICE 'Encrypted Text: %',encode(pgp_sym_encrypt(input_text, key, 'compress-algo=1'),'base64');
end;
$$;

select sp_encrypt_text_func('yy@gmail.com','secret_key_123');



/*2. Create a stored procedure to compare two encrypted texts
Task: Write a procedure sp_compare_encrypted that takes two encrypted values and checks if they decrypt to the same plain text.
*/

create or replace procedure sp_compare_encrypted(encrypted_text_1 BYTEA, encrypted_text_2 BYTEA, key_value text)
language plpgsql as $$
declare 
	decrypted_text_1 text;
	decrypted_text_2 text;
begin
	begin
        
        decrypted_text_1 := pgp_sym_decrypt(encrypted_text_1, key_value);
        decrypted_text_2 := pgp_sym_decrypt(encrypted_text_2, key_value);
		raise notice 'Decrypted value %',decrypted_text_1;
  	  exception when others then
	
        RAISE NOTICE 'Decryption failed. Please check the encryption key. %',key_value;
        return;
    end;	
	if decrypted_text_1=decrypted_text_2 then 
		raise notice 'true';
	else 
		raise notice 'false';
	end if;
	
end;
$$;

/* 3. Create a stored procedure to partially mask a given text
Task: Write a procedure sp_mask_text that:
*/
CREATE OR REPLACE function sp_mask_text(input_text TEXT)
returns text
language plpgsql AS $$
declare
    masked_text TEXT;
begin
    masked_text := SUBSTRING(input_text, 1, 2) || 
                   repeat('*', GREATEST(length(input_text) - 4, 0)) || 
                   SUBSTRING(input_text, length(input_text) - 1, 2);
    raise notice 'Masked Text: %', masked_text;
	return masked_text;
end;
$$;

create or replace procedure sp_mask_text_proc(in input_text text, out masked_text text)
language plpgsql as $$
begin 
	masked_text := SUBSTRING(input_text, 1, 2) || 
                   repeat('*', GREATEST(length(input_text) - 4, 0)) || 
                   SUBSTRING(input_text, length(input_text) - 1, 2);
    RAISE NOTICE 'Masked Text: %', masked_text;
end;
$$;

do $$
declare
	masked_text text;
begin
	CALL sp_mask_text_proc('Mohamed Rizwan',masked_text);
	raise notice '%',masked_text;
end;
$$;


--To check the above 
DO $$
DECLARE
    encrypted_text BYTEA;  
BEGIN
	
	encrypted_text:= sp_encrypt_text_func('hi','secret_key_123'); --calling encryption function
    RAISE NOTICE 'Encrypted Text: %', encode(encrypted_text, 'base64');
	
	CALL sp_compare_encrypted(encrypted_text,encrypted_text,'secret_key_123');
	select sp_mask_text ('john.doe@example.com');

END $$;


/*4. Create a procedure to insert into customer with encrypted email and masked name
Task:
Call sp_encrypt_text for email

Call sp_mask_text for first_name

Insert masked and encrypted values into the customer table

Use any valid address_id and store_id to satisfy FK constraints.
*/
create or Replace Procedure insert_into_customer(email text, name text, secretkey text)
LANGUAGE plpgsql AS $$
DECLARE
	encrypted_email text;
	masked_name text;
BEGIN
	encrypted_email:=encode(sp_encrypt_text_func(email,secretkey), 'base64');
	masked_name:=sp_mask_text (name);
	raise notice 'email: %, name %',encrypted_email,masked_name;
		INSERT INTO customers (name, email, shop_id, address_id, createddate, active) 
		VALUES (masked_name,encrypted_email, 1, 1,now(),1);
end;
$$;

call insert_into_customer('rizwan','rizwan@gmail.com','secret_key_123');
call insert_into_customer('aa','aa@gmail.com','secret_key_123');
select * from customers;


/*5. Create a procedure to fetch and display masked first_name and decrypted email for all customers
Task:
Write sp_read_customer_masked() that:

Loops through all rows

Decrypts email

Displays customer_id, masked first name, and decrypted email*/

create or replace procedure proc_to_display(key_value text)
language plpgsql AS $$
declare 
	rec record;
	masked_name text;
	decrypted_email text;
begin
	for rec in select customer_id,name, email from customers
	Loop
		 begin
			decrypted_email := pgp_sym_decrypt(decode(rec.email, 'base64'), key_value);
			EXCEPTION WHEN others THEN
				decrypted_email := 'Decryption failed';
        end;
		raise notice 'ID: %, Masked Name: %, Decrypted Email: %', rec.customer_id, rec.name, decrypted_email;
	end loop;
end;
$$;
call proc_to_display('secret_key_123');
select * from customers;