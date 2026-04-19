// ============================================
// LIHKA.IN - Analytics Tracking System
// ============================================

const ANALYTICS_URL = 'https://script.google.com/macros/s/AKfycbz7Kmre78X3sZxoaQ2C3LrILRfsVQrg6pdK1DWeAjamonmx4MeVxI22fEJYiwesubp2Lw/exec';

// Get visitor location data
async function getLocationData() {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return {
      country: data.country_name || 'Unknown',
      state: data.region || 'Unknown',
      city: data.city || 'Unknown',
      ip: data.ip || 'Unknown',
      isp: data.org || 'Unknown'
    };
  } catch (error) {
    return {
      country: 'Unknown',
      state: 'Unknown',
      city: 'Unknown',
      ip: 'Unknown',
      isp: 'Unknown'
    };
  }
}

// Track page visit
async function trackPageView() {
  try {
    const location = await getLocationData();
    const pageData = {
      type: 'visit',
      item: document.title || window.location.pathname,
      page: window.location.href,
      country: location.country,
      state: location.state,
      city: location.city,
      ip: location.ip,
      isp: location.isp,
      userAgent: navigator.userAgent,
      device: getDeviceType(),
      referrer: document.referrer || 'Direct'
    };

    await fetch(ANALYTICS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pageData)
    });

    console.log('✅ Page view tracked');
  } catch (error) {
    console.log('Tracking error:', error);
  }
}

// Track download
async function trackDownload(appName, downloadUrl) {
  try {
    const location = await getLocationData();
    const downloadData = {
      type: 'download',
      item: appName,
      page: window.location.href,
      country: location.country,
      state: location.state,
      city: location.city,
      ip: location.ip,
      isp: location.isp,
      userAgent: navigator.userAgent,
      device: getDeviceType(),
      referrer: document.referrer || 'Direct'
    };

    await fetch(ANALYTICS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(downloadData)
    });

    console.log('✅ Download tracked:', appName);
  } catch (error) {
    console.log('Download tracking error:', error);
  }

  // Always proceed with download even if tracking fails
  if (downloadUrl) {
    setTimeout(() => {
      window.location.href = downloadUrl;
    }, 500);
  }
}

// Detect device type
function getDeviceType() {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'Tablet';
  if (/mobile|android|iphone|ipod|blackberry|opera mini|iemobile/i.test(ua)) return 'Mobile';
  return 'Desktop';
}

// Auto track on page load
window.addEventListener('load', function () {
  trackPageView();
});