FROM postgres:latest

ENV POSTGRES_PORT=5432

EXPOSE $POSTGRES_PORT

COPY conv-schema.sql /docker-entrypoint-initdb.d/

CMD ["postgres"]