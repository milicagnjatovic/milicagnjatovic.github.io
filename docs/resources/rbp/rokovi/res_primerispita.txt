--1
select d.indeks, ime, prezime,
       'm' || lower(sp.oznaka) ||substr(d.indeks,3,2) || substr(d.indeks, 5) 
       || '@stud.matf.bg.ac.rs' "E-adresa"
from da.dosije d join da.STUDIJSKIPROGRAM sp 
		on d.idprograma=sp.id
where not exists (select *
	from da.UPISANKURS uk join da.PREDMETPROGRAMA op
		on op.idpredmeta = uk.idpredmeta
		and op.idprograma=d.idprograma and vrsta='obavezan'
	where uk.indeks = d.indeks
		
		and not exists( select * 
		               from da.ispit
			           where indeks =d.indeks and ocena >=8 and status = 'o' 
                       and idpredmeta = uk.idpredmeta )
		)
and not exists (select *
	            from da.ispit
	            where indeks = d.indeks and ocena = 5 and status = 'o' and
	                   datpolaganja > current_date - 6 year)@
--2
with prolaznost as (
select ir.naziv naziv_roka, p.id,
       p.naziv naziv_predmeta, count(i.indeks) brPrijavili,
       sum(case when status='o' and ocena> 5 then 1 else 0 end) brPolozili,
       sum(case when status='x' and ocena> 5 then 1 else 0 end) brPonistili
from da.ispitnirok ir left outer join da.ispit i
       on ir.skgodina=i.skgodina and ir.oznakaroka=i.oznakaroka
     left outer join da.predmet p
       on p.id=i.idpredmeta
where ir.skgodina between 2015 and 2019
group by ir.skgodina, ir.naziv, p.id, p.naziv)
select naziv_roka, naziv_predmeta, brPrijavili, brPolozili,
       case when brPrijavili>0 then brPolozili*100.0/brPrijavili else 0 end "Procenat polozenih",
       brPonistili, 
       case when brPrijavili>0 then brPonistili*100.0/brPrijavili else 0 end "Procenat ponistenih",
       case
         when brPrijavili>0 and (brPolozili+brPonistili)*100.0/brPrijavili > 80 then 'odlicna'
         when brPrijavili>0 and (brPolozili+brPonistili)*100.0/brPrijavili > 40 then 'srednja'
         else 'losa'
       end as rang
from prolaznost
order by rang@

--3
drop table upis_na_master @


create table upis_na_master (
indeks int not null,
zeljeni_smer varchar(50) not null,
ocena_za_upis double,
primary key (indeks, zeljeni_smer )
)@

create trigger unos_upis_na_master
    before insert on upis_na_master
    referencing new as n
    for each row 
    when (n.indeks not in (select indeks
                            from da.dosije d join da.STUDIJSKIPROGRAM ss
                            		on d.idprograma=ss.id
                            	 join da.NIVOKVALIFIKACIJE nk
                            	 	on nk.id=ss.idnivoa
                            	 	and lower(nk.naziv) like '%osnovne%' ))
     begin atomic
     
     	signal sqlstate '75000' ('Student nije na osnovnim studijama');
     end@
     
     
insert into upis_na_master
with aktivan_na_osnovnim as ( 
 select d.indeks, sp.naziv smer, sp.obimespb
 from da.dosije d join da.STUDIJSKIPROGRAM sp
                            		on d.idprograma=sp.id
                            	 join da.NIVOKVALIFIKACIJE nk
                            	 	on nk.id=sp.idnivoa
                            	 	and lower(nk.naziv) like '%osnovne%' 
        join da.STUDENTSKISTATUS ss
        	on ss.id=d.idstatusa and ss.studira=1
 )
      
 select ao.indeks, smer,  avg(ocena*1.0)/(select count from da.UPISGODINE where indeks=ao.indeks)
 from aktivan_na_osnovnim ao
                            	 	
       join da.ispit i 
       	on  ao.indeks=i.indeks and ocena>5 and status='o'
       join da.predmet p
       	on p.id=i.idpredmeta
  group by ao.indeks, smer, obimespb
  having obimespb - sum(p.espb) between 5 and 30@
  
  
--ili 
insert into upis_na_master
select d.indeks, sp.naziv, avg(ocena*1.0)/(select count from da.UPISGODINE where indeks=d.indeks)
 from da.dosije d join da.STUDIJSKIPROGRAM sp
                            		on d.idprograma=sp.id
                            	 join da.NIVOKVALIFIKACIJE nk
                            	 	on nk.id=sp.idnivoa
                            	 	and lower(nk.naziv) like '%osnovne%' 
                            	 	
       join da.ispit i 
       	on  d.indeks=i.indeks and ocena>5 and status='o'
       join da.predmet p
       	on p.id=i.idpredmeta
        join da.STUDENTSKISTATUS ss
        	on ss.id=d.idstatusa and ss.studira=1
  group by d.indeks, sp.naziv, sp.obimespb
  having sp.obimespb - sum(p.espb) between 5 and 30@
  
--iz dodatka
merge into upis_na_master unm
using (
select d.indeks, sp.naziv smer,
       avg(ocena*1.0)/(select count from da.UPISGODINE where indeks=d.indeks) uspeh
 from da.dosije d join da.STUDIJSKIPROGRAM sp
                            		on d.idprograma=sp.id
                            	 join da.NIVOKVALIFIKACIJE nk
                            	 	on nk.id=sp.idnivoa
                            	 	and lower(nk.naziv) like '%osnovne%' 
                            	 	
       join da.ispit i 
       	on  d.indeks=i.indeks and ocena>5 and status='o'
       join da.predmet p
       	on p.id=i.idpredmeta
        join da.STUDENTSKISTATUS ss
        	on ss.id=d.idstatusa 
  where ss.naziv='Diplomirao' and 
  year(datdiplomiranja)=2019
  group by d.indeks, sp.naziv, ss.naziv ) as t
on unm.indeks=t.indeks  and unm.zeljeni_smer=t.smer
when matched then
	update 
	set ocena_za_upis=uspeh
when not matched then
	insert
	values (t.indeks, t.smer, t.uspeh)@
	
	
drop table upis_na_master@  


-- 4

--ra 
--((( (predmet where espb>5)[idpredmeta] join ispit )[oznakaroka, skgodina, idpredmeta, indeks ]
--divideby 
--dosije [indeks]) 
--join ispitnirok) [naziv]

--rr
--range of px is predmet
--range of dx is dosije
--range of irx is ispitnirok
--range of ix is ispit
--irx.naziv
--where exists px ( px.espb=5 
--                  and forall dx ( 
--                      exists ix (ix.indeks=dx.indeks and ix.idpredmeta=px.idpredmeta 
--                                and ix.oznakaroka=irx.oznakaroka and ix.skgodina=irx.skgodina))







  
  
  

       	
       	                      	 	
                            	 	
                            	 
