import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChartRequest {
  name: string;
  date: string; // ISO date string
  time: string; // HH:MM format
  latitude: number;
  longitude: number;
  timezone: string;
}

// Helper function to calculate Julian Day
function getJulianDay(date: Date): number {
  const a = Math.floor((14 - (date.getMonth() + 1)) / 12);
  const y = date.getFullYear() + 4800 - a;
  const m = (date.getMonth() + 1) + 12 * a - 3;
  
  let jd = date.getDate() + Math.floor((153 * m + 2) / 5) + 365 * y + 
           Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  
  const hours = date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600;
  jd += (hours - 12) / 24;
  
  return jd;
}

// Calculate Sun position (simplified - for production use Swiss Ephemeris API)
function calculateSunPosition(jd: number): { longitude: number; latitude: number } {
  const T = (jd - 2451545.0) / 36525;
  
  // Mean longitude of Sun
  let L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
  L0 = L0 % 360;
  if (L0 < 0) L0 += 360;
  
  // Mean anomaly
  let M = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
  M = M % 360;
  if (M < 0) M += 360;
  
  const Mrad = M * Math.PI / 180;
  
  // Sun's equation of center
  const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(Mrad) +
            (0.019993 - 0.000101 * T) * Math.sin(2 * Mrad) +
            0.000289 * Math.sin(3 * Mrad);
  
  // True longitude
  let lambda = L0 + C;
  lambda = lambda % 360;
  if (lambda < 0) lambda += 360;
  
  return { longitude: lambda, latitude: 0 };
}

// Calculate Moon position (simplified - for production use Swiss Ephemeris API)
function calculateMoonPosition(jd: number): { longitude: number; latitude: number } {
  const T = (jd - 2451545.0) / 36525;
  
  // Moon's mean longitude
  let L = 218.3164477 + 481267.88123421 * T - 0.0015786 * T * T;
  L = L % 360;
  if (L < 0) L += 360;
  
  // Moon's mean elongation
  let D = 297.8501921 + 445267.1114034 * T - 0.0018819 * T * T;
  D = D % 360;
  
  // Sun's mean anomaly
  let M = 357.5291092 + 35999.0502909 * T;
  M = M % 360;
  
  // Moon's mean anomaly
  let Mp = 134.9633964 + 477198.8675055 * T;
  Mp = Mp % 360;
  
  const Drad = D * Math.PI / 180;
  const Mrad = M * Math.PI / 180;
  const Mprad = Mp * Math.PI / 180;
  
  // Main periodic terms (simplified)
  const correction = 
    6.288774 * Math.sin(Mprad) +
    1.274027 * Math.sin(2 * Drad - Mprad) +
    0.658314 * Math.sin(2 * Drad) +
    0.213618 * Math.sin(2 * Mprad);
  
  let longitude = L + correction;
  longitude = longitude % 360;
  if (longitude < 0) longitude += 360;
  
  return { longitude, latitude: 0 };
}

// Calculate planetary positions (simplified approximations)
// For production, replace with Swiss Ephemeris API calls
function calculatePlanetaryPositions(jd: number) {
  const T = (jd - 2451545.0) / 36525;
  
  // These are simplified approximations
  // For accurate calculations, use Swiss Ephemeris API
  const planets = {
    Mercury: { longitude: (252.25 + 149474.07 * T) % 360, latitude: 0 },
    Venus: { longitude: (181.98 + 58519.21 * T) % 360, latitude: 0 },
    Mars: { longitude: (355.43 + 19141.70 * T) % 360, latitude: 0 },
    Jupiter: { longitude: (34.35 + 3036.30 * T) % 360, latitude: 0 },
    Saturn: { longitude: (50.08 + 1223.51 * T) % 360, latitude: 0 },
  };
  
  // Normalize negative values
  Object.keys(planets).forEach(key => {
    if (planets[key as keyof typeof planets].longitude < 0) {
      planets[key as keyof typeof planets].longitude += 360;
    }
  });
  
  // Calculate Rahu (North Node) - simplified
  const omega = (125.04452 - 1934.136261 * T) % 360;
  const rahu = omega < 0 ? omega + 360 : omega;
  
  return {
    ...planets,
    Rahu: { longitude: rahu, latitude: 0 },
    Ketu: { longitude: (rahu + 180) % 360, latitude: 0 },
  };
}

