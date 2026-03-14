# Plant Doctor - Setup & Deployment Guide

## Quick Start (Development)

### 1. Install Dependencies
```bash
npm install
# or
pnpm install
```

### 2. Run Development Server
```bash
npm run dev
# or
pnpm dev
```

The app will be available at `http://localhost:3000`

### 3. Start Using
- Click the **Detect** tab
- **Take Photo** to use your camera (requires HTTPS in production)
- **Upload Image** to select a potato plant image
- View results with disease analysis
- Check **History** tab to see all past detections

---

## Deployment to Vercel (Recommended)

### Option 1: Deploy with Vercel CLI

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
vercel
```

3. **Follow prompts** to connect to your Vercel account

### Option 2: Deploy via GitHub

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/plant-doctor.git
git branch -M main
git push -u origin main
```

2. **Connect to Vercel**
   - Go to https://vercel.com/import
   - Select your GitHub repository
   - Click Import
   - Deploy!

### Option 3: Deploy via ZIP

1. **Download ZIP** from v0
2. **Extract and open** the folder
3. **Run locally first:**
   ```bash
   npm install
   npm run dev
   ```
4. **Deploy to any host:**
   - Build: `npm run build`
   - Start: `npm start`

---

## Using the App

### Home Tab
- Overview of the app
- Statistics (number of detections)
- Learn about common potato diseases
- Quick "How It Works" guide

### Detection Tab

#### Camera Capture
1. Click **"Take Photo"** button
2. Allow camera access when prompted
3. Point camera at potato plant leaf
4. Click **"Capture"** to take photo
5. Wait for analysis (2-3 seconds)
6. View detailed results

#### Image Upload
1. Click **"Upload Image"** or drag file
2. Select a potato plant image from your device
3. Wait for analysis
4. View results

#### Understanding Results
- **Disease Name**: Early Blight, Late Blight, or Healthy
- **Confidence Score**: How certain the model is (0-100%)
- **Symptoms**: What to look for
- **Treatment**: Recommended actions
- **Prevention**: How to avoid the disease
- **Plant Care**: Sunlight, water, and other care tips

### History Tab

#### View History
- See all past detections
- Sort by date (newest first)
- Filter by disease type
- View confidence scores

#### Export Data
1. Click **Download** icon
2. Get CSV file with all detections
3. Import into spreadsheet or analytics tool

#### Manage History
- Click trash icon to delete individual detections
- Click **"Clear All History"** to remove everything
- History is saved in your browser (not cloud)

---

## Integration with Real API

The app currently uses a simulated disease detection model. To integrate with a real API:

### Step 1: Update Plant API
Edit `/lib/plant-api.ts`:

```typescript
export async function analyzePlantImage(base64Image: string): Promise<DetectionResult> {
  // Replace the simulateImageAnalysis call with your API
  
  const response = await fetch('YOUR_API_ENDPOINT', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${YOUR_API_KEY}`
    },
    body: JSON.stringify({
      image: base64Image,
      model: 'potato-disease-detection'
    })
  });
  
  const data = await response.json();
  return {
    class: data.class,
    confidence: data.confidence,
    description: data.description
  };
}
```

### Step 2: Add Environment Variables
Create `.env.local`:
```
NEXT_PUBLIC_API_KEY=your_api_key_here
NEXT_PUBLIC_API_ENDPOINT=https://api.example.com/predict
```

### Example APIs to Integrate
- **PlantVillage API** - Plant disease identification
- **Teachable Machine** - Custom trained models
- **TensorFlow.js** - Client-side ML
- **AWS Rekognition** - Image analysis
- **Google Cloud Vision** - Image recognition

---

## Browser Support & Requirements

### Supported Browsers
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Requirements
- **Camera Access**: For taking photos (optional, can upload instead)
- **JavaScript**: Enabled
- **localStorage**: For saving history (optional)

### Mobile Usage
- App is fully mobile-responsive
- Touch-friendly buttons and UI
- Works on both portrait and landscape
- Camera works on mobile devices

---

## Troubleshooting

### Camera Not Working
**Problem**: Camera button doesn't work
- **Solution 1**: Check browser permissions
  - Chrome: Settings → Privacy → Site settings → Camera
  - Firefox: Preferences → Privacy → Camera
  - Safari: Settings → Websites → Camera
- **Solution 2**: Use HTTPS (camera requires secure connection)
- **Solution 3**: Try uploading image instead

### Image Analysis Fails
**Problem**: "Failed to analyze image" error
- **Solution 1**: Try a clearer image
- **Solution 2**: Ensure it's a potato plant leaf
- **Solution 3**: Check console for error messages (F12)
- **Solution 4**: Wait a moment and try again

### History Not Saving
**Problem**: Detections don't persist after refresh
- **Solution 1**: Check if localStorage is enabled
  - Most browsers have it enabled by default
  - Incognito/Private mode might not save
- **Solution 2**: Clear browser cache/cookies
- **Solution 3**: Try a different browser

### App Runs Slow
**Problem**: App feels sluggish
- **Solution 1**: Close other browser tabs
- **Solution 2**: Clear browser cache
- **Solution 3**: Update your browser
- **Solution 4**: Check internet connection

---

## Development Tips

### File Structure
```
app/              - Next.js app directory
├── page.tsx      - Main page with tabs
├── layout.tsx    - Root layout
└── globals.css   - Global styles

