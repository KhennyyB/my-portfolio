async (page) => {
  const results = [];
  for (const width of [1280, 390]) {
    await page.setViewportSize({width,height:844});
    for (const position of ['first', 'last']) {
      await page.goto('http://127.0.0.1:8081/');
      await page.getByRole('link', {name:'Get in touch',exact:true})[position]().click();
      await page.locator('#contact-form-panel form input').first().waitFor({state:'visible'});
      await page.waitForFunction(() => {
        const top = document.querySelector('#contact-form-panel input').getBoundingClientRect().top;
        return top > 0 && top < innerHeight;
      });
      results.push({width,position,url:page.url(),visible:await page.locator('#contact-form-panel form').isVisible()});
    }
  }
  return results;
}
