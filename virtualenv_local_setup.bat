@echo off
echo Setup python Virtualenv

call python_env.bat

pip install --no-index -I virtualenv-13.1.2-py2.py3-none-any.whl

virtualenv .

call Scripts\activate.bat

pip install --no-index -I Paver-1.2.4-py2.py3-none-any.whl

paver sync

python manage.py loaddata initial_data

python manage.py collectstatic
