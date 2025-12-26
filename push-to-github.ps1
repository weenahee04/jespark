# PowerShell Script สำหรับ Push ขึ้น GitHub
# ใช้คำสั่ง: .\push-to-github.ps1

Write-Host "🚀 JESpark - Push to GitHub" -ForegroundColor Green
Write-Host ""

# ตรวจสอบว่าเป็น git repository
if (-not (Test-Path .git)) {
    Write-Host "❌ ไม่พบ .git folder" -ForegroundColor Red
    exit 1
}

# ขอ GitHub username
$username = Read-Host "กรุณาใส่ GitHub Username"
if ([string]::IsNullOrWhiteSpace($username)) {
    Write-Host "❌ ต้องใส่ Username" -ForegroundColor Red
    exit 1
}

# ขอ repository name
$repoName = Read-Host "กรุณาใส่ Repository Name (default: jespark)"
if ([string]::IsNullOrWhiteSpace($repoName)) {
    $repoName = "jespark"
}

# ตรวจสอบ remote
$remoteExists = git remote | Select-String -Pattern "origin"
if ($remoteExists) {
    Write-Host "⚠️  มี remote 'origin' อยู่แล้ว" -ForegroundColor Yellow
    $overwrite = Read-Host "ต้องการเปลี่ยน URL หรือไม่? (y/n)"
    if ($overwrite -eq "y" -or $overwrite -eq "Y") {
        git remote set-url origin "https://github.com/$username/$repoName.git"
        Write-Host "✅ อัพเดท remote URL แล้ว" -ForegroundColor Green
    }
} else {
    git remote add origin "https://github.com/$username/$repoName.git"
    Write-Host "✅ เพิ่ม remote 'origin' แล้ว" -ForegroundColor Green
}

# เปลี่ยน branch เป็น main
git branch -M main
Write-Host "✅ เปลี่ยน branch เป็น 'main' แล้ว" -ForegroundColor Green

Write-Host ""
Write-Host "📤 กำลัง push ขึ้น GitHub..." -ForegroundColor Cyan
Write-Host ""

# Push
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Push สำเร็จ!" -ForegroundColor Green
    Write-Host "🌐 Repository URL: https://github.com/$username/$repoName" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📝 ขั้นตอนต่อไป:" -ForegroundColor Yellow
    Write-Host "   1. ไปที่ Vercel.com" -ForegroundColor White
    Write-Host "   2. Import project จาก GitHub" -ForegroundColor White
    Write-Host "   3. ตั้งค่า GEMINI_API_KEY ใน Environment Variables" -ForegroundColor White
    Write-Host "   4. Deploy!" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "❌ Push ล้มเหลว" -ForegroundColor Red
    Write-Host "   ตรวจสอบว่า:" -ForegroundColor Yellow
    Write-Host "   - สร้าง repository บน GitHub แล้ว" -ForegroundColor White
    Write-Host "   - มีสิทธิ์เข้าถึง repository" -ForegroundColor White
    Write-Host "   - ใช้ Personal Access Token สำหรับ authentication" -ForegroundColor White
}

