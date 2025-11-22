/**
 * Generate a 6-character Airbnb-style shortcode
 * Uses alphanumeric characters excluding confusing ones (0, O, I, 1)
 */
export function generateShortcode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let shortcode = '';
  for (let i = 0; i < 6; i++) {
    shortcode += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return shortcode;
}

/**
 * Generate city code from location
 */
export function getCityCode(location: string): string {
  const cityMap: Record<string, string> = {
    'New Cairo': 'NC',
    Cairo: 'CAI',
    Maadi: 'MAD',
    Zamalek: 'ZAM',
    Heliopolis: 'HEL',
    'Nasr City': 'NAS',
    'Sheikh Zayed': 'SHZ',
    '6th of October': '6OC',
    Alexandria: 'ALX',
    Hurghada: 'HUR',
    'Sharm El Sheikh': 'SHR',
    'Ain Sokhna': 'ASK',
    'North Coast': 'NTC',
    'El Gouna': 'ELG',
    Somabay: 'SOM',
  };

  // Try to match the location with known cities
  for (const [city, code] of Object.entries(cityMap)) {
    if (location.includes(city)) {
      return code;
    }
  }

  // Default to first 3 letters uppercase
  return location.substring(0, 3).toUpperCase();
}

/**
 * Generate property type code
 */
export function getTypeCode(title: string): string {
  const titleLower = title.toLowerCase();

  if (titleLower.includes('apartment') || titleLower.includes('apt')) return 'APT';
  if (titleLower.includes('villa')) return 'VIL';
  if (titleLower.includes('penthouse')) return 'PNT';
  if (titleLower.includes('studio')) return 'STD';
  if (titleLower.includes('duplex')) return 'DPX';
  if (titleLower.includes('townhouse')) return 'TWN';
  if (titleLower.includes('chalet')) return 'CHL';

  return 'UNT'; // Default to "unit"
}

/**
 * Generate advanced reference code
 * Format: BOB-{cityCode}-{typeCode}-{idCode}-R{cycle} • {shortcode}
 */
export function generateReferenceCode(
  id: number,
  location: string,
  title: string,
  shortcode: string,
  cycle: number = 1,
): string {
  const cityCode = getCityCode(location);
  const typeCode = getTypeCode(title);
  const idCode = id.toString().padStart(4, '0');

  return `BOB-${cityCode}-${typeCode}-${idCode}-R${cycle} • ${shortcode}`;
}

/**
 * Generate QR code data URL for a property
 * Returns a data URL that can be used in an img src
 */
export async function generateQRCode(url: string): Promise<string> {
  // Using qrcode library
  const QRCode = await import('qrcode');

  try {
    const qrDataUrl = await QRCode.toDataURL(url, {
      width: 200,
      margin: 1,
      color: {
        dark: '#0E56A4', // BOB blue
        light: '#FFFFFF',
      },
    });
    return qrDataUrl;
  } catch (err) {
    console.error('QR Code generation failed:', err);
    return '';
  }
}

/**
 * Generate QR code synchronously (for initial render)
 * This creates a placeholder or uses a pre-generated code
 */
export function generateQRCodeSync(url: string): string {
  // For initial render, we'll use a data URL placeholder
  // In a real app, you'd pre-generate these or use lazy loading
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}&color=0E56A4&bgcolor=FFFFFF`;
}

/**
 * Add property metadata (shortcode, reference, QR code) to a property object
 */
export function addPropertyMetadata(property: any): any {
  const shortcode = generateShortcode();
  const propertyUrl = `https://bobrentalz.com/property/${property.id}`;

  return {
    ...property,
    shortcode,
    referenceCode: generateReferenceCode(
      property.id,
      property.location,
      property.title,
      shortcode,
      property.cycle || 1,
    ),
    qrCode: generateQRCodeSync(propertyUrl),
    propertyUrl,
  };
}
