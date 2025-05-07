select * from cd.facilities;

select name,membercost from cd.facilities;

select * from cd.facilities where membercost>0;

select facid,name,membercost,monthlymaintenance from cd.facilities where membercost<monthlymaintenance
/50 and membercost !=0;

select * from cd.facilities where name like '%Tennis%';

select * from cd.facilities where facid in(1,5);

select name,
case 
    when monthlymaintenance>100 then 'expensive'
    else 'cheap'
end as cost
from cd.facilities;

select memid,surname,firstname,joindate from cd.members where joindate>='2012-09-01';

select distinct(surname) from cd.members order by surname limit 10 ;

select surname from cd.members union
select name from cd.facilities;

select joindate from cd.members order by joindate desc limit 1;

select firstname,surname,joindate from cd.members order by joindate desc limit 1;

--joins
select b.starttime from cd.bookings b inner join cd.members m on b.memid=m.memid
where m.firstname='David' and surname='Farrell';

select starttime as start,name from cd.bookings b inner join cd.facilities f 
on b.facid=f.facid where name like '%Tennis Court%' and b.starttime >= '2012-09-21' and
		b.starttime < '2012-09-22' order by starttime;

select distinct r.firstname as firstname, r.surname as surname from cd.members m inner join 
cd.members r on r.memid=m.recommendedby order by surname,firstname;

select  m.firstname as memfname, m.surname as memsname,
r.firstname as recfname, r.surname as recsname
 from cd.members m left outer join 
cd.members r on r.memid=m.recommendedby order by memsname,memfname;

select distinct concat(firstname,' ',surname) as member, name as facility from cd.members m inner join cd.bookings b on m.memid=b.memid 
inner join cd.facilities f on f.facid=b.facid
where f.name in ('Tennis Court 2','Tennis Court 1')
order by member, facility          ;