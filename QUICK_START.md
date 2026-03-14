# Plant Doctor - Quick Start (2-Minute Setup)

## Get Running in 3 Commands

```bash
npm install
npm run dev
open http://localhost:3000
```

That's it! You now have a fully functional plant disease detection app.

---

## What You Get

✅ **📱 Mobile App** - Works on all devices  
✅ **📷 Camera** - Take photos of plant leaves  
✅ **📤 Upload** - Upload images from device  
✅ **🤖 AI Analysis** - Disease detection results  
✅ **📊 History** - Track all your detections  
✅ **📥 Export** - Download results as CSV  

---

## How to Use (30 seconds)

### 1. Take a Photo
- Click **"Detect"** tab
- Click **"Take Photo"**
- Point at potato plant leaf
- Click **"Capture"**

### 2. Get Results
- Wait 2-3 seconds for analysis
- See disease type and confidence
- Get treatment recommendations

### 3. Check History
- Click **"History"** tab
- View all your detections
- Export as CSV if needed

---

## What It Detects

| Disease | Signs | Severity |
|---------|-------|----------|
| **Early Blight** | Brown spots with rings | 🟡 Medium |
| **Late Blight** | Water-soaked lesions | 🔴 High |
| **Healthy** | Green, no spots | 🟢 Good |

---

## Key Files to Know

```
app/page.tsx                 - Main app interface
components/detection-page.tsx - Camera & upload
components/disease-results.tsx - Analysis display
lib/plant-api.ts             - Disease detection
```

---

## Deploy to Vercel (Free!)

```bash
# Option 1: Via CLI
npm i -g vercel
vercel

# Option 2: Via GitHub
git push to GitHub → vercel.com → Connect repo → Done!
```

---

## Integrate Real API

Edit `lib/plant-api.ts` and replace:
```typescript
// Replace this:
const result = simulateImageAnalysis(base64Image);

// With your API call:
const response = await fetch('YOUR_API_ENDPOINT', {
  method: 'POST',
  body: JSON.stringify({ image: base64Image })
});
```

---

## Mobile Camera Works? ✅

- ✅ iPhone: Works in Safari
- ✅ Android: Works in Chrome
- ✅ Desktop: Works in all browsers
- ⚠️ Needs HTTPS for camera (in production)

---

## Your Data is Private

- ✅ No tracking
- ✅ No servers
- ✅ Saved locally in browser
- ✅ You can delete anytime

---

## Troubleshooting (30 seconds)

| Issue | Fix |
|-------|-----|
| Camera not working | Check browser permissions |
| Image upload fails | Try another image |
| History not saving | Enable localStorage |
| App won't start | Run `npm install` again |

---

## Next Steps

1. ✅ Get app running locally
2. 📱 Test on your phone
3. 🚀 Deploy to Vercel
4. 🔗 Integrate real API (optional)
5. 📢 Share with farmers

---

## Files to Explore

- **README.md** - Full documentation
- **SETUP_GUIDE.md** - Detailed setup
- **IMPLEMENTATION_NOTES.md** - Technical details
- **QUICK_START.md** - This file (you are here!)

---

## Need Help?

- Check **README.md** for detailed info
- See **SETUP_GUIDE.md** for troubleshooting
- View code comments in component files
- Check browser console for errors (F12)

---

## Success Checklist

- [ ] App runs locally at http://localhost:3000
- [ ] Can take a photo with camera
- [ ] Can upload an image
- [ ] See disease detection results
- [ ] History saves between refreshes
- [ ] Can export detection history
- [ ] Ready to deploy! 🎉

---

## One More Thing

The app currently uses **simulated** disease detection for demo. To use **real** detection:

1. Get API key from disease detection service
2. Update `lib/plant-api.ts` with API endpoint
3. Add `.env.local` with your API key
4. Done! ✅

---

**Happy farming! 🌱**

Questions? See the full **README.md** for everything you need to know.
