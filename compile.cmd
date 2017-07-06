@echo off

call npm run compile

xcopy /S /E /I /Q /Y .\lib\pokemon .\build\pokemon
xcopy /S /E /I /Q /Y .\lib\util .\build\util

cd .\build\loader
call browserify title-view-controller-loader.js -o ../../app/script/title-view-controller.mix.js
call browserify game-view-controller-loader.js -o ../../app/script/game-view-controller.mix.js

pause
