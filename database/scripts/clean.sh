sudo -u postgres psql -c "DROP SCHEMA public CASCADE;"
sudo -u postgres psql -c "DROP SCHEMA learn_app CASCADE;"
sudo -u postgres psql -c "DROP SCHEMA strength_app CASCADE;"

sudo -u postgres psql -c "DROP ROLE IF EXISTS app_superuser;"
sudo -u postgres psql -c "DROP ROLE IF EXISTS strength_app_admin;"
sudo -u postgres psql -c "DROP ROLE IF EXISTS learn_app_admin;"
sudo -u postgres psql -c "DROP ROLE IF EXISTS strength_app_user;"
sudo -u postgres psql -c "DROP ROLE IF EXISTS learn_app_user;"