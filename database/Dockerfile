FROM postgres:17-alpine
COPY 1-schema.sql /docker-entrypoint-initdb.d/
COPY 2-data.sql /docker-entrypoint-initdb.d/