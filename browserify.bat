@echo off

cd .\app\script\loader
call browserify title-view-controller-loader.js -o title-view-controller-loader.mix.js
call browserify game-view-controller-loader.js -o game-view-controller-loader.mix.js

pause
