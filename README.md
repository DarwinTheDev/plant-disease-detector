# Plant Doctor - Potato Disease Detection App

A mobile-responsive web application that uses AI-powered deep learning to detect potato plant diseases from images. Built with Next.js, React, and Tailwind CSS.

## Features

✨ **Key Features**
- 📷 **Camera Capture** - Take real-time photos using your device camera
- 📤 **Image Upload** - Upload existing images from your device
- 🤖 **AI Detection** - Deep learning model detects:
  - Early Blight (Alternaria solani)
  - Late Blight (Phytophthora infestans)
  - Healthy plants
- 📊 **Detailed Analysis** - Get comprehensive disease information including:
  - Confidence score
  - Symptoms list
  - Treatment recommendations
  - Prevention tips
  - Plant care guidelines
- 📜 **Detection History** - Track all your plant analyses with:
  - Date and time stamps
  - Disease type and confidence
  - Export to CSV
  - Filter by disease type
- 📱 **Mobile-First Design** - Optimized for mobile and desktop devices

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

1. **Clone the repository** (or download the ZIP)
```bash
cd plant-doctor-app
```

2. **Install dependencies**
```bash
npm install
# or
pnpm install
```

3. **Run the development server**
```bash
npm run dev
# or
pnpm dev
```

4. **Open in browser**
Navigate to `http://localhost:3000`

### Build for Production
```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── page.tsx              # Main app page with tabs
│   ├── layout.tsx            # Root layout with metadata
│   └── globals.css           # Global styles and theme
├── components/
│   ├── home-page.tsx         # Home tab content
│   ├── detection-page.tsx    # Detection tab with camera/upload
│   ├── disease-results.tsx   # Results display component
│   ├── history-page.tsx      # History and analytics tab
│   └── ui/                   # shadcn/ui components
├── lib/
│   └── plant-api.ts          # Disease detection API
└── public/
    └── plant-detection-hero.jpg  # Hero image
```

## How It Works

### Detection Process
1. **Capture or Upload** - Take a photo with your camera or upload an image
2. **AI Analysis** - The image is analyzed using our disease detection model
3. **Results** - Get instant results with confidence score, symptoms, and recommendations
4. **Save History** - Detection is automatically saved to your local history

### Disease Detection

The app uses a deep learning model trained to detect:

- **Early Blight**: Caused by *Alternaria solani*
  - Brown circular spots with concentric rings
  - Appears on lower leaves first
  - Yellow halo around lesions

- **Late Blight**: Caused by *Phytophthora infestans*
  - Water-soaked lesions
  - White fungal growth on undersides
  - Spreads rapidly in wet conditions

- **Healthy**: No disease detected
  - Green, vigorous foliage
  - Normal growth pattern

## Technologies Used

- **Next.js 16** - React framework with server components
- **React 19** - UI library with latest hooks
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Lucide React** - Beautiful icon library
- **TypeScript** - Type-safe development

## Features in Detail

### Home Tab
- Welcome message
- Quick statistics (detection count, app status)
- How-it-works guide
- Common potato disease information

### Detection Tab
- Drag-and-drop image upload area
- Camera capture with live preview
- Loading state with progress indication
- Error handling with user-friendly messages
- Disease results with detailed analysis

### History Tab
- Chronological list of all detections
- Filter by disease type
- Statistics (total scans, average confidence)
- Export to CSV format
- Clear history option
- Individual detection deletion

## Data Storage

- Detection history is stored in browser's **localStorage**
- No data is sent to external servers
- History persists between sessions
- Can be cleared at any time

## API Integration

The app includes placeholder for real API integration:
- `lib/plant-api.ts` contains the disease detection logic
- Currently uses simulated analysis for demonstration
- Ready to integrate with:
  - PlantVillage API
  - Custom Deep Learning API
  - Cloud-based prediction services

To use a real API, update the `analyzePlantImage` function in `lib/plant-api.ts`.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Fully responsive design for all screen sizes
- Optimized image handling
- Efficient state management
- Fast load times with Next.js optimization

## Future Enhancements

- Integration with actual ML model API
- User accounts and cloud storage
- Multi-language support
- Offline capability with service workers
- Real-time alerts for severe diseases
- Community disease database
- Integration with agricultural extension services

## Troubleshooting

### Camera Not Working
- Check browser permissions for camera access
- Ensure HTTPS is used (camera requires secure context)
- Some browsers require user interaction before camera access

### Image Analysis Fails
- Ensure image is of a potato plant leaf
- Try a clear, well-lit image
- Check internet connection for API calls

### History Not Saving
- Check if localStorage is enabled in browser
- Clear browser cache if issues persist
- Check console for any error messages

## Contributing

Feel free to open issues and submit pull requests for any improvements.

## License

This project is open source and available for educational and commercial use.

## Support

For issues, questions, or suggestions, please create an issue in the repository.

---

Built with ❤️ for farmers and plant enthusiasts
