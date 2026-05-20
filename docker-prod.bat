@echo off
REM Script para gerenciar o Docker Compose de Produção

setlocal enabledelayedexpansion

if "%1"=="" (
    echo.
    echo Usage: docker-prod.bat [command]
    echo.
    echo Commands:
    echo   up       - Start production containers (ports 3020-3022)
    echo   down     - Stop production containers
    echo   restart  - Restart production containers
    echo   logs     - View production logs
    echo   ps       - List production containers
    echo   build    - Build production images
    echo.
    exit /b 1
)

if "%1"=="up" (
    docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d
    echo.
    echo Production containers started!
    echo.
    echo Services:
    echo   Frontend:   http://localhost:3022
    echo   Backend:    http://localhost:3021
    echo   Database:   localhost:3020
    echo.
    exit /b 0
)

if "%1"=="down" (
    docker-compose -f docker-compose.prod.yml down
    exit /b 0
)

if "%1"=="restart" (
    docker-compose -f docker-compose.prod.yml restart
    exit /b 0
)

if "%1"=="logs" (
    docker-compose -f docker-compose.prod.yml logs -f
    exit /b 0
)

if "%1"=="ps" (
    docker-compose -f docker-compose.prod.yml ps
    exit /b 0
)

if "%1"=="build" (
    docker-compose -f docker-compose.prod.yml build --no-cache
    exit /b 0
)

echo Unknown command: %1
exit /b 1
