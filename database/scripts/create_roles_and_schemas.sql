CREATE ROLE app_superuser
WITH LOGIN
SUPERUSER
CREATEDB
CREATEROLE
INHERIT
NOREPLICATION
PASSWORD 'superpassword';

CREATE SCHEMA strength_app AUTHORIZATION app_superuser;
CREATE SCHEMA learn_app AUTHORIZATION app_superuser;

CREATE ROLE strength_app_admin
WITH LOGIN
NOCREATEDB
NOCREATEROLE
NOINHERIT
PASSWORD 'adminpassword';

CREATE ROLE learn_app_admin
WITH LOGIN
NOCREATEDB
NOCREATEROLE
NOINHERIT
PASSWORD 'adminpassword';

CREATE ROLE strength_app_user
WITH LOGIN
NOCREATEDB
NOCREATEROLE
NOINHERIT
PASSWORD 'userpassword';

CREATE ROLE learn_app_user
WITH LOGIN
NOCREATEDB
NOCREATEROLE
NOINHERIT
PASSWORD 'userpassword';

GRANT USAGE, CREATE ON SCHEMA strength_app TO strength_app_admin;
GRANT USAGE, CREATE ON SCHEMA learn_app TO learn_app_admin;

GRANT USAGE ON SCHEMA strength_app TO strength_app_user;
GRANT USAGE ON SCHEMA learn_app TO learn_app_user;

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA strength_app TO strength_app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA learn_app TO learn_app_user;

ALTER DEFAULT PRIVILEGES FOR ROLE strength_app_admin IN SCHEMA strength_app
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO strength_app_user;
ALTER DEFAULT PRIVILEGES FOR ROLE learn_app_admin IN SCHEMA learn_app
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO learn_app_user;

ALTER DEFAULT PRIVILEGES FOR ROLE strength_app_admin IN SCHEMA strength_app
GRANT USAGE, SELECT, UPDATE ON SEQUENCES TO strength_app_user;
ALTER DEFAULT PRIVILEGES FOR ROLE learn_app_admin IN SCHEMA learn_app
GRANT USAGE, SELECT, UPDATE ON SEQUENCES TO learn_app_user;

ALTER ROLE strength_app_admin SET search_path = strength_app;
ALTER ROLE strength_app_user SET search_path = strength_app;

ALTER ROLE learn_app_admin SET search_path = learn_app;
ALTER ROLE learn_app_user SET search_path = learn_app;

GRANT USAGE, SELECT, UPDATE ON ALL SEQUENCES IN SCHEMA strength_app TO strength_app_user;
GRANT USAGE, SELECT, UPDATE ON ALL SEQUENCES IN SCHEMA learn_app TO learn_app_user;