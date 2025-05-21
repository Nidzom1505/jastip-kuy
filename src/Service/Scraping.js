import puppeteer from "puppeteer";

async function scrapeGofood() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  await page.goto("https://gofood.co.id/surabaya/restaurants/most_loved", {
    waitUntil: "networkidle2",
  });

  await page.waitForSelector("a.border-b");

  await autoScroll(page);

const hasil = await page.evaluate(() => {
  const data = [];
  const elemenRestoran = document.querySelectorAll('a.border-b');

  elemenRestoran.forEach(el => {
    const text = el.innerText.trim();
    const lines = text.split('\n').filter(l => l.trim() !== '');

    const rating = lines[0] || '';
    const alamat = lines[1] || '';
    const jenis_makanan = lines[2] || '';
    const link = el.href;

    data.push({ rating, jenis_makanan, alamat, link });
  });

  return data;
});

  console.log(hasil);
  await browser.close();
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= document.body.scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 200);
    });
  });
}

scrapeGofood();
