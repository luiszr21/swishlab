@echo off
REM Colors are not directly supported in Windows batch, using echo instead

echo.
echo SwishLab Docker Setup
echo.

REM Check if Docker is installed
docker --version >nul 2>&1
if errorlevel 1 (
    echo Docker is not installed. Please install Docker first.
    exit /b 1
)

echo Docker is installed

REM Build and start services
echo.
echo Building and starting services...
docker-compose up -d

REM Wait for services to be healthy
echo.
echo Waiting for services to be ready...
timeout /t 10 /nobreak

REM Check if services are running
docker-compose ps | findstr /c:"swishlab-backend" >nul
if errorlevel 0 (
    echo Backend is running
) else (
    echo Backend failed to start
    exit /b 1
)

docker-compose ps | findstr /c:"postgres" >nul
if errorlevel 0 (
    echo Database is running
) else (
    echo Database failed to start
    exit /b 1
)

echo.
echo All services are running!
echo.
echo Access points:
echo - Backend API: http://localhost:3000
echo - Frontend: http://localhost:8081
echo - Database: localhost:5432
echo.
echo Commands:
echo - View logs: docker-compose logs -f
echo - Stop services: docker-compose down
echo - Rebuild: docker-compose up -d --build
