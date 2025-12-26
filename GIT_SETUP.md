# 📦 คู่มือการ Push ขึ้น GitHub

## ✅ สิ่งที่ทำแล้ว

1. ✅ Initialize git repository
2. ✅ Add ไฟล์ทั้งหมด
3. ✅ Commit ครั้งแรก

## 📋 ขั้นตอนต่อไป

### 1. สร้าง Repository บน GitHub

1. ไปที่ [github.com](https://github.com)
2. คลิก **"New repository"** หรือ **"+"** → **"New repository"**
3. ตั้งชื่อ repository: `jespark` (หรือชื่ออื่นที่ต้องการ)
4. เลือก **Public** หรือ **Private**
5. **อย่า** check "Initialize with README" (เพราะเรามีไฟล์แล้ว)
6. คลิก **"Create repository"**

### 2. เพิ่ม Remote และ Push

หลังจากสร้าง repository แล้ว ให้รันคำสั่งต่อไปนี้:

```bash
# เพิ่ม remote repository (แทนที่ YOUR_USERNAME ด้วย username ของคุณ)
git remote add origin https://github.com/YOUR_USERNAME/jespark.git

# เปลี่ยน branch เป็น main (ถ้าต้องการ)
git branch -M main

# Push ขึ้น GitHub
git push -u origin main
```

### หรือใช้ SSH (ถ้ามี SSH key setup แล้ว):

```bash
git remote add origin git@github.com:YOUR_USERNAME/jespark.git
git branch -M main
git push -u origin main
```

## 🔐 Authentication

GitHub ใช้ Personal Access Token สำหรับ HTTPS:

1. ไปที่ GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token
3. เลือก scopes: `repo` (full control)
4. Copy token
5. เมื่อ push จะถาม username และ password → ใช้ token แทน password

## 📝 คำสั่งที่ใช้บ่อย

```bash
# ดูสถานะ
git status

# เพิ่มไฟล์
git add .

# Commit
git commit -m "Your commit message"

# Push
git push

# ดู remote
git remote -v

# เปลี่ยน remote URL
git remote set-url origin NEW_URL
```

## ⚠️ หมายเหตุ

- ไฟล์ `.env` และ `node_modules` จะไม่ถูก push (อยู่ใน .gitignore)
- อย่าลืมตั้งค่า `GEMINI_API_KEY` ใน Vercel หลังจาก deploy
- ตรวจสอบว่าไฟล์ sensitive ไม่ถูก commit

---

**พร้อมแล้ว!** หลังจาก push สำเร็จ คุณสามารถ deploy บน Vercel ได้เลย

