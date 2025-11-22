/**
 * Location Data - 3-Level Hierarchy
 * Structure: City → Area → Compound
 */

export interface Compound {
  id: string;
  name: string;
  areaId: string;
}

export interface Area {
  id: string;
  name: string;
  cityId: string;
}

export interface City {
  id: string;
  name: string;
  region: string;
}

export interface TopLevelRegion {
  id: string;
  name: string;
  cityIds: string[]; // Maps to one or more city IDs
}

export interface LocationSearchResult {
  type: 'city' | 'area' | 'compound';
  name: string;
  parentName?: string;
  fullPath: string;
  id: string;
}

// TOP-LEVEL REGIONS (Simplified UI)
export const topLevelRegions: TopLevelRegion[] = [
  { id: 'greater-cairo-region', name: 'Greater Cairo', cityIds: ['greater-cairo'] },
  { id: 'new-cairo-region', name: 'New Cairo', cityIds: ['new-cairo'] },
  { id: 'sheikh-zayed-region', name: 'Sheikh Zayed', cityIds: ['sheikh-zayed'] },
  { id: '6th-october-region', name: '6th of October', cityIds: ['6th-october'] },
  { id: 'maadi-region', name: 'Maadi', cityIds: ['old-cairo'] },
  { id: 'zamalek-region', name: 'Zamalek', cityIds: ['old-cairo'] },
  { id: 'heliopolis-region', name: 'Heliopolis / Nasr City', cityIds: ['heliopolis-nasr'] },
  {
    id: 'north-coast-region',
    name: 'North Coast – Sahel',
    cityIds: ['north-coast-sahel', 'ras-el-hekma', 'sidi-abdel-rahman', 'new-alamein'],
  },
  { id: 'el-gouna-region', name: 'El Gouna', cityIds: ['el-gouna'] },
  { id: 'hurghada-region', name: 'Hurghada', cityIds: ['hurghada'] },
  { id: 'makadi-region', name: 'Makadi Bay', cityIds: ['makadi'] },
  { id: 'somabay-region', name: 'Somabay', cityIds: ['somabay'] },
  { id: 'sahl-hasheesh-region', name: 'Sahl Hasheesh', cityIds: ['sahl-hasheesh'] },
  { id: 'ain-sokhna-region', name: 'Ain Sokhna', cityIds: ['ain-sokhna'] },
  { id: 'alexandria-region', name: 'Alexandria', cityIds: ['alexandria'] },
];

// LEVEL 1 - CITIES
export const cities: City[] = [
  // Greater Cairo
  { id: 'greater-cairo', name: 'Greater Cairo', region: 'Cairo' },
  { id: 'sheikh-zayed', name: 'Sheikh Zayed', region: 'Giza' },
  { id: '6th-october', name: '6th of October', region: 'Giza' },
  { id: 'new-cairo', name: 'New Cairo', region: 'Cairo' },
  { id: 'old-cairo', name: 'Old Cairo', region: 'Cairo' },
  { id: 'heliopolis-nasr', name: 'Heliopolis / Nasr City', region: 'Cairo' },
  { id: 'new-capital', name: 'New Capital', region: 'Cairo' },
  { id: 'shorouk-obour', name: 'El Shorouk / Obour', region: 'Cairo' },
  { id: 'madinaty-mostakbal', name: 'Madinaty / Mostakbal', region: 'Cairo' },

  // North Coast
  { id: 'north-coast-sahel', name: 'North Coast – Sahel', region: 'North Coast' },
  { id: 'ras-el-hekma', name: 'Ras El Hekma', region: 'North Coast' },
  { id: 'sidi-abdel-rahman', name: 'Sidi Abdel Rahman', region: 'North Coast' },
  { id: 'new-alamein', name: 'New Alamein', region: 'North Coast' },

  // Red Sea
  { id: 'el-gouna', name: 'El Gouna', region: 'Red Sea' },
  { id: 'hurghada', name: 'Hurghada', region: 'Red Sea' },
  { id: 'makadi', name: 'Makadi', region: 'Red Sea' },
  { id: 'sahl-hasheesh', name: 'Sahl Hasheesh', region: 'Red Sea' },
  { id: 'somabay', name: 'Somabay', region: 'Red Sea' },
  { id: 'ain-sokhna', name: 'Ain Sokhna', region: 'Red Sea' },

  // Alexandria
  { id: 'alexandria', name: 'Alexandria', region: 'Alexandria' },
];

