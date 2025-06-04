import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

async function scrapeGofoodMenu() {
  const browser = await puppeteer.launch({ headless: false }); // debug mode
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
  );
  await page.setViewport({ width: 1280, height: 800 });

  const url =
    "https://gofood.co.id/en/surabaya/restaurant/bebek-purnama-jl-embong-belimbing-c1baea20-677d-4ac6-9277-5dfc38c6ca48";
  await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

  // Handle pop-up jika ada
  try {
    await page.waitForSelector('button[class*="css"]', { timeout: 5000 });
    await page.click('button[class*="css"]');
    // Tunggu menu muncul, cek selector di browser jika gagal
    await new Promise((res) => setTimeout(res, 5000)); // lihat dulu di browser
  } catch (e) {}

  // Tunggu menu muncul, cek selector di browser jika gagal
  await new Promise((res) => setTimeout(res, 5000)); // lihat dulu di browser
  // Ganti selector di bawah jika perlu!
  await page.waitForSelector('section[data-testid="menu-section"]', {
    timeout: 60000,
  });
  // Ambil waktu scraping
  const now = new Date();
  const tanggal = now.toLocaleDateString("id-ID");
  const jam = now.toLocaleTimeString("id-ID");
  const timeStr = `${tanggal} ${jam}`;
  const tanggalFile = tanggal.replace(/\//g, "-");
  const jamFile = jam.replace(/:/g, "-");
  const filename = `gofood_menu_${tanggalFile}_${jamFile}.csv`;

  // Scraping menu: nama, harga, jenis, gambar
  const hasil = await page.evaluate(
    (url, timeStr) => {
      // Ambil semua section menu (kategori)
      const sections = document.querySelectorAll(
        'section[data-testid="menu-section"]'
      );
      const menuList = [];
      sections.forEach((section) => {
        // Cari judul kategori menu (biasanya di atas daftar menu)
        let jenis = "";
        // Coba cari judul kategori di parent sebelumnya
        let prev = section.previousElementSibling;
        while (prev) {
          if (prev.querySelector && prev.querySelector("h2, .font-bold")) {
            jenis =
              prev.querySelector("h2, .font-bold")?.innerText.trim() || "";
            break;
          }
          prev = prev.previousElementSibling;
        }
        // Jika tidak ketemu, coba cari di dalam section
        if (!jenis) {
          jenis =
            section.querySelector("h2, .font-bold")?.innerText.trim() || "";
        }

        // Ambil semua menu di dalam section
        section.querySelectorAll("div > div").forEach((menuDiv) => {
          const namaMenu =
            menuDiv.querySelector("div.font-semibold")?.innerText.trim() || "";
          const hargaMenu =
            menuDiv
              .querySelector("div.text-sm.text-gray-800")
              ?.innerText.trim() || "";
          const gambarMenu = menuDiv.querySelector("img")?.src || "";
          if (namaMenu) {
            menuList.push({
              namaMenu,
              hargaMenu,
              jenis,
              gambarMenu,
              url,
              time: timeStr,
            });
          }
        });
      });
      return menuList;
    },
    url,
    timeStr
  );

  // Buat folder Hasil jika belum ada
  const hasilDir = path.resolve("./src/Scraping/Hasil");
  if (!fs.existsSync(hasilDir)) {
    fs.mkdirSync(hasilDir, { recursive: true });
  }

  // Format CSV: Nama Menu, Harga, Jenis, Gambar, Link, Time
  const header = "Nama Menu,Harga,Jenis,Gambar,Link,Time\n";
  const rows = hasil
    .map(
      (menu) =>
        `"${menu.namaMenu.replace(/"/g, '""')}","${menu.hargaMenu.replace(
          /"/g,
          '""'
        )}","${menu.jenis.replace(/"/g, '""')}","${menu.gambarMenu}","${
          menu.url
        }","${menu.time}"`
    )
    .join("\n");
  const isiCSV = header + rows;

  // Simpan ke file
  fs.writeFileSync(path.join(hasilDir, filename), isiCSV, "utf-8");
  console.log(`Hasil scraping disimpan di: src/Scraping/Hasil/${filename}`);

  await browser.close();
}

scrapeGofoodMenu();
