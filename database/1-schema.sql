--  Create a new schema in the db
CREATE SCHEMA IF NOT EXISTS car_data AUTHORIZATION car_user;
GRANT ALL ON SCHEMA car_data TO car_user;

-- Create tables

-- Table: car_data.brands

-- DROP TABLE IF EXISTS car_data.brands;

CREATE TABLE IF NOT EXISTS car_data.brands
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT id_unique PRIMARY KEY (id),
    CONSTRAINT name_unique UNIQUE (name)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS car_data.brands
    OWNER to car_user;

-- Table: car_data.models

-- DROP TABLE IF EXISTS car_data.models;

CREATE TABLE IF NOT EXISTS car_data.models
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    brand_id integer NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    start_year integer NOT NULL,
    end_year integer,
    CONSTRAINT models_pkey PRIMARY KEY (id),
    CONSTRAINT brand_model_unique UNIQUE (brand_id, name, start_year, end_year),
    CONSTRAINT brand_id_fk FOREIGN KEY (brand_id)
        REFERENCES car_data.brands (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS car_data.models
    OWNER to car_user;

-- Table: car_data.roles

-- DROP TABLE IF EXISTS car_data.roles;

CREATE TABLE IF NOT EXISTS car_data.roles
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    description character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT roles_pkey PRIMARY KEY (id),
    CONSTRAINT role_name_unique UNIQUE (name)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS car_data.roles
    OWNER to car_user;

-- Table: car_data.users

-- DROP TABLE IF EXISTS car_data.users;

CREATE TABLE IF NOT EXISTS car_data.users
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS car_data.users
    OWNER to car_user;


-- Table: car_data.web_profiles

-- DROP TABLE IF EXISTS car_data.web_profiles;

CREATE TABLE IF NOT EXISTS car_data.web_profiles
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    user_id integer NOT NULL,
    CONSTRAINT web_profiles_pkey PRIMARY KEY (id),
    CONSTRAINT email_unique UNIQUE (email),
    CONSTRAINT user_id_fk FOREIGN KEY (id)
        REFERENCES car_data.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS car_data.web_profiles
    OWNER to car_user;

-- Table: car_data.telegram_profiles

-- DROP TABLE IF EXISTS car_data.telegram_profiles;

CREATE TABLE IF NOT EXISTS car_data.telegram_profiles
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    telegram_id bigint NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT telegram_profiles_pkey PRIMARY KEY (id),
    CONSTRAINT telegram_user_id_unique UNIQUE (telegram_id),
    CONSTRAINT user_id_fk FOREIGN KEY (user_id)
        REFERENCES car_data.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS car_data.telegram_profiles
    OWNER to car_user;


-- Table: car_data.cars

-- DROP TABLE IF EXISTS car_data.cars;

CREATE TABLE IF NOT EXISTS car_data.cars
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    model_id integer NOT NULL,
    year integer NOT NULL,
    miliage integer,
    vin character varying(20) COLLATE pg_catalog."default" NOT NULL,
    license_plate character varying(40) COLLATE pg_catalog."default",
    CONSTRAINT cars_pkey PRIMARY KEY (id),
    CONSTRAINT vin_unique UNIQUE (vin),
    CONSTRAINT model_id_fk FOREIGN KEY (model_id)
        REFERENCES car_data.models (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS car_data.cars
    OWNER to car_user;


-- Table: car_data.services

-- DROP TABLE IF EXISTS car_data.services;

CREATE TABLE IF NOT EXISTS car_data.services
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    service_date date NOT NULL,
    mileage integer NOT NULL,
    location character varying(255) COLLATE pg_catalog."default",
    car_id integer NOT NULL,
    CONSTRAINT service_records_pkey PRIMARY KEY (id),
    CONSTRAINT car_id_fk FOREIGN KEY (car_id)
        REFERENCES car_data.cars (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS car_data.services
    OWNER to car_user;


-- Table: car_data.spare_parts

-- DROP TABLE IF EXISTS car_data.spare_parts;

CREATE TABLE IF NOT EXISTS car_data.spare_parts
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    service_id integer NOT NULL,
    name character varying(500) COLLATE pg_catalog."default" NOT NULL,
    "number" character varying(150) COLLATE pg_catalog."default",
    quantity integer NOT NULL DEFAULT 1,
    cost double precision NOT NULL DEFAULT 0.0,
    CONSTRAINT spare_parts_pkey PRIMARY KEY (id),
    CONSTRAINT service_record_id_fk FOREIGN KEY (service_id)
        REFERENCES car_data.services (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS car_data.spare_parts
    OWNER to car_user;


-- Table: car_data.works

-- DROP TABLE IF EXISTS car_data.works;

CREATE TABLE IF NOT EXISTS car_data.works
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    service_id integer NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    cost double precision NOT NULL DEFAULT 0.0,
    CONSTRAINT service_record_id_fk FOREIGN KEY (service_id)
        REFERENCES car_data.services (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS car_data.works
    OWNER to car_user;


-- Table: car_data.car_access

-- DROP TABLE IF EXISTS car_data.car_access;

CREATE TABLE IF NOT EXISTS car_data.car_access
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    car_id integer NOT NULL,
    user_id integer NOT NULL,
    role_id integer NOT NULL,
    CONSTRAINT user_cars_pkey PRIMARY KEY (id),
    CONSTRAINT car_user_unique UNIQUE (car_id, user_id),
    CONSTRAINT car_fk FOREIGN KEY (car_id)
        REFERENCES car_data.cars (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID,
    CONSTRAINT role_fk FOREIGN KEY (role_id)
        REFERENCES car_data.roles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE RESTRICT
        NOT VALID,
    CONSTRAINT user_fk FOREIGN KEY (user_id)
        REFERENCES car_data.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS car_data.car_access
    OWNER to car_user;