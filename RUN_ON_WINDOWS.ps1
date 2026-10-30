# Run from the extracted project directory in Windows PowerShell.
$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
if (!(Test-Path '.\src\main.jsx')) { throw 'Missing src/main.jsx' }
if (!(Test-Path '.\src\App.jsx')) { throw 'Missing src/App.jsx' }
if (!(Get-Command npm -ErrorAction SilentlyContinue)) { throw 'Node.js/npm is not installed or is not on PATH.' }
npm install
if ($LASTEXITCODE -ne 0) { throw 'npm install failed.' }
npm run dev
