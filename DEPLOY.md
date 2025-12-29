# 🚀 คู่มือการ Deploy JESpark บน Vercel

## ขั้นตอนการ Deploy

### วิธีที่ 1: Deploy ผ่าน Vercel Dashboard (แนะนำ)

1. **เตรียมโปรเจกต์**
   ```bash
   # ตรวจสอบว่าทุกอย่างทำงานได้
   npm install
   npm run build
   ```

2. **Push โค้ดขึ้น GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

3. **Deploy บน Vercel**
   - ไปที่ [vercel.com](https://vercel.com)
   - Sign in ด้วย GitHub account
   - คลิก "Add New Project"
   - เลือก repository `jespark`
   - Vercel จะ detect Vite project อัตโนมัติ
   - **สำคัญ:** เพิ่ม Environment Variable:
     - `GEMINI_API_KEY` = API key ของคุณ
   - คลิก "Deploy"

### วิธีที่ 2: Deploy ผ่าน Vercel CLI

1. **ติดตั้ง Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   # Deploy to production
   vercel --prod
   
   # หรือ deploy to preview
   vercel
   ```

4. **ตั้งค่า Environment Variables**
   ```bash
   vercel env add GEMINI_API_KEY
   # ใส่ API key ของคุณ
   ```

## ⚙️ Environment Variables

ต้องตั้งค่า Environment Variable ต่อไปนี้ใน Vercel Dashboard:

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API Key | ✅ Yes |

**วิธีตั้งค่า:**
1. ไปที่ Project Settings → Environment Variables
2. เพิ่ม `GEMINI_API_KEY`
3. เลือก Environment (Production, Preview, Development)
4. ใส่ค่า API key
5. Redeploy project

## 📝 Build Settings

Vercel จะ detect Vite project อัตโนมัติ แต่ถ้าต้องการตั้งค่าเอง:

- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

## 🔍 Troubleshooting

### ปัญหา: Build ล้มเหลว

**แก้ไข:**
- ตรวจสอบว่า `package.json` มี build script
- ตรวจสอบว่า dependencies ติดตั้งครบ
- ดู build logs ใน Vercel dashboard

### ปัญหา: Environment Variables ไม่ทำงาน

**แก้ไข:**
- ตรวจสอบว่าตั้งค่า Environment Variables แล้ว
- Redeploy project หลังจากเพิ่ม env vars
- ตรวจสอบว่าใช้ `process.env.GEMINI_API_KEY` ในโค้ด

### ปัญหา: 404 Error เมื่อ refresh หน้า

**แก้ไข:**
- ไฟล์ `vercel.json` มี rewrites rule แล้ว
- ถ้ายังมีปัญหา ให้ตรวจสอบ routing configuration

## 📦 ไฟล์ที่สำคัญ

- `vercel.json` - Vercel configuration
- `.vercelignore` - ไฟล์ที่ต้อง ignore
- `vite.config.ts` - Vite build configuration
- `package.json` - Dependencies และ scripts

## 🌐 Custom Domain

1. ไปที่ Project Settings → Domains
2. เพิ่ม domain ของคุณ
3. ตั้งค่า DNS records ตามที่ Vercel แนะนำ

## 🔄 Continuous Deployment

Vercel จะ auto-deploy เมื่อ:
- Push code ไปที่ `main` branch → Production
- Push code ไปที่ branch อื่น → Preview

## 📊 Monitoring

- ดู deployment logs ใน Vercel Dashboard
- ดู analytics และ performance
- ตั้งค่า alerts สำหรับ errors

---

**หมายเหตุ:** อย่าลืมตั้งค่า `GEMINI_API_KEY` ใน Environment Variables ก่อน deploy!



