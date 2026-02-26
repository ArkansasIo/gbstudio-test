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

# Detect the most recently packaged Windows app directory and keep naming dynamic.
$packagedAppDir = Get-ChildItem -Path (Join-Path $RepoRoot "out") -Directory -Filter "*-win32-x64" |
  Sort-Object LastWriteTime -Descending |
  Select-Object -First 1

if ($packagedAppDir) {
  $packagedName = $packagedAppDir.Name
  $packagedOutputDir = Join-Path $OutputDir $packagedName
  if (Test-Path $packagedOutputDir) {
    Remove-Item -Path $packagedOutputDir -Recurse -Force
  }

  Copy-Item -Path $packagedAppDir.FullName -Destination $packagedOutputDir -Recurse -Force

  # Prefer the exe matching the package folder name; otherwise fallback to first app exe.
  $appBaseName = ($packagedName -replace "-win32-x64$", "")
  $preferredExe = Join-Path $packagedOutputDir "$appBaseName.exe"
  if (Test-Path $preferredExe) {
    $copied += $preferredExe
  } else {
    $fallbackExe = Get-ChildItem -Path $packagedOutputDir -Filter "*.exe" -File |
      Where-Object { $_.Name -ne "crashpad_handler.exe" } |
      Select-Object -First 1
    if ($fallbackExe) {
      $copied += $fallbackExe.FullName
    }
  }

  $zipPath = Join-Path $OutputDir "$packagedName-portable.zip"
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
