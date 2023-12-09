@echo off
cls

set /a scheduled_time=1648
set id1=
set id2=

:loop
set current_time=%time:~0,2%%time:~3,2%
if %current_time% lss 100 (
    set current_time=24%current_time%
)

echo %current_time%
echo %scheduled_time%
if !current_time! equ %scheduled_time% (
    node C:\work\DisSaruBot_js\mugen_recruitment.js %id1%
    node C:\work\DisSaruBot_js\mugen_recruitment.js %id2%
)

ping -n 60 127.0.0.1 > nul
goto loop
