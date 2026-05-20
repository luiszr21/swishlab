#!/usr/bin/env pwsh

<#
.SYNOPSIS
    Gerenciar Docker Compose de Produção do SwishLab

.DESCRIPTION
    Script para facilitar o gerenciamento de containers em produção usando portas 3020-3029

.PARAMETER Command
    Comando a executar: up, down, restart, logs, ps, build

.EXAMPLE
    .\docker-prod.ps1 up
    .\docker-prod.ps1 logs
#>

param(
    [Parameter(Position=0)]
    [ValidateSet('up', 'down', 'restart', 'logs', 'ps', 'build')]
    [string]$Command
)

$env:COMPOSE_FILE = "docker-compose.prod.yml"
$env:COMPOSE_PROJECT_NAME = "swishlab-prod"

function Show-Help {
    Write-Host "`n=== SwishLab Production Docker Helper ===" -ForegroundColor Cyan
    Write-Host "`nUsage: .\docker-prod.ps1 [command]`n" -ForegroundColor Yellow
    Write-Host "Commands:" -ForegroundColor Green
    Write-Host "  up       - Start production containers (ports 3020-3022)"
    Write-Host "  down     - Stop production containers"
    Write-Host "  restart  - Restart production containers"
    Write-Host "  logs     - View production logs (follow mode)"
    Write-Host "  ps       - List production containers"
    Write-Host "  build    - Build production images`n"
    Write-Host "Port Mapping:" -ForegroundColor Green
    Write-Host "  3020 - PostgreSQL Database"
    Write-Host "  3021 - Backend API"
    Write-Host "  3022 - Frontend Web`n"
}

if ([string]::IsNullOrEmpty($Command)) {
    Show-Help
    exit 0
}

$dockerCmd = "docker-compose --env-file .env.prod"

switch ($Command) {
    'up' {
        Write-Host "`n🚀 Starting production containers..." -ForegroundColor Cyan
        Invoke-Expression "$dockerCmd up -d"
        Write-Host "`n✅ Production containers started!" -ForegroundColor Green
        Write-Host "`n📍 Services:" -ForegroundColor Yellow
        Write-Host "   Frontend:   http://localhost:3022"
        Write-Host "   Backend:    http://localhost:3021"
        Write-Host "   Database:   localhost:3020`n"
    }
    'down' {
        Write-Host "`n🛑 Stopping production containers..." -ForegroundColor Yellow
        Invoke-Expression "$dockerCmd down"
        Write-Host "`n✅ Production containers stopped!`n" -ForegroundColor Green
    }
    'restart' {
        Write-Host "`n🔄 Restarting production containers..." -ForegroundColor Cyan
        Invoke-Expression "$dockerCmd restart"
        Write-Host "`n✅ Production containers restarted!`n" -ForegroundColor Green
    }
    'logs' {
        Write-Host "`n📋 Showing production logs (Ctrl+C to exit)..." -ForegroundColor Cyan
        Invoke-Expression "$dockerCmd logs -f"
    }
    'ps' {
        Write-Host "`n📊 Production containers status:" -ForegroundColor Cyan
        Invoke-Expression "$dockerCmd ps"
    }
    'build' {
        Write-Host "`n🏗️ Building production images..." -ForegroundColor Cyan
        Invoke-Expression "$dockerCmd build --no-cache"
        Write-Host "`n✅ Production images built!`n" -ForegroundColor Green
    }
}
