const crypto = require('crypto');
const https = require('https');
require('dotenv').config();

const api_secret = process.env.CLOUDINARY_API_SECRET;
const api_key = process.env.CLOUDINARY_API_KEY;
const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;

const timestamp = Math.round(new Date().getTime() / 1000);
const sign_str = `timestamp=${timestamp}${api_secret}`;
const signature = crypto.createHash('sha1').update(sign_str).digest('hex');

const boundary = '----Boundary' + Math.random().toString(16);
let body = '';
body += '--' + boundary + '\r\nContent-Disposition: form-data; name="api_key"\r\n\r\n' + api_key + '\r\n';
body += '--' + boundary + '\r\nContent-Disposition: form-data; name="timestamp"\r\n\r\n' + timestamp + '\r\n';
body += '--' + boundary + '\r\nContent-Disposition: form-data; name="signature"\r\n\r\n' + signature + '\r\n';
body += '--' + boundary + '\r\nContent-Disposition: form-data; name="file"\r\n\r\n' + 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==' + '\r\n';
body += '--' + boundary + '--\r\n';

const options = {
  host: 'api.cloudinary.com',
  path: `/v1_1/${cloud_name}/image/upload`,
  method: 'POST',
  headers: {
    'Content-Type': `multipart/form-data; boundary=${boundary}`,
    'Content-Length': Buffer.byteLength(body),
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
  }
};

const req = https.request(options, res => {
  console.log('Status Code:', res.statusCode);
  console.log('Headers:', res.headers);
  let resBody = '';
  res.on('data', c => resBody += c);
  res.on('end', () => {
    console.log('Body:', resBody);
  });
});

req.on('error', e => {
  console.error('Request Error:', e);
});

req.write(body);
req.end();
