# Resolve Node for both the package manager and child commands such as Vite.
$nodeCommand = Get-Command node.exe -ErrorAction SilentlyContinue
$bundledNode = Join-Path $env:USERPROFILE '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe'
if ($nodeCommand) { $nodeExecutable = $nodeCommand.Source }
elseif (Test-Path -LiteralPath $bundledNode) { $nodeExecutable = $bundledNode }
else { throw 'Node.js was not found. Install Node.js 22.12+ and reopen PowerShell.' }
$nodeDirectory = Split-Path -Parent $nodeExecutable
$env:PATH = $nodeDirectory + [IO.Path]::PathSeparator + $env:PATH
