CREATE EXTENSION IF NOT EXISTS "postgis";

CREATE DATABASE "trail-track-r" TEMPLATE postgres;

CREATE ROLE flyway WITH
	LOGIN
	NOSUPERUSER
	CREATEDB
	NOCREATEROLE
	PASSWORD 'myPassword#3';
GRANT ALL ON DATABASE "trail-track-r" TO flyway WITH GRANT OPTION;

CREATE ROLE "trail-svc" WITH
	LOGIN
	NOSUPERUSER
	NOCREATEDB
	NOCREATEROLE
	PASSWORD 'myPassword#4';
GRANT CONNECT ON DATABASE "trail-track-r" TO "trail-svc";
