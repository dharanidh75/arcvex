#!/usr/bin/env node
/**
 * IndexNow Ping Script — arcvex.in
 * Run this after every deployment to notify Bing (and other engines) immediately.
 *
 * Usage:
 *   node scripts/ping-indexnow.js
 *
 * Or add to Vercel: Settings → Git → Deploy Hooks → create a webhook,
 * then call this script from your CI/CD pipeline after deployment.
 */

const KEY = '948c004543134ad4b8190f586a85994e';
const HOST = 'arcvex.in';

const URLS = [
  `https://${HOST}/`,
];

async function ping() {
  const body = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: URLS,
  });

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body,
    });
    console.log(`IndexNow ping status: ${res.status}`);
    if (res.status === 200) console.log('✅ Bing notified successfully');
    else if (res.status === 202) console.log('✅ Accepted (key not yet verified — will verify then index)');
    else console.log('⚠️  Unexpected response:', res.status);
  } catch (err) {
    console.error('❌ IndexNow ping failed:', err.message);
  }
}

ping();
