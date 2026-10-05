import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const html410 = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow, noarchive">
  <title>410 Gone - Page Permanently Removed | Phulwari</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #FFF7EC 0%, #FFE6EF 100%);
      color: #3F3A52;
      padding: 1.5rem;
    }
    .card {
      background: #ffffff;
      max-width: 520px;
      width: 100%;
      border-radius: 28px;
      padding: 3rem 2rem;
      text-align: center;
      box-shadow: 0 20px 40px rgba(63, 58, 82, 0.08);
      border: 1px solid rgba(255, 77, 141, 0.15);
    }
    .badge {
      display: inline-block;
      padding: 0.35rem 1rem;
      border-radius: 9999px;
      background: #FFE6EF;
      color: #FF4D8D;
      font-size: 0.85rem;
      font-weight: 700;
      margin-bottom: 1rem;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    h1 {
      font-size: 3.25rem;
      font-weight: 900;
      color: #FF4D8D;
      line-height: 1;
      margin-bottom: 0.5rem;
    }
    h2 {
      font-size: 1.35rem;
      font-weight: 800;
      color: #3F3A52;
      margin-bottom: 1rem;
    }
    p {
      color: #6B6480;
      font-size: 0.95rem;
      line-height: 1.6;
      margin-bottom: 2rem;
    }
    .links {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .btn-primary {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.9rem 1.8rem;
      background: #34B36B;
      color: #ffffff;
      text-decoration: none;
      border-radius: 9999px;
      font-weight: 700;
      font-size: 0.95rem;
      transition: transform 0.15s ease, box-shadow 0.15s ease;
      box-shadow: 0 6px 16px rgba(52, 179, 107, 0.3);
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 22px rgba(52, 179, 107, 0.4);
    }
    .btn-sub {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.75rem 1.5rem;
      background: #F0ECF8;
      color: #8B5CF6;
      text-decoration: none;
      border-radius: 9999px;
      font-weight: 700;
      font-size: 0.88rem;
      transition: background 0.15s ease;
    }
    .btn-sub:hover {
      background: #E5E0F4;
    }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">HTTP 410 Gone</span>
    <h1>410</h1>
    <h2>This Page Has Been Permanently Removed</h2>
    <p>The generic mother overview page at this address has been permanently retired and is no longer available. Please explore our specific programs below or return to the Phulwari home page.</p>
    <div class="links">
      <a href="/mothers-toddler-program-patna" class="btn-primary">Mother & Toddler Program</a>
      <a href="/mothers-fitness-zumba-patna" class="btn-sub">Mother Fitness & Zumba Classes</a>
      <a href="/yoga-classes-patna" class="btn-sub">Yoga & Wellness Classes</a>
      <a href="/" class="btn-sub">Return to Homepage</a>
    </div>
  </div>
</body>
</html>`;

export async function GET() {
  return new NextResponse(html410, {
    status: 410,
    statusText: 'Gone',
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}

export async function HEAD() {
  return new NextResponse(null, {
    status: 410,
    statusText: 'Gone',
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
