param(
    [string]$CommitMessage = "Update storefront code"
)

$envFile = Join-Path $PSScriptRoot ".env"
$token = $env:GITHUB_TOKEN
$owner = $env:GITHUB_USER
$repo = "utt-market"

if (-not $token) {
    $token = [System.Environment]::GetEnvironmentVariable('GITHUB_TOKEN', 'User')
}
if (-not $owner) {
    $owner = [System.Environment]::GetEnvironmentVariable('GITHUB_USER', 'User')
}

if (Test-Path $envFile) {
    Get-Content $envFile | ForEach-Object {
        $line = $_.Trim()
        if ($line -and -not $line.StartsWith("#")) {
            $parts = $line.Split('=', 2)
            if ($parts.Length -eq 2) {
                $key = $parts[0].Trim()
                $val = $parts[1].Trim()
                if ($key -eq "GITHUB_TOKEN" -and -not $token) { $token = $val }
                if ($key -eq "GITHUB_USER" -and -not $owner) { $owner = $val }
                if ($key -eq "GITHUB_REPO") { $repo = $val }
            }
        }
    }
}

if (-not $token) {
    Write-Host "ERROR: GITHUB_TOKEN not found." -ForegroundColor Red
    exit 1
}

$headers = @{
    "Authorization" = "token $token"
    "User-Agent"    = "UTT-Market-Sync"
    "Accept"        = "application/vnd.github.v3+json"
}

# Lấy toàn bộ các file trong thư mục dự án (loại trừ .git, .env và file tạm)
$files = Get-ChildItem -Path $PSScriptRoot -Recurse -File | 
    Where-Object { 
        $rel = $_.FullName.Substring($PSScriptRoot.Length).TrimStart('\', '/')
        -not ($rel.StartsWith(".git") -or $rel -eq ".env" -or $rel.EndsWith(".env") -or $rel -eq "github.config.json")
    } | 
    ForEach-Object {
        $_.FullName.Substring($PSScriptRoot.Length).TrimStart('\', '/').Replace('\', '/')
    }


function Get-GitBlobSha($bytes) {
    $header = [System.Text.Encoding]::ASCII.GetBytes("blob $($bytes.Length)`0")
    $all = New-Object byte[] ($header.Length + $bytes.Length)
    [System.Buffer]::BlockCopy($header, 0, $all, 0, $header.Length)
    [System.Buffer]::BlockCopy($bytes, 0, $all, $header.Length, $bytes.Length)
    $sha1 = [System.Security.Cryptography.SHA1]::Create()
    $hash = $sha1.ComputeHash($all)
    return -join ($hash | ForEach-Object { "{0:x2}" -f $_ })
}

Write-Host "Syncing files to https://github.com/$owner/$repo..."

foreach ($relPath in $files) {
    $fullPath = Join-Path $PSScriptRoot ($relPath.Replace('/', [System.IO.Path]::DirectorySeparatorChar))
    if (-not (Test-Path $fullPath)) { continue }

    $bytes = [System.IO.File]::ReadAllBytes($fullPath)
    $localSha = Get-GitBlobSha $bytes

    $remoteSha = $null
    try {
        $checkUri = "https://api.github.com/repos/$owner/$repo/contents/$relPath"
        $checkRes = Invoke-RestMethod -Uri $checkUri -Headers $headers -Method Get
        $remoteSha = $checkRes.sha
    } catch {}

    if ($remoteSha -and $remoteSha -eq $localSha) {
        Write-Host "Already up to date: $relPath" -ForegroundColor DarkGray
        continue
    }

    $b64Content = [System.Convert]::ToBase64String($bytes)
    $msg = $CommitMessage + ": " + $relPath
    $putBody = @{
        message = $msg
        content = $b64Content
    }
    if ($remoteSha) {
        $putBody["sha"] = $remoteSha
    }

    $jsonBody = $putBody | ConvertTo-Json
    try {
        $uploadUri = "https://api.github.com/repos/$owner/$repo/contents/$relPath"
        $null = Invoke-RestMethod -Uri $uploadUri -Headers $headers -Method Put -Body $jsonBody -ContentType "application/json; charset=utf-8"
        Write-Host "Uploaded: $relPath" -ForegroundColor Green
    } catch {
        Write-Host "Notice for $relPath : $($_.Exception.Message)" -ForegroundColor Yellow
    }
}

Write-Host "All changes synced successfully to https://github.com/$owner/$repo"
