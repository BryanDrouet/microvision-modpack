# Script pour uploader les mods vers Cloudflare R2 en utilisant curl

$accountId = "795767fa6982c64755f3"
$bucketName = "microvision-modpack"
$accessKeyId = "2267c153618d9ca577d0b82279f10446"
$secretAccessKey = "059560eab08c5ff38493bec1deaf14fb300eaed58de7d201d88222d61de6dba3"
$bucketUrl = "https://$accountId.r2.cloudflarestorage.com"

$modsPath = Get-Item -Path ".\mods"
$files = Get-ChildItem -Path $modsPath -Filter "*.jar" -File

Write-Host "🚀 Starting upload to Cloudflare R2..."
Write-Host "📂 Uploading mods from: $($modsPath.FullName)"
Write-Host "📦 Found $($files.Count) mods to upload...`n"

$successCount = 0
$failCount = 0

foreach ($file in $files) {
    $key = "mods/$($file.Name)"
    $fileSize = $file.Length
    
    # S3 Date header format
    $date = [DateTime]::UtcNow.ToString('ddd, dd MMM yyyy HH:mm:ss GMT')
    
    Write-Host "⬆️  Uploading: $($file.Name) ($fileSize bytes)..." -NoNewline
    
    try {
        # Utiliser curl avec authentification basique
        $credentialsBase64 = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes("$($accessKeyId):$($secretAccessKey)"))
        
        $curlArgs = @(
            "-X", "PUT",
            "-H", "Authorization: Basic $credentialsBase64",
            "-H", "Content-Type: application/octet-stream",
            "--data-binary", "@$($file.FullName)",
            "-k",  # Ignorer les erreurs SSL
            "--connect-timeout", "30",
            "$bucketUrl/$key"
        )
        
        $result = & curl @curlArgs 2>&1
        
        Write-Host " ✅"
        $successCount++
    }
    catch {
        Write-Host " ❌"
        Write-Host "Error: $_"
        $failCount++
    }
}

Write-Host "`n✨ Upload complete!"
Write-Host "✅ Successful: $successCount"
Write-Host "❌ Failed: $failCount"
Write-Host "📍 Base URL: $bucketUrl/mods/"
