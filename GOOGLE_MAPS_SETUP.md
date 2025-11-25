# Google Maps Integration Setup Guide

## 🎯 What We're Implementing

Replacing the current Leaflet + Nominatim map picker with **Google Maps Extended Component Library** to get:
- ✅ Professional place search with autocomplete
- ✅ Reliable geocoding (no more 404 errors)
- ✅ Better user experience
- ✅ Official Google support

---

## 📋 Setup Checklist

### ✅ Step 1: Create Google Cloud Project (DONE BY USER)
- [x] Go to https://console.cloud.google.com/
- [x] Create new project: "BOB Rentalz"
- [x] Select industry: Real Estate
- [x] Select framework: React (+ Next.js)

### ✅ Step 2: Select Use Cases (IN PROGRESS)
**Required selections:**
- [x] Add API Key
- [x] Show current location on map
- [x] Add place details on a map
- [x] Enable address autocomplete ⭐ MOST IMPORTANT

**Optional (can uncheck):**
- [ ] Get business insights from location data
- [ ] Get directions & trip planning
- [ ] Visualize data on a map
- [ ] Track assets & devices

### ⏳ Step 3: Enable Required APIs (PENDING)
The wizard will automatically enable:
- Maps JavaScript API
- Places API
- Geocoding API

### ⏳ Step 4: Create API Key (PENDING)
- Copy the generated API key
- Restrict it to your domain for security

### ⏳ Step 5: Share API Key (PENDING)
- Paste the API key in chat
- I'll add it to environment variables

---

## 🔧 What I've Already Prepared

### ✅ Installed Packages
```bash
npm install @googlemaps/extended-component-library @googlemaps/react-wrapper
```

### ✅ Created GoogleMapsPicker Component
**File:** `/src/components/GoogleMapsPicker.tsx`

**Features:**
- 🔍 Place search with autocomplete
- 🗺️ Interactive Google Map
- 📍 Draggable marker
- 🎯 Click-to-set location
- 🔄 Reverse geocoding (coordinates → address)
- 📋 Real-time location display

### ✅ Updated Environment Template
**File:** `.env.example`

Added:
```env
VITE_GOOGLE_MAPS_API_KEY=your-google-maps-api-key-here
```

---

## 🚀 Next Steps (After API Key)

### 1. Add API Key to Environment
```bash
# Create .env.local file
echo "VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key" >> .env.local
```

### 2. Update AddProperty Page
Replace current MapPicker with GoogleMapsPicker:
```tsx
import GoogleMapsPicker from '../components/GoogleMapsPicker';

// In the component:
<GoogleMapsPicker
  initialLat={mapLocation?.lat}
  initialLng={mapLocation?.lng}
  onLocationSelect={(lat, lng, address) => {
    setMapLocation({ lat, lng });
    if (address) {
      setFormData(prev => ({ ...prev, address }));
    }
  }}
  apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
/>
```

### 3. Add to Vercel Environment Variables
```
VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key
```

### 4. Test Locally
```bash
npm run dev
```

### 5. Deploy to Production
```bash
git add .
git commit -m "feat: integrate Google Maps place picker"
git push
```

---

## 💰 Estimated Costs

### Free Tier
- $200/month credit from Google
- Covers approximately:
  - 28,000 map loads
  - 40,000 autocomplete requests
  - 40,000 geocoding requests

### Expected Usage (Small-Medium Site)
- Estimated: 100-500 property additions/month
- Estimated cost: **$0/month** (within free tier)

### If You Exceed Free Tier
- Maps JavaScript API: $7 per 1,000 loads
- Places Autocomplete: $2.83 per 1,000 requests
- Geocoding: $5 per 1,000 requests

**Recommendation:** Set up billing alerts at $50/month

---

## 🔒 Security Best Practices

### API Key Restrictions (IMPORTANT!)

1. **Application Restrictions**
   - Type: HTTP referrers
   - Allowed referrers:
     - `https://bob-rentalz.vercel.app/*`
     - `http://localhost:3000/*`

2. **API Restrictions**
   - Restrict to only these APIs:
     - Maps JavaScript API
     - Places API
     - Geocoding API

3. **Never Commit API Keys**
   - Add `.env.local` to `.gitignore` ✓ (already done)
   - Use environment variables in Vercel

---

## 🎊 Benefits Over Current Implementation

| Feature | Current (Leaflet + Nominatim) | New (Google Maps) |
|---------|-------------------------------|-------------------|
| **Reliability** | ❌ 404 errors | ✅ 99.9% uptime |
| **Search** | ❌ Broken | ✅ Autocomplete |
| **Geocoding** | ❌ Unreliable | ✅ Best-in-class |
| **Database** | ⚠️ Limited | ✅ Comprehensive |
| **Support** | ❌ None | ✅ Official |
| **Cost** | ✅ Free | ✅ Free tier |
| **Maintenance** | ❌ Custom code | ✅ Managed |

---

## 📞 Support

If you encounter any issues:
1. Check API key is correctly set in environment variables
2. Verify APIs are enabled in Google Cloud Console
3. Check browser console for error messages
4. Verify domain restrictions allow your current URL

---

## ✅ Status

- [x] Packages installed
- [x] Component created
- [x] Environment template updated
- [ ] API key obtained ⏳ **WAITING FOR USER**
- [ ] Integration completed
- [ ] Testing completed
- [ ] Deployed to production

---

**Last Updated:** Nov 25, 2025  
**Status:** Ready for API key integration
