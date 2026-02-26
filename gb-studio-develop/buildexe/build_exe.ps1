param(
  [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"

$RepoRoot = Split-Path -Parent $PSScriptRoot
$OutputDir = Join-Path $PSScriptRoot "output"

New-Item -ItemType Directory -Force -Path $OutputDir | Out-Null

# Keep temporary/cache data off a full C: drive.
$env:TEMP = "D:\Temp"
$env:TMP = "D:\Temp"
$env:LOCALAPPDATA = "D:\LocalAppData"
$env:PATH = "$RepoRoot;$env:PATH"

New-Item -ItemType Directory -Force -Path $env:TEMP, (Join-Path $env:LOCALAPPDATA "Yarn\Berry\cache") | Out-Null

Set-Location $RepoRoot

if (-not $SkipBuild) {
  npm run package
  if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed. Fix compile errors, then rerun buildexe/build_exe.ps1."
    exit $LASTEXITCODE
  }
}
$copied = @()

# Also include the packaged portable app directory (contains gb-studio.exe + runtime files).
$packagedAppDir = Join-Path $RepoRoot "out\GB Studio-win32-x64"
if (Test-Path $packagedAppDir) {
  $packagedOutputDir = Join-Path $OutputDir "GB Studio-win32-x64"
  if (Test-Path $packagedOutputDir) {
    Remove-Item -Path $packagedOutputDir -Recurse -Force
  }
  Copy-Item -Path $packagedAppDir -Destination $packagedOutputDir -Recurse -Force
  $copied += (Join-Path $packagedOutputDir "gb-studio.exe")

  $zipPath = Join-Path $OutputDir "GB Studio-win32-x64-portable.zip"
  if (Test-Path $zipPath) {
    Remove-Item -Path $zipPath -Force
  }
  Compress-Archive -Path (Join-Path $packagedOutputDir "*") -DestinationPath $zipPath -CompressionLevel Optimal
  $copied += $zipPath
}

if ($copied.Count -eq 0) {
  Write-Host "No build artifacts found. Run without -SkipBuild after a successful package/make."
  exit 1
}

Write-Host "Copied artifacts to: $OutputDir"
Get-ChildItem -Path $OutputDir -File | Select-Object Name, Length, LastWriteTime
