
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const base = process.env.SITE_URL || 'http://127.0.0.1:5173';
const widths = [360, 390, 430, 768, 820, 1024, 1440, 1920];
const browser = await chromium.launch({ headless: true });
const results = [];
await mkdir('qa-growmatch-vecom', { recursive: true });

for (const width of widths) {
 const page = await browser.newPage({ viewport: { width, height: 940 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
 const errors = [];
 page.on('pageerror', e => errors.push(e.message));
 try {
  const res = await page.goto(base + '/du-an/dcg-growmatch#thanh-tich', { waitUntil: 'networkidle', timeout: 45000 });
  assert.equal(res.status(), 200);
  assert.equal(await page.locator('main h1').count(), 1, 'one page h1');
  assert.equal(await page.locator('#gm-title').innerText().then(x => x.includes('DCG GROWMATCH')), true);
  for (const id of ['gm-problem', 'gm-solution', 'gm-process', 'gm-product', 'gm-model', 'gm-team', 'thanh-tich', 'gm-vecom']) {
   assert.equal(await page.locator('#' + id).count(), 1, id + ' section');
  }
  assert.equal(await page.locator('.growmatch-award-figure').count(), 2, 'exactly two original award figures');
  assert.equal(await page.locator('.growmatch-award-title').innerText(), 'DCG GROWMATCH ghi dấu ấn tại CEO thời đại số');
  assert.equal(await page.locator('.growmatch-award-result').innerText(), 'Top 5 vòng chung kết');
  assert.equal(await page.locator('a.recognition-source').getAttribute('href'), 'https://ntt.edu.vn/nttu-tim-kiem-nha-quan-tri-tuong-lai-qua-cuoc-thi-ceo-thoi-dai-so/');
  assert.equal(await page.locator('img[src="/assets/recognition/NTTU_0058.jpeg"]').count(), 1);
  assert.equal(await page.locator('img[src="/assets/recognition/FBA1C8B9-ED38-42D6-8EF9-50CBECBFA44D.jpeg"]').count(), 1);
  const image = page.locator('.growmatch-award-figure').first().locator('img');
  await image.evaluate(async img => { img.loading = 'eager'; if (!img.complete) await new Promise((res, rej) => { img.onload=res; img.onerror=rej; }); await img.decode(); });
  assert.equal(await image.evaluate(img => img.naturalWidth), 1536);
  const metrics = await page.evaluate(() => ({
   overflow: document.documentElement.scrollWidth - innerWidth,
   header: !!document.querySelector('.site-header'),
   footer: !!document.querySelector('.site-footer'),
   articleText: document.querySelector('#thanh-tich')?.textContent.includes('Đưa bài toán nghề nghiệp đến sân chơi quản trị'),
   heroImg: document.querySelector('.gm-hero-visual img')?.getAttribute('src')
  }));
  assert.ok(metrics.overflow <= 2, 'horizontal overflow: ' + metrics.overflow);
  assert.ok(metrics.header && metrics.footer && metrics.articleText, 'shell and article preserved');
  assert.equal(metrics.heroImg, '/assets/projects/dcg-growmatch-real-website.webp');
  assert.deepEqual(errors, [], 'no JS runtime errors');
  if ([390, 820, 1440].includes(width)) await page.screenshot({ path: 'qa-growmatch-vecom/project-' + width + '.png', fullPage: true, animations: 'disabled' });
  results.push({ width, status: 'PASS', overflow: metrics.overflow });
  console.log('PASS', width);
 } catch (e) {
  results.push({ width, status: 'FAIL', error: e.message });
  await page.screenshot({ path: 'qa-growmatch-vecom/failure-' + width + '.png', fullPage: true }).catch(() => {});
  console.error('FAIL', width, e.message);
 } finally { await page.close(); }
}
await browser.close();
await writeFile('qa-growmatch-vecom/results.json', JSON.stringify(results, null, 2));
if (results.some(r => r.status === 'FAIL')) process.exitCode = 1;
