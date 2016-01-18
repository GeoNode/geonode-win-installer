@echo off
echo TITLE Setup python Virtualenv

REM Install whl files in this folder
FOR %%f IN (*.whl) DO pip install "%%f"

PAUSE