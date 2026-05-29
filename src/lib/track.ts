// Client-side visitor tracker. Sends only browser-known details to /api/track;
// IP, geolocation, and timestamp are filled in server-side. No secrets here.

function getDeviceType(): string {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'Tablet';
  if (/mobile|iphone|ipod|android|blackberry|mini|windows\sce|palm/i.test(ua)) return 'Mobile';
  return 'Desktop';
}

function getBrowser(): string {
  const ua = navigator.userAgent;
  if (ua.includes('Edg')) return 'Edge';
  if (ua.includes('OPR') || ua.includes('Opera')) return 'Opera';
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Safari')) return 'Safari';
  return 'Unknown';
}

function getOS(): string {
  const ua = navigator.userAgent;
  if (/Android/i.test(ua)) return 'Android';
  if (/iPhone|iPad|iPod/i.test(ua)) return 'iOS';
  if (ua.includes('Windows')) return 'Windows';
  if (ua.includes('Mac')) return 'macOS';
  if (ua.includes('Linux')) return 'Linux';
  return 'Unknown';
}

export async function trackVisitor(): Promise<void> {
  try {
    // Once per browser session.
    if (sessionStorage.getItem('visitor_tracked')) return;
    sessionStorage.setItem('visitor_tracked', '1');

    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      body: JSON.stringify({
        device: getDeviceType(),
        browser: getBrowser(),
        os: getOS(),
        referrer: document.referrer || 'Direct',
        path: window.location.pathname,
      }),
    });
  } catch {
    // Tracking must never break the page.
  }
}
