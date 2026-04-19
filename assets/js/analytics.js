// ============================================
// LIHKA.IN - Analytics Tracking System
// ============================================

const ANALYTICS_URL = 'https://script.google.com/macros/s/AKfycbzXdAXXbOH73Kk6CGxPLRyc4ikWkYEFQscP2_Vfn01f1C6OFhJQEKv1KtXUyrG9w0EV_w/exec';

// ============================================
// GET ACCURATE LOCATION (GPS + IP Fallback)
// ============================================
async function getLocationData() {
  // Try GPS-based location first (most accurate)
  try {
    const gpsLocation = await getGPSLocation();
    if (gpsLocation.city !== 'Unknown') {
      console.log('✅ Using GPS location:', gpsLocation.city);
      return gpsLocation;
    }
  } catch (e) {
    console.log('GPS not available, using IP location');
  }

  // Fallback to IP-based location
  return getIPLocation();
}

// Get GPS-based location (requires user permission)
function getGPSLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject('Geolocation not supported');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          // Reverse geocoding using Nominatim (free, no API key needed)
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
            { headers: { 'User-Agent': 'Lihka.in Analytics' } }
          );
          const data = await res.json();

          if (data.address) {
            resolve({
              country: data.address.country || 'Unknown',
              state:   data.address.state || data.address.state_district || 'Unknown',
              city:    data.address.city || data.address.town || data.address.village || 'Unknown',
              ip:      'GPS-based',
              isp:     'GPS Location',
              method:  'GPS'
            });
            return;
          }
        } catch (err) {
          console.log('Geocoding error:', err);
        }

        // If geocoding fails, at least save coordinates
        resolve({
          country: 'Unknown',
          state:   'Unknown',
          city:    `GPS: ${lat.toFixed(2)},${lon.toFixed(2)}`,
          ip:      'GPS-based',
          isp:     'GPS Location',
          method:  'GPS'
        });
      },
      (error) => {
        reject('GPS permission denied');
      },
      {
        timeout: 10000,
        enableHighAccuracy: false
      }
    );
  });
}

// Get IP-based location (fallback)
async function getIPLocation() {
  // Try primary API
  try {
    const res = await fetch('https://ipapi.co/json/');
    const d   = await res.json();
    
    if (d.city && d.city !== 'Unknown') {
      return {
        country: d.country_name  || 'Unknown',
        state:   d.region        || 'Unknown',
        city:    d.city          || 'Unknown',
        ip:      d.ip            || 'Unknown',
        isp:     d.org           || 'Unknown',
        method:  'IP-API-1'
      };
    }
  } catch (e) {
    console.log('Primary IP API failed');
  }

  // Try secondary API
  try {
    const r2 = await fetch('https://ip-api.com/json/');
    const d2 = await r2.json();
    
    return {
      country: d2.country      || 'Unknown',
      state:   d2.regionName   || 'Unknown',
      city:    d2.city         || 'Unknown',
      ip:      d2.query        || 'Unknown',
      isp:     d2.isp          || 'Unknown',
      method:  'IP-API-2'
    };
  } catch (e2) {
    console.log('Secondary IP API failed');
  }

  // Last resort - try another free API
  try {
    const r3 = await fetch('https://ipwho.is/');
    const d3 = await r3.json();
    
    return {
      country: d3.country      || 'Unknown',
      state:   d3.region       || 'Unknown',
      city:    d3.city         || 'Unknown',
      ip:      d3.ip           || 'Unknown',
      isp:     d3.connection?.isp || 'Unknown',
      method:  'IP-API-3'
    };
  } catch (e3) {
    console.log('All IP APIs failed');
  }

  return {
    country: 'Unknown',
    state:   'Unknown',
    city:    'Unknown',
    ip:      'Unknown',
    isp:     'Unknown',
    method:  'Failed'
  };
}

// ============================================
// DETECT DEVICE
// ============================================
function getDeviceType() {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'Tablet';
  if (/mobile|android|iphone|ipod|blackberry|opera mini|iemobile/i.test(ua)) return 'Mobile';
  return 'Desktop';
}

// ============================================
// SEND DATA TO GOOGLE SHEETS
// ============================================
function sendToSheet(payload) {
  try {
    fetch(ANALYTICS_URL, {
      method:  'POST',
      mode:    'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload)
    });
    console.log('✅ Tracked:', payload.type, '-', payload.item, 'from', payload.city);
  } catch (err) {
    console.warn('Tracking failed:', err);
  }
}

// ============================================
// TRACK PAGE VIEW
// ============================================
async function trackPageView() {
  if (window.location.pathname.includes('admin')) return;

  try {
    const loc = await getLocationData();
    sendToSheet({
      type:      'visit',
      item:      document.title || window.location.pathname,
      page:      window.location.href,
      country:   loc.country,
      state:     loc.state,
      city:      loc.city,
      ip:        loc.ip,
      isp:       loc.isp + ' (' + loc.method + ')',
      device:    getDeviceType(),
      referrer:  document.referrer || 'Direct',
      userAgent: navigator.userAgent
    });
  } catch (err) {
    console.warn('Page track error:', err);
  }
}

// ============================================
// TRACK DOWNLOAD
// ============================================
async function trackDownload(appName, downloadUrl) {
  try {
    const loc = await getLocationData();
    sendToSheet({
      type:      'download',
      item:      appName,
      page:      window.location.href,
      country:   loc.country,
      state:     loc.state,
      city:      loc.city,
      ip:        loc.ip,
      isp:       loc.isp + ' (' + loc.method + ')',
      device:    getDeviceType(),
      referrer:  document.referrer || 'Direct',
      userAgent: navigator.userAgent
    });
  } catch (err) {
    console.warn('Download track error:', err);
  }

  // Always proceed with download
  if (downloadUrl) {
    setTimeout(() => { window.location.href = downloadUrl; }, 600);
  }
}

// ============================================
// AUTO TRACK ON PAGE LOAD
// ============================================
window.addEventListener('load', trackPageView);