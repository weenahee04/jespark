# 🚀 Deploy JESpark to Vercel - Quick Guide

## ✅ สิ่งที่เตรียมไว้แล้ว

- ✅ `vercel.json` - Configuration file
- ✅ `.vercelignore` - Ignore files
- ✅ `.gitignore` - Updated with Vercel entries
- ✅ Build scripts ใน `package.json`

## 📋 ขั้นตอนการ Deploy

### 1. ตรวจสอบ Build

```bash
npm install
npm run build
```

### 2. Push ไป GitHub

```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 3. Deploy บน Vercel

#### วิธีที่ 1: ผ่าน Dashboard (แนะนำ)

1. ไปที่ https://vercel.com
2. Sign in ด้วย GitHub
3. คลิก **"Add New Project"**
4. เลือก repository `jespark`
5. Vercel จะ detect Vite อัตโนมัติ
6. **สำคัญ:** เพิ่ม Environment Variable:
   - Key: `GEMINI_API_KEY`
   - Value: API key ของคุณ
7. คลิก **"Deploy"**

#### วิธีที่ 2: ผ่าน CLI

```bash
# ติดตั้ง Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod

# เพิ่ม Environment Variable
vercel env add GEMINI_API_KEY production
```

## 🔑 Environment Variables

**ต้องตั้งค่าใน Vercel Dashboard:**

| Variable | Value | Environment |
|----------|-------|-------------|
| `GEMINI_API_KEY` | Your Gemini API Key | Production, Preview, Development |

**วิธีตั้งค่า:**
1. Project Settings → Environment Variables
2. Add new variable
3. ใส่ `GEMINI_API_KEY` และค่า API key
4. เลือก Environments (Production, Preview, Development)
5. Save และ Redeploy

## ⚙️ Build Settings (Auto-detected)

- **Framework:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

## 🔍 Troubleshooting

### Build ล้มเหลว
- ตรวจสอบ logs ใน Vercel Dashboard
- ตรวจสอบว่า dependencies ติดตั้งครบ
- ตรวจสอบ Node.js version (ควรเป็น 18+)

### Environment Variables ไม่ทำงาน
- ตรวจสอบว่าตั้งค่าแล้ว
- **Redeploy** หลังจากเพิ่ม env vars
- ตรวจสอบว่าใช้ `process.env.GEMINI_API_KEY` ในโค้ด

### 404 เมื่อ refresh หน้า
- `vercel.json` มี rewrites rule แล้ว
- ถ้ายังมีปัญหา ให้ตรวจสอบ routing

## 📝 หมายเหตุ

- Vercel จะ auto-deploy เมื่อ push code
- Production: `main` branch
- Preview: branches อื่นๆ
- อย่าลืมตั้งค่า `GEMINI_API_KEY` ก่อน deploy!

## 🎉 เสร็จแล้ว!

หลังจาก deploy สำเร็จ คุณจะได้ URL เช่น:
- `https://jespark.vercel.app`
- หรือ custom domain ของคุณ

---

**คำแนะนำ:** ตรวจสอบ deployment logs ใน Vercel Dashboard เพื่อดูรายละเอียด

