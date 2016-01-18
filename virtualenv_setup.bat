@echo off
echo TITLE Setup python Virtualenv

call python_env.bat

pip install --no-index -I virtualenv-13.1.2-py2.py3-none-any.whl

virtualenv .

call Scripts\activate.bat

rem Prioritize Python dependencies
pip install Paver-1.2.1-py2-none-any.whl
pip install Unidecode-0.4.18-py2-none-any.whl
pip install anyjson-0.3.3-py2-none-any.whl
pip install simplejson-3.8.1-cp27-none-win32.whl
pip install pytz-2015.7-py2.py3-none-any.whl
pip install httplib2-0.8-py2-none-any.whl
pip install geolinks-0.0.1-py2-none-any.whl
pip install Pillow-3.0.0-cp27-none-win32.whl
pip install lxml-3.4.4-cp27-none-win32.whl
pip install billiard-3.3.0.22-cp27-none-win32.whl
pip install amqp-1.4.8-py2.py3-none-any.whl
pip install six-1.10.0-py2.py3-none-any.whl
pip install kombu-3.0.32-py2.py3-none-any.whl
pip install pep8-1.6.2-py2.py3-none-any.whl
pip install pyflakes-1.0.0-py2.py3-none-any.whl
pip install flake8-2.3.0-py2.py3-none-any.whl
pip install py2exe-0.6.10a1-cp27-none-win32.whl
pip install mccabe-0.3.1-py2.py3-none-any.whl
pip install regex-2015.11.22-cp27-none-win32.whl
pip install requests-2.9.1-py2.py3-none-any.whl
pip install celery-3.1.19-py2.py3-none-any.whl
pip install setuptools-19.2-py2.py3-none-any.whl
pip install python_dateutil-2.4.2-py2.py3-none-any.whl
pip install nose-1.3.7-py2-none-any.whl
pip install gisdata-0.5.4-py2-none-any.whl
pip install pyproj-1.9.5-cp27-none-win32.whl
pip install Django-1.9.1-py2.py3-none-any.whl
pip install Django-1.6.11-py2.py3-none-any.whl

FOR %%F IN (*whl) DO pip install -I "%%F"
FOR %%F IN (*tar.gz) DO pip install -I "%%F"

pip install Django-1.9.1-py2.py3-none-any.whl
pip install Django-1.6.11-py2.py3-none-any.whl
pip install .

paver sync
python manage.py collectstatic

