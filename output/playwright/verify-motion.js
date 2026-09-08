async (page) => {
  await page.goto('http://127.0.0.1:8081/');
  await page.bringToFront();
  await page.locator('.has-physics').waitFor();
  const report = {};
  const sticker = page.locator('.pe-sticker').first();
  await page.waitForFunction(() => document.querySelector('.pe-sticker').getBoundingClientRect().top > 600, {timeout:10000});
  const box = await sticker.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(620, 640, {steps:20});
  await page.mouse.up();
  report.dragged = await sticker.getAttribute('style');
  await page.getByRole('button',{name:'Pause project gallery'}).click();
  const before = await page.locator('.pe-gallery-card').first().getAttribute('style');
  await page.screenshot({path:'output/playwright/portfolio-gallery.png'});
  report.galleryPaused = before === await page.locator('.pe-gallery-card').first().getAttribute('style');
  await page.getByRole('button',{name:'Play project gallery'}).click();
  await page.locator('#skills').evaluate(el => window.scrollTo({top:scrollY + el.getBoundingClientRect().top + 300,behavior:'instant'}));
  await page.waitForFunction(() => parseFloat(document.querySelector('.pe-expertise-track').style.transform.replace('translateX(', '')) < -100);
  report.horizontalTrack = await page.locator('.pe-expertise-track').getAttribute('style');
  await page.screenshot({path:'output/playwright/portfolio-expertise.png'});
  await page.goto('http://127.0.0.1:8081/');
  return report;
}
