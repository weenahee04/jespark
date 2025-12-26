# 🚀 Quick Start - Push ขึ้น GitHub

## ✅ สิ่งที่ทำแล้ว

- ✅ Initialize git repository
- ✅ Add ไฟล์ทั้งหมด (37 files)
- ✅ Commit ครั้งแรก

## 📋 ขั้นตอนการ Push ขึ้น GitHub

### วิธีที่ 1: ใช้ PowerShell Script (ง่ายที่สุด)

1. เปิด PowerShell ในโฟลเดอร์โปรเจกต์
2. รันคำสั่ง:
   ```powershell
   .\push-to-github.ps1
   ```
3. ใส่ GitHub Username และ Repository Name
4. Script จะ push ให้อัตโนมัติ

### วิธีที่ 2: ใช้คำสั่ง Git โดยตรง

#### 1. สร้าง Repository บน GitHub

1. ไปที่ [github.com](https://github.com)
2. คลิก **"+"** → **"New repository"**
3. ตั้งชื่อ: `jespark`
4. เลือก **Public** หรือ **Private**
5. **อย่า** check "Initialize with README"
6. คลิก **"Create repository"**

#### 2. Push ขึ้น GitHub

รันคำสั่งต่อไปนี้ (แทนที่ `YOUR_USERNAME` ด้วย username ของคุณ):

```bash
# เพิ่ม remote
git remote add origin https://github.com/YOUR_USERNAME/jespark.git

# เปลี่ยน branch เป็น main
git branch -M main

# Push
git push -u origin main
```

### วิธีที่ 3: ใช้ GitHub Desktop

1. เปิด GitHub Desktop
2. File → Add Local Repository
3. เลือกโฟลเดอร์ `jespark`
4. Publish repository
5. ตั้งชื่อและเลือก Public/Private
6. Publish

## 🔐 Authentication

GitHub ใช้ **Personal Access Token** สำหรับ HTTPS:

1. ไปที่: GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic)
3. เลือก scopes: `repo` (full control)
4. Generate และ **Copy token**
5. เมื่อ push จะถาม:
   - Username: GitHub username ของคุณ
   - Password: **ใช้ token แทน password**

## ✅ ตรวจสอบ

หลังจาก push สำเร็จ:

```bash
# ดู remote
git remote -v

# ดู branch
git branch -a
```

## 🎯 ขั้นตอนต่อไป

หลังจาก push สำเร็จ:

1. **Deploy บน Vercel:**
   - ไปที่ [vercel.com](https://vercel.com)
   - Import project จาก GitHub
   - ตั้งค่า `GEMINI_API_KEY` ใน Environment Variables
   - Deploy!

2. **หรือใช้ Vercel CLI:**
   ```bash
   npm i -g vercel
   vercel login
   vercel --prod
   ```

## 📝 คำสั่งที่ใช้บ่อย

```bash
# ดูสถานะ
git status

# เพิ่มไฟล์ใหม่
git add .

# Commit
git commit -m "Your message"

# Push
git push

# Pull (ดึงโค้ดใหม่)
git pull
```

---

**พร้อมแล้ว!** 🎉

