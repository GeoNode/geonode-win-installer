@echo off
echo TITLE Setup python Virtualenv

call python_env.bat

pip install --no-index -I virtualenv-13.1.2-py2.py3-none-any.whl

virtualenv .

call Scripts\activate.bat

rem pip install -e .

paver sync
python manage.py collectstatic

