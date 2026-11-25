@echo off
rem Abre o site no seu computador. Precisa do Node.js 20.9 ou mais novo (nodejs.org).
cd /d "%~dp0"
where npm >nul 2>nul || (echo Instale o Node.js em https://nodejs.org e rode de novo. & pause & exit /b 1)
if not exist .env.local copy .env.example .env.local >nul
if not exist node_modules call npm install || (pause & exit /b 1)
echo.
echo ATENCAO: este site usa o banco REAL. Reservas feitas aqui valem de verdade.
echo Abra http://localhost:3000 no navegador. Para parar, feche esta janela.
call npm run dev
pause
