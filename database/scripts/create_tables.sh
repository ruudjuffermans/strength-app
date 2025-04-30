psql -U strength_app_admin -h localhost -d postgres -f ../schema/0.1-enums.sql
psql -U strength_app_admin -h localhost -d postgres -f ../schema/0.2-users.sql
psql -U strength_app_admin -h localhost -d postgres -f ../schema/0.3-main.sql
psql -U strength_app_admin -h localhost -d postgres -f ../schema/0.4-views-functions.sql