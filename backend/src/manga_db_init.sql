create table if not exists Users (
    client_id   char(19), 
    username    varchar(20),
    primary key (client_id),
    check (client_id regexp '^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$')
);