// LEVEL 2 - AREAS
export const areas: Area[] = [
  // New Cairo Areas
  { id: 'nc-5th-settlement', name: '5th Settlement', cityId: 'new-cairo' },
  { id: 'nc-golden-square', name: 'Golden Square', cityId: 'new-cairo' },
  { id: 'nc-north-investors', name: 'North Investors', cityId: 'new-cairo' },
  { id: 'nc-south-investors', name: 'South Investors', cityId: 'new-cairo' },
  { id: 'nc-lotus', name: 'El Lotus', cityId: 'new-cairo' },
  { id: 'nc-choueifat', name: 'El Choueifat', cityId: 'new-cairo' },
  { id: 'nc-central', name: 'Central New Cairo', cityId: 'new-cairo' },

  // Sheikh Zayed Areas
  { id: 'sz-general', name: 'Sheikh Zayed General', cityId: 'sheikh-zayed' },
  { id: 'sz-new-zayed', name: 'New Zayed', cityId: 'sheikh-zayed' },

  // 6th of October Areas
  { id: 'oct-city', name: 'October City', cityId: '6th-october' },
  { id: 'oct-gardens', name: 'October Gardens', cityId: '6th-october' },
  { id: 'oct-new-sphinx', name: 'New Sphinx', cityId: '6th-october' },

  // North Coast Areas
  { id: 'nc-marina', name: 'Marina', cityId: 'north-coast-sahel' },
  { id: 'nc-sidi-rahman', name: 'Sidi Abdel Rahman', cityId: 'north-coast-sahel' },
  { id: 'nc-ras-hekma', name: 'Ras El Hekma', cityId: 'north-coast-sahel' },
  { id: 'nc-ghazala', name: 'Ghazala Bay', cityId: 'north-coast-sahel' },
  { id: 'nc-dabaa', name: 'Al Dabaa', cityId: 'north-coast-sahel' },

  // Red Sea - El Gouna Areas
  { id: 'gouna-downtown', name: 'Downtown El Gouna', cityId: 'el-gouna' },
  { id: 'gouna-marina', name: 'Marina El Gouna', cityId: 'el-gouna' },

  // Red Sea - Makadi Areas
  { id: 'makadi-bay', name: 'Makadi Bay', cityId: 'makadi' },

  // Red Sea - Sahl Hasheesh Areas
  { id: 'sahl-hasheesh-bay', name: 'Sahl Hasheesh Bay', cityId: 'sahl-hasheesh' },

  // Red Sea - Somabay Areas
  { id: 'somabay-area', name: 'Somabay Resort Area', cityId: 'somabay' },

  // Old Cairo Areas
  { id: 'old-maadi', name: 'Maadi', cityId: 'old-cairo' },
  { id: 'old-zamalek', name: 'Zamalek', cityId: 'old-cairo' },
  { id: 'old-dokki', name: 'Dokki', cityId: 'old-cairo' },
];

// LEVEL 3 - COMPOUNDS
export const compounds: Compound[] = [
  // New Cairo → 5th Settlement Compounds
  { id: 'comp-mivida', name: 'Mivida', areaId: 'nc-5th-settlement' },
  { id: 'comp-cfc', name: 'Cairo Festival City', areaId: 'nc-5th-settlement' },
  { id: 'comp-hyde-park', name: 'Hyde Park', areaId: 'nc-5th-settlement' },
  { id: 'comp-mountain-view', name: 'Mountain View', areaId: 'nc-5th-settlement' },
  { id: 'comp-palm-hills-nc', name: 'Palm Hills NC', areaId: 'nc-5th-settlement' },
  { id: 'comp-lake-view', name: 'Lake View', areaId: 'nc-5th-settlement' },
  { id: 'comp-eastown', name: 'Eastown', areaId: 'nc-5th-settlement' },
  { id: 'comp-katameya-dunes', name: 'Katameya Dunes', areaId: 'nc-5th-settlement' },

  // Sheikh Zayed Compounds
  { id: 'comp-allegria', name: 'Allegria', areaId: 'sz-general' },
  { id: 'comp-beverly-hills', name: 'Beverly Hills', areaId: 'sz-general' },
  { id: 'comp-etapa', name: 'Etapa', areaId: 'sz-general' },
  { id: 'comp-karma', name: 'Karma', areaId: 'sz-general' },
  { id: 'comp-greens', name: 'Greens', areaId: 'sz-general' },
  { id: 'comp-sodic-west', name: 'Sodic West', areaId: 'sz-general' },

  // 6th of October Compounds
  { id: 'comp-palm-hills-oct', name: 'Palm Hills October', areaId: 'oct-city' },
  { id: 'comp-mv-icity', name: 'Mountain View iCity', areaId: 'oct-city' },
  { id: 'comp-porto-oct', name: 'Porto October', areaId: 'oct-city' },

  // North Coast → Ras El Hekma Compounds
  { id: 'comp-hacienda', name: 'Hacienda', areaId: 'nc-ras-hekma' },
  { id: 'comp-marassi', name: 'Marassi', areaId: 'nc-ras-hekma' },
  { id: 'comp-telal', name: 'Telal', areaId: 'nc-ras-hekma' },
  { id: 'comp-bianchi', name: 'Bianchi', areaId: 'nc-ras-hekma' },
  { id: 'comp-gaia', name: 'Gaia', areaId: 'nc-ras-hekma' },
  { id: 'comp-fouka-bay', name: 'Fouka Bay', areaId: 'nc-ras-hekma' },

  // Red Sea - El Gouna Compounds
  { id: 'comp-tawila', name: 'Tawila', areaId: 'gouna-downtown' },
  { id: 'comp-sabina', name: 'Sabina', areaId: 'gouna-downtown' },
  { id: 'comp-ancient-sands', name: 'Ancient Sands', areaId: 'gouna-downtown' },
  { id: 'comp-mangroovy', name: 'Mangroovy', areaId: 'gouna-marina' },

  // Red Sea - Makadi Compounds
  { id: 'comp-makadi-heights', name: 'Makadi Heights', areaId: 'makadi-bay' },
];

