$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'Initialize-Node.ps1')
$pnpmCommand = Get-Command pnpm.cmd -ErrorAction SilentlyContinue
$npmCommand = Get-Command npm.cmd -ErrorAction SilentlyContinue
$bundledPnpm = Join-Path $env:USERPROFILE '.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback/pnpm.cmd'
if ($pnpmCommand) { $packageManager = $pnpmCommand.Source }
elseif ($npmCommand) { $packageManager = $npmCommand.Source }
elseif (Test-Path $bundledPnpm) { $packageManager = $bundledPnpm }
else { throw 'Install Node.js 22.12+ and npm or pnpm first.' }
Push-Location (Join-Path $PSScriptRoot 'frontend')
try {
    if (!(Test-Path 'node_modules')) { & $packageManager install; if ($LASTEXITCODE) { throw 'Dependency installation failed.' } }
    & $packageManager run build
    if ($LASTEXITCODE) { throw 'Frontend build failed.' }
} finally { Pop-Location }
Write-Host 'Built successfully. Deploy frontend/dist to your static host.'
