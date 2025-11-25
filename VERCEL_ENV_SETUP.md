# Adding Google Maps API Key to Vercel

## Option 1: Via Vercel Dashboard (Recommended)

1. Go to https://vercel.com/dashboard
2. Select your project: **bob-rentalz**
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Add:
   - **Name:** `VITE_GOOGLE_MAPS_API_KEY`
   - **Value:** `your_google_maps_api_key_here`
   - **Environment:** Select all (Production, Preview, Development)
6. Click **Save**
7. **Redeploy** your project for changes to take effect

## Option 2: Via Vercel CLI

```bash
vercel env add VITE_GOOGLE_MAPS_API_KEY
# Paste your API key when prompted
# Select all environments
```

## Option 3: Local Development

Create `.env.local` file:
```bash
echo "VITE_GOOGLE_MAPS_API_KEY=your_api_key_here" > .env.local
```

**Note:** Never commit `.env.local` to Git!

## Verify It Works

After adding the environment variable:
1. Redeploy the project
2. Visit: https://bob-rentalz.vercel.app/owner/add-property
3. The Google Maps place picker should load
4. Try searching for a location

## Troubleshooting

If the map doesn't load:
- Check browser console for errors
- Verify the API key is set correctly in Vercel
- Ensure APIs are enabled in Google Cloud Console
- Check domain restrictions on the API key
