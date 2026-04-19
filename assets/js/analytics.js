// ============================================
// LIHKA.IN - Analytics Tracking System
// ============================================

const ANALYTICS_URL = 'https://script.google.com/macros/s/AKfycbz7Kmre78X3sZxoaQ2C3LrILRfsVQrg6pdK1DWeAjamonmx4MeVxI22fEJYiwesubp2Lw/exec';

// ============================================
// GET VISITOR LOCATION
// ============================================
async function getLocationData() {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return {
      country: data.country_name || 'Unknown',
      state:   data.region       || 'Unknown',
      city:    data.city         || 'Unknown',
      ip:      data.ip           || 'Unknown',
      isp:     data.org          || 'Unknown'
    };
  } catch (error) {
    // Try backup API
    try {
      const r2 = await fetch('https://ip-api.com/json/');
      const d2 = await r2.json();
      return {
        country: d2.country  || 'Unknown',
        state:   d2.regionName || 'Unknown',
        city:    d2.city     || 'Unknown',
        ip:      d2.query    || 'Unknown',
        isp:     d2.isp      || 'Unknown'
      };
    } catch(e) {
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
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'Tablet';
  if (/mobile|android|iphone|ipod|blackberry|opera mini|iemobile/i.test(ua)) return 'Mobile';
  return 'Desktop';
}

// ============================================
// SEND DATA TO GOOGLE SHEETS
// ============================================
async function sendToSheet(payload) {
  try {
    // Use Image beacon trick - works without CORS
    const jsonStr = JSON.stringify(payload);
    const encoded = encodeURIComponent(jsonStr);

    // Method 1: fetch with no-cors (sends data, can't read response - but data saves)
    fetch(ANALYTICS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: jsonStr
    });

    console.log('✅ Data sent:', payload.type, payload.item);
  } catch (error) {
    console.log('Send error:', error);
  }
}

// ============================================
// TRACK PAGE VIEW
// ============================================
async function trackPageView() {
  // Avoid tracking admin panel itself
  if (window.location.pathname.includes('admin')) return;

  try {
    const location = await getLocationData();

    await sendToSheet({
      type:      'visit',
      item:      document.title || window.location.pathname,
      page:      window.location.href,
      country:   location.country,
      state:     location.state,
      city:      location.city,
      ip:        location.ip,
      isp:       location.isp,
      device:    getDeviceType(),
      referrer:  document.referrer || 'Direct',
      userAgent: navigator.userAgent
    });
  } catch (error) {
    console.log('Page tracking error:', error);
  }
}

// ============================================
// TRACK DOWNLOAD
// ============================================
async function trackDownload(appName, downloadUrl) {
  try {
    const location = await getLocationData();

    await sendToSheet({
      type:      'download',
      item:      appName,
      page:      window.location.href,
      country:   location.country,
      state:     location.state,
      city:      location.city,
      ip:        location.ip,
      isp:       location.isp,
      device:    getDeviceType(),
      referrer:  document.referrer || 'Direct',
      userAgent: navigator.userAgent
    });
  } catch (error) {
    console.log('Download tracking error:', error);
  }

  // Always download even if tracking fails
  if (downloadUrl) {
    setTimeout(() => {
      window.location.href = downloadUrl;
    }, 600);
  }
}

// ============================================
// AUTO TRACK ON PAGE LOAD
// ============================================
window.addEventListener('load', function() {
  trackPageView();
});