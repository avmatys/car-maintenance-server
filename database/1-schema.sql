--  Create a new schema in the db
CREATE SCHEMA IF NOT EXISTS car_data AUTHORIZATION car_user;
GRANT ALL ON SCHEMA car_data TO car_user;

-- Create tables
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


