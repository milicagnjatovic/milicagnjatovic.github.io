drop table IF EXISTS ispit;
drop table  IF EXISTS ispitnirok;
drop table IF EXISTS predmet;
drop table IF EXISTS dosije;

create table dosije (

       indeks           integer      not null,
       ime              varchar(25)  not null,
       prezime          varchar(25)  not null,
       datupisa      date         not null,
       mestorodjenja   varchar(100)         ,
       primary key      (indeks)
);

insert into dosije(indeks,ime,prezime,datupisa,mestorodjenja) values
(20140021, 'Milos'   , 'Peric'      , '06.07.2014',  'Beograd' ),
(20140022, 'Marijana', 'Savkovic'   , '05.07.2014',  'Kraljevo'),
(20130023, 'Sanja'   , 'Terzic'     , '04.07.2013',  'Beograd' ),
(20130024, 'Nikola'  , 'Vukovic'    , '04.07.2013',   null     ),
(20140025, 'Marijana', 'Savkovic'   , '06.07.2014',  'Kraljevo'),
(20140026, 'Zorica'  , 'Miladinovic', '06.07.2014',  'Vranje'  ),
(20130027, 'Milena'  , 'Stankovic'  , '03.09.2013',  null     );


create table predmet (
       idpredmeta     integer      not null,
       oznaka           varchar(20)  not null,
       naziv           varchar(200) not null,
       espb          smallint     not null,
       primary key(idpredmeta)
);

insert into predmet values
(1001, 'M111', 'Analiza 1', 6)                          ,
(1002, 'M112', 'Analiza 2', 6)                          ,
(1003, 'M113', 'Analiza 3', 6)                          ,
(1021, 'M131', 'Geometrija', 6)                         ,
(1101, 'M105', 'Diskretne strukture 1', 6)              ,
(1102, 'M106', 'Diskretne strukture 2', 6)              ,
(2001, 'P101', 'Programiranje 1', 8)                    ,
(2002, 'P102', 'Programiranje 2', 8)                    ,
(2003, 'P103', 'Objektno orijentisano programiranje', 6),
(2004, 'P104', 'Algoritmi i strukture podataka', 6)     ,
(3001, 'S1'  , 'Engleski jezik 1', 5)                   ,
(3002, 'S2'  , 'Engleski jezik 2', 5)                   ,
(4001, 'R101', 'Uvod u organizaciju racunara', 5)       ,
(4002, 'R102', 'Uvod u Veb i Internet tehnologije', 5)  ;

create table ispitnirok (
       skgodina     smallint     not null,
       oznakaroka     varchar(5)   not null,
       naziv           varchar(50)  not null,
       primary key (skgodina, oznakaroka)
);


insert into ispitnirok values
(2015, 'jan', 'Januar 2015')   ,
(2015, 'feb', 'Februar 2015')  ,
(2015, 'apr', 'April 2015')    ,
(2015, 'jun', 'Jun 2015')      ,
(2015, 'sep', 'Septembar 2015'),
(2015, 'okt', 'Oktobar 2015')  ;


create table ispit (
       indeks          integer      not null                        ,
       idpredmeta     integer      not null                        ,
       skgodina     smallint     not null                        ,
       oznakaroka     char(5)      not null                        ,
       ocena           smallint     not null  default 5         ,
       datpolaganja    date                                         ,
       bodovi          smallint                                     ,
       primary key (indeks, idpredmeta, skgodina, oznakaroka)  ,
       foreign key (skgodina, oznakaroka) references ispitnirok (skgodina, oznakaroka),
       foreign key (indeks)                   references dosije (indeks)     ,
       foreign key (idpredmeta)              references predmet (idpredmeta))   ;

       
insert into ispit(indeks, idpredmeta, skgodina, oznakaroka, ocena, datpolaganja, bodovi)  values 
(20140021, 1001, 2015, 'jan', 9, '20.01.2015', 81),
(20140022, 1001, 2015, 'jan', 8, '20.01.2015', 75),
(20130023, 1001, 2015, 'jan', 8, '20.01.2015', 76),
(20130024, 1001, 2015, 'jan', 10,'20.01.2015', 100),
(20140025, 1001, 2015, 'jan', 6, '20.01.2015', 55),
(20140026, 1001, 2015, 'jan', 5, '20.01.2015', 25),
(20130027, 1001, 2015, 'jan', 8, '20.01.2015', 76),


(20140021, 2001, 2015, 'jan', 10,'25.01.2015', 98),
(20140022, 2001, 2015, 'jan', 9, '25.01.2015', 86),
(20130023, 2001, 2015, 'jan', 8, '25.01.2015', 72),
(20130024, 2001, 2015, 'jan', 7, '25.01.2015', 63),
(20140025, 2001, 2015, 'jan', 5, '25.01.2015', 0),

(20140021, 3001, 2015, 'jan', 7, '27.01.2015', 67),
(20130023, 3001, 2015, 'jan', 5, '27.01.2015', 30),
(20130024, 3001, 2015, 'jan', 6, '28.01.2015', 59),
(20140026, 3001, 2015, 'jan', 6, '28.01.2015', 52),

(20140026, 1001, 2015, 'feb', 7, '10.02.2015', 68),

(20140025, 2001, 2015, 'feb', 6, '10.02.2015', 55),
(20140026, 2001, 2015, 'feb', 7, '10.02.2015', 65),

(20140021, 1021, 2015, 'apr', 7, '03.04.2015', 63),
(20130023, 1021, 2015, 'apr', 10,'03.04.2015', 95);

insert into ispit(indeks, idpredmeta, skgodina, oznakaroka, datpolaganja)  values 
(20140022, 1021, 2015, 'apr',    '03.04.2015');

insert into ispit(indeks, idpredmeta, skgodina, oznakaroka, ocena)  values 
(20130024, 1021, 2015, 'apr', 6)              ,
(20140026, 1021, 2015, 'jan', 7)              ,
(20140026, 1021, 2015, 'feb', 7)              ,
(20140026, 2001, 2015, 'jan', -7)             ,
(20140026, 1021, 2015, 'apr', 8)              ,
(20130027, 1021, 2015, 'jan', 7)              ,
(20130027, 1021, 2015, 'feb', 7)              ,
(20130027, 1021, 2015, 'apr', 8)              ;
