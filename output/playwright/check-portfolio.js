async (page) => {
  await page.getByRole('switch').click();
  console.log('dark', await page.getByRole('switch').getAttribute('aria-checked'));
  await page.screenshot({path:'output/playwright/portfolio-dark.png'});
  await page.getByRole('switch').click();
  console.log('physics', await page.locator('.pe-playground').evaluate(el => ({class:el.className,height:el.clientHeight,first:el.firstElementChild.getAttribute('style')})));
  await page.getByRole('button', {name:'Data analysis', exact:true}).click();
  console.log('data projects', await page.locator('.pe-project').count());
  await page.getByRole('button', {name:'Web development', exact:true}).click();
  console.log('web projects', await page.locator('.pe-project').count());
  await page.screenshot({path:'output/playwright/portfolio-work.png'});
  await page.getByRole('button', {name:'Send a message', exact:true}).click();
  await page.locator('#contact-form-panel input').first().waitFor();
  console.log('contact inputs', await page.locator('#contact-form-panel input').count());
  await page.screenshot({path:'output/playwright/portfolio-contact.png'});
  await page.setViewportSize({width:390,height:844});
  await page.goto('http://127.0.0.1:8081/');
  await page.screenshot({path:'output/playwright/portfolio-mobile.png'});
  console.log('mobile widths', await page.evaluate(() => ({viewport:innerWidth, document:document.documentElement.scrollWidth})));
}