// Calculate Ascendant (Rising Sign)
function calculateAscendant(jd: number, latitude: number, longitude: number): number {
  const T = (jd - 2451545.0) / 36525;
  
  // Calculate Local Sidereal Time
  const theta0 = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 
                 0.000387933 * T * T - T * T * T / 38710000;
  const LST = (theta0 + longitude) % 360;
  
  // Calculate obliquity of ecliptic
  const eps = 23.439291 - 0.0130042 * T;
  const epsRad = eps * Math.PI / 180;
  
  // Convert to radians
  const lstRad = LST * Math.PI / 180;
  const latRad = latitude * Math.PI / 180;
  
  // Calculate ascendant
  const y = -Math.cos(lstRad);
  const x = Math.sin(lstRad) * Math.cos(epsRad) + Math.tan(latRad) * Math.sin(epsRad);
  let asc = Math.atan2(y, x) * 180 / Math.PI;
  
  asc = asc % 360;
  if (asc < 0) asc += 360;
  
  return asc;
}

// Convert longitude to zodiac sign and degree
function getZodiacPosition(longitude: number): { sign: string; degree: string; house: number } {
  const signs = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];
  
  const normalizedLong = longitude % 360;
  const signIndex = Math.floor(normalizedLong / 30);
  const degreeInSign = normalizedLong % 30;
  const minutes = Math.floor((degreeInSign % 1) * 60);
  
  return {
    sign: signs[signIndex],
    degree: `${Math.floor(degreeInSign)}°${minutes}'`,
    house: signIndex + 1
  };
}

// Calculate house cusps using Placidus system
function calculateHouseCusps(asc: number): number[] {
  const houses = [asc];
  
  // Simplified house calculation (equal house system for simplicity)
  // For accurate Placidus calculations, use Swiss Ephemeris API
  for (let i = 1; i < 12; i++) {
    houses.push((asc + i * 30) % 360);
  }
  
  return houses;
}

// Distribute planets into houses
function distributePlanetsToHouses(planets: any, houseCusps: number[]) {
  const houses: { [key: number]: string[] } = {};
  
  // Initialize houses
  for (let i = 1; i <= 12; i++) {
    houses[i] = [];
  }
  
  // Place each planet in its house
  Object.entries(planets).forEach(([planet, pos]: [string, any]) => {
    const longitude = pos.longitude;
    
    // Find which house the planet is in
    for (let i = 0; i < 12; i++) {
      const currentCusp = houseCusps[i];
      const nextCusp = houseCusps[(i + 1) % 12];
      
      let isInHouse = false;
      if (nextCusp > currentCusp) {
        isInHouse = longitude >= currentCusp && longitude < nextCusp;
      } else {
        isInHouse = longitude >= currentCusp || longitude < nextCusp;
      }
      
      if (isInHouse) {
        houses[i + 1].push(planet);
        break;
      }
    }
  });
  
  return houses;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData: ChartRequest = await req.json();
    console.log('Calculating chart for:', requestData);

    // Parse date and time
    const birthDate = new Date(`${requestData.date}T${requestData.time}:00`);
    
    // Calculate Julian Day
    const jd = getJulianDay(birthDate);
    console.log('Julian Day:', jd);
    
    // Calculate planetary positions
    const sun = calculateSunPosition(jd);
    const moon = calculateMoonPosition(jd);
    const planets = calculatePlanetaryPositions(jd);
    
    // Calculate Ascendant
    const ascendant = calculateAscendant(jd, requestData.latitude, requestData.longitude);
    console.log('Ascendant:', ascendant);
    
    // Calculate house cusps
    const houseCusps = calculateHouseCusps(ascendant);
    
    // Combine all planetary positions
    const allPlanets = {
      Sun: sun,
      Moon: moon,
      ...planets,
    };
    
    // Convert to zodiac positions
    const planetaryData: any = {};
    Object.entries(allPlanets).forEach(([planet, pos]: [string, any]) => {
      const zodiacPos = getZodiacPosition(pos.longitude);
      planetaryData[planet] = zodiacPos;
    });
    
    // Distribute planets to houses
    const houses = distributePlanetsToHouses(allPlanets, houseCusps);
    
    const chartData = {
      houses,
      planets: planetaryData,
      ascendant: getZodiacPosition(ascendant),
      metadata: {
        birthDate: requestData.date,
        birthTime: requestData.time,
        location: {
          latitude: requestData.latitude,
          longitude: requestData.longitude,
        },
        timezone: requestData.timezone,
        calculationNote: "Using simplified astronomical algorithms. For production, integrate Swiss Ephemeris API for highest accuracy.",
      }
    };

    console.log('Chart calculated successfully');

    return new Response(JSON.stringify(chartData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error calculating chart:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        details: 'Failed to calculate birth chart'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
