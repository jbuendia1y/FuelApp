script=$(cat scripts/create_superuser.py)
printf "$script" | python manage.py shell

echo "SUPERUSER CREATED"

load_data_script=$(cat scripts/load_data.py)
printf "$load_data_script" | python manage.py shell

echo "DATA LOADED"