@echo off
echo Setup python Virtualenv

call python_env.bat

pip install --no-index -I pip-9.0.1-py2.py3-none-any.whl
pip install --no-index -I virtualenv-13.1.2-py2.py3-none-any.whl

virtualenv .

call Scripts\activate.bat

pip install --no-index -I Paver-1.2.4-py2.py3-none-any.whl

pip install -r requirements.txt
pip install . --upgrade

rem paver setup

paver sync

python manage.py collectstatic
