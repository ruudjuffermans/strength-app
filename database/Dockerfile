ARG POSTGRES_VERSION=16
FROM postgres:${POSTGRES_VERSION}

COPY ./schema/* /docker-entrypoint-initdb.d/
RUN chmod 644 /docker-entrypoint-initdb.d/*