components/       - React components
├── home-page.tsx        - Home tab
├── detection-page.tsx   - Detection tab
├── disease-results.tsx  - Results display
├── history-page.tsx     - History tab
└── ui/            - shadcn components

lib/              - Utilities
└── plant-api.ts  - API integration

public/           - Static files
└── *.jpg, .png   - Images
```

### Modifying Styles
Edit `/app/globals.css` to change:
- Colors (primary, secondary, accent, etc.)
- Typography (fonts, sizes)
- Spacing and layout

### Adding Features
1. Create new component in `/components`
2. Import in appropriate parent component
3. Update page layout if needed
4. Test on mobile and desktop

### Testing
```bash
# Run linter
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

---

## Security Considerations

### Browser Storage
- Detection history is stored in **browser localStorage**
- **NOT** sent to external servers
- **NOT** encrypted (use HTTPS)
- Cleared when browser cache is cleared

### Image Data
- Currently, images are processed locally or sent to specified API
- No images stored on server
- Review privacy policy before deploying

### API Keys
- Never commit `.env.local` to git
- Keep API keys in environment variables
- Use HTTPS in production
- Consider rate limiting

---

## Performance Optimization

### Current Optimizations
- ✅ Next.js 16 with App Router
- ✅ Server Components where possible
- ✅ Image optimization
- ✅ Code splitting
- ✅ CSS purging

### Potential Improvements
- Add image compression before upload
- Implement request caching
- Optimize bundle size
- Add service workers for offline
- Lazy load components

---

## Updating the App

### Check for Updates
```bash
npm outdated
```

### Update Dependencies
```bash
npm update
# or
npm upgrade
```

### Update Specific Package
```bash
npm install package-name@latest
```

---

## Support & Help

### Getting Help
1. Check the troubleshooting section above
2. Review error messages in browser console (F12)
3. Check GitHub issues
4. Create a new issue with:
   - Detailed description
   - Steps to reproduce
   - Browser/OS info
   - Screenshots if applicable

### Reporting Bugs
Include:
- What you were trying to do
- What happened instead
- Expected behavior
- Browser and OS version
- Console errors (if any)

---

## Next Steps

1. ✅ **Get the app running locally**
2. ✅ **Test taking photos and uploading images**
3. ✅ **Deploy to Vercel or your hosting**
4. ✅ **Share with farmers and gardeners**
5. ✅ **Gather feedback and improve**

---

## FAQ

**Q: Is my data private?**
A: Yes! All data is stored locally in your browser. Nothing is sent to external servers unless you configure an API integration.

**Q: Can I use this offline?**
A: Not yet, but you can set it up with service workers for offline functionality.

**Q: What diseases can it detect?**
A: Currently potato diseases (Early Blight, Late Blight, and Healthy). Can be extended for other crops.

**Q: How accurate is it?**
A: Accuracy depends on image quality and the ML model used. The demo uses simulated results for testing.

**Q: Can I modify the app?**
A: Yes! It's open source. Feel free to customize colors, add features, or integrate your own API.

**Q: Where can I get good training images?**
A: Check PlantVillage, Kaggle, or agricultural extension resources.

---

For more information, check the main **README.md** file.

Happy farming! 🌱
