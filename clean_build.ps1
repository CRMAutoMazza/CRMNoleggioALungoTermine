# clean_build.ps1
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "      AutoMazza CRM - Clean Build" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# 1. Kill Processes
Write-Host "`n[1/5] Killing processes..." -ForegroundColor Yellow
Stop-Process -Name "electron" -ErrorAction SilentlyContinue
Stop-Process -Name "node" -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# 2. Cleanup Directories
Write-Host "`n[2/5] Cleaning directories..." -ForegroundColor Yellow
Remove-Item -Path "dist" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "dist-electron" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "backend-staging" -Recurse -Force -ErrorAction SilentlyContinue
Write-Host "Cleanup complete." -ForegroundColor Green

# 3. Setup Backend Staging (Fresh Production Install)
Write-Host "`n[3/5] Setting up Backend Staging..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path "backend-staging" | Out-Null

# Copy only necessary files (exclude node_modules to avoid path issues)
Write-Host "Copying backend files..."
Copy-Item -Path "backend\package.json" -Destination "backend-staging\"
Copy-Item -Path "backend\src" -Destination "backend-staging\" -Recurse
Copy-Item -Path "backend\prisma" -Destination "backend-staging\" -Recurse
# Copy other potentially needed root files
if (Test-Path "backend\tsconfig.json") { Copy-Item "backend\tsconfig.json" "backend-staging\" }

# CRITICAL: Copy .env file for production secrets
if (Test-Path "backend\.env") {
    Write-Host "Copying .env file..."
    Copy-Item "backend\.env" "backend-staging\"
}
else {
    Write-Host "WARNING: .env file NOT FOUND in backend/!" -ForegroundColor Red
}

Write-Host "Installing ALL dependencies (for build)..."
Push-Location "backend-staging"
npm install --no-audit
if ($LASTEXITCODE -ne 0) {
    Write-Host "Backend install failed!" -ForegroundColor Red
    exit 1
}

Write-Host "Generating Prisma Client..."
npx prisma generate

Write-Host "Compiling Backend (TypeScript -> JS)..."
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Backend build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "Pruning dev dependencies..."
npm prune --production

# KEY FIX: Rename node_modules to backend_modules so electron-builder includes it
# (electron-builder ignores node_modules by default in resources)
if (Test-Path "node_modules") {
    Write-Host "Renaming node_modules to backend_modules..."
    Rename-Item -Path "node_modules" -NewName "backend_modules"
}
else {
    Write-Host "WARNING: node_modules not found!" -ForegroundColor Red
}

Pop-Location
Write-Host "Backend staging ready." -ForegroundColor Green

# 4. Build React App
Write-Host "`n[4/5] Building React Frontend..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "React build failed!" -ForegroundColor Red
    exit 1
}
Write-Host "Frontend built." -ForegroundColor Green

# 5. Build Electron Installer
Write-Host "`n[5/5] Packaging Electron Installer..." -ForegroundColor Yellow
npm run electron:dist
if ($LASTEXITCODE -ne 0) {
    Write-Host "Electron build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "`n==========================================" -ForegroundColor Cyan
Write-Host "       BUILD SUCCESSFUL!" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
