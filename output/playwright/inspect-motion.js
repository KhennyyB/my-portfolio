async (page) => {
  return await page.evaluate(() => ({hidden:document.hidden,visibility:document.visibilityState,reduced:matchMedia('(prefers-reduced-motion: reduce)').matches,delta:performance.now()}));
}