/**
 * Search all locations (cities, areas, compounds) by query
 * Returns ranked results: Exact compounds → Areas → Cities
 */
export function searchLocations(query: string): LocationSearchResult[] {
  if (!query || query.trim() === '') return [];

  const lowerQuery = query.toLowerCase().trim();
  const results: LocationSearchResult[] = [];

  // Search compounds (Priority 1)
  compounds.forEach((compound) => {
    if (compound.name.toLowerCase().includes(lowerQuery)) {
      const area = areas.find((a) => a.id === compound.areaId);
      const city = area ? cities.find((c) => c.id === area.cityId) : undefined;

      results.push({
        type: 'compound',
        name: compound.name,
        parentName: area?.name,
        fullPath: `${compound.name}, ${area?.name || ''}, ${city?.name || ''}`,
        id: compound.id,
      });
    }
  });

  // Search areas (Priority 2)
  areas.forEach((area) => {
    if (area.name.toLowerCase().includes(lowerQuery)) {
      const city = cities.find((c) => c.id === area.cityId);

      results.push({
        type: 'area',
        name: area.name,
        parentName: city?.name,
        fullPath: `${area.name}, ${city?.name || ''}`,
        id: area.id,
      });
    }
  });

  // Search cities (Priority 3)
  cities.forEach((city) => {
    if (city.name.toLowerCase().includes(lowerQuery)) {
      results.push({
        type: 'city',
        name: city.name,
        parentName: city.region,
        fullPath: city.name,
        id: city.id,
      });
    }
  });

  return results;
}

/**
 * Get all locations in a flat list for dropdowns
 * Grouped by: Cities → Areas → Compounds
 */
export function getAllLocationsFlat(): LocationSearchResult[] {
  const results: LocationSearchResult[] = [];

  // Add all cities
  cities.forEach((city) => {
    results.push({
      type: 'city',
      name: city.name,
      parentName: city.region,
      fullPath: city.name,
      id: city.id,
    });
  });

  // Add all areas
  areas.forEach((area) => {
    const city = cities.find((c) => c.id === area.cityId);
    results.push({
      type: 'area',
      name: area.name,
      parentName: city?.name,
      fullPath: `${area.name}, ${city?.name || ''}`,
      id: area.id,
    });
  });

  // Add all compounds
  compounds.forEach((compound) => {
    const area = areas.find((a) => a.id === compound.areaId);
    const city = area ? cities.find((c) => c.id === area.cityId) : undefined;

    results.push({
      type: 'compound',
      name: compound.name,
      parentName: area?.name,
      fullPath: `${compound.name}, ${area?.name || ''}, ${city?.name || ''}`,
      id: compound.id,
    });
  });

  return results;
}

/**
 * Get areas by city ID
 */
export function getAreasByCity(cityId: string): Area[] {
  return areas.filter((area) => area.cityId === cityId);
}

/**
 * Get areas by region ID (supports multiple cities)
 */
export function getAreasByRegion(regionId: string): Area[] {
  const region = topLevelRegions.find((r) => r.id === regionId);
  if (!region) return [];

  return areas.filter((area) => region.cityIds.includes(area.cityId));
}

/**
 * Get compounds by area ID
 */
export function getCompoundsByArea(areaId: string): Compound[] {
  return compounds.filter((compound) => compound.areaId === areaId);
}

/**
 * Map region name to region ID
 */
export function getRegionIdByName(name: string): string | undefined {
  const region = topLevelRegions.find((r) => r.name === name);
  return region?.id;
}

/**
 * Map area name to area ID
 */
export function getAreaIdByName(name: string): string | undefined {
  const area = areas.find((a) => a.name === name);
  return area?.id;
}

// Legacy compatibility - map to old location format
export const locations = cities.map((city, index) => ({
  id: (index + 1).toString(),
  name: city.name,
  region: city.region,
}));
