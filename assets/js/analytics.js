// ============================================
// LIHKA.IN - Analytics Tracking System
// ============================================

const ANALYTICS_URL = 'https://script.google.com/macros/s/AKfycbzXdAXXbOH73Kk6CGxPLRyc4ikWkYEFQscP2_Vfn01f1C6OFhJQEKv1KtXUyrG9w0EV_w/exec';

// ============================================
// GET VISITOR LOCATION
// ============================================
async function getLocationData() {
  try {
    const res = await fetch('https://ipapi.co/json/');
    const d   = await res.json();
    return {
      country: d.country_name  || 'Unknown',
      state:   d.region        || 'Unknown',
      city:    d.city          || 'Unknown',
      ip:      d.ip            || 'Unknown',
      isp:     d.org           || 'Unknown'
    };
  } catch (e) {
    try {
      const r2 = await fetch('https://ip-api.com/json/');
      const d2 = await r2.json();
      return {
        country: d2.country    || 'Unknown',
        state:   d2.regionName || 'Unknown',
        city:    d2.city       || 'Unknown',
        ip:      d2.query      || 'Unknown',
        isp:     d2.isp        || 'Unknown'
      };
    } catch (e2) {
      return {
        country: 'Unknown',
        state:   'Unknown',
        city:    'Unknown',
        ip:      'Unknown',
        isp:     'Unknown'
      };
    }
  }
}

// ============================================
// DETECT DEVICE
// ============================================
function getDeviceType() {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua))                                          return 'Tablet';
  if (/mobile|android|iphone|ipod|blackberry|opera mini|iemobile/i.test(ua))          return 'Mobile';
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
    console.log('✅ Tracked:', payload.type, '-', payload.item);
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
      isp:       loc.isp,
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
      isp:       loc.isp,
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