create table if not exists CATEGORY(
    id int auto_increment primary key,
    name varchar(255) not null,
    req_name varchar(255) not null,
    deleted boolean not null default false
);

create table if not exists BANNER(
    id int auto_increment primary key,
    name varchar(255) not null,
    price decimal(8,2) not null,
    category_id int not null,
    content text not null,
    deleted boolean not null default false,
    foreign key (category_id) references CATEGORY (id) on delete restrict
);

create table IF NOT EXISTS REQUEST(
    id INT auto_increment primary key,
    banner_id INT not null,
    user_agent TEXT,
    ip_address VARCHAR(255),
    date DATETIME,
    foreign key (banner_id) references BANNER (id) on delete restrict
);