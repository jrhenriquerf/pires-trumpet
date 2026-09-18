const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const root = process.cwd();
(async () => {
 const b = await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH || undefined});
 const page = await b.newPage({viewport:{width:1200,height:630},deviceScaleFactor:1});
 const photo = 'data:image/webp;base64,' + fs.readFileSync(path.join(root,'site-assets/hero.webp')).toString('base64');
 const logo = 'data:image/svg+xml;base64,' + fs.readFileSync(path.join(root,'site-assets/logo-white.svg')).toString('base64');
 const html = `<!doctype html><html><head><meta charset="utf-8"><style>*{box-sizing:border-box}body{margin:0;width:1200px;height:630px;background:#080909;color:#fff;overflow:hidden}.photo{position:absolute;right:0;top:0;width:720px;height:630px;object-fit:cover;object-position:70% center}.shade{position:absolute;inset:0;background:linear-gradient(90deg,#080909 0%,#080909 32%,rgba(8,9,9,.86) 43%,rgba(8,9,9,.12) 67%,rgba(8,9,9,.05) 100%)}.copy{position:absolute;left:70px;top:56px;width:650px}.logo{width:165px;height:77px;object-fit:contain;object-position:left center}.line{width:58px;height:3px;background:#c9a45d;margin:34px 0 27px}h1{font-family:Georgia,serif;font-size:80px;line-height:1.02;font-weight:400;letter-spacing:-3px;margin:0 0 28px}p{font-family:Arial,sans-serif;color:#d4bd8b;font-size:21px;letter-spacing:2.5px;margin:0}.footer{position:absolute;left:70px;bottom:47px;font:15px Arial,sans-serif;letter-spacing:3px;color:#ccc}.edge{position:absolute;bottom:0;left:0;right:0;height:6px;background:#c9a45d}</style></head><body><img class="photo" src="${photo}"><div class="shade"></div><div class="copy"><img class="logo" src="${logo}"><div class="line"></div><h1>Victor<br>Atanazio Pires</h1><p>PERFORMANCE · ENSINO · PESQUISA</p></div><div class="footer">PIRES TRUMPET · SITE OFICIAL</div><div class="edge"></div></body></html>`;
 await page.setContent(html);await page.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(img=>img.decode())));
 await page.screenshot({path:path.join(root,'assets/og/victor-pires-share.jpg'),type:'jpeg',quality:90});
 console.log('Created 1200x630 JPEG:',fs.statSync(path.join(root,'assets/og/victor-pires-share.jpg')).size,'bytes');
 await page.setContent(html.replace('PERFORMANCE · ENSINO · PESQUISA','PERFORMANCE · TEACHING · RESEARCH').replace('SITE OFICIAL','OFFICIAL WEBSITE')); await page.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(img=>img.decode()))); await page.screenshot({path:path.join(root,'assets/og/victor-pires-share-en.jpg'),type:'jpeg',quality:90}); await b.close();
})();

