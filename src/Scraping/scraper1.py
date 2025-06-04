from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import datetime
import pandas as pd
import os

# Setup Chrome
options = Options()
options.add_argument("--disable-gpu")
options.add_argument("--headless")  # Aktifkan kalau tidak mau buka browser
driver = webdriver.Chrome(options=options)

url = "https://food.grab.com/id/id/restaurant/rica-rico-bika-ambon-plaza-surabaya-delivery/6-C36ARB6XLCLFCA?"
driver.get(url)

print("🔄 Membuka halaman...")
time.sleep(10)

# Ambil nama restoran
wait = WebDriverWait(driver, 10)
try:
    nama_resto = wait.until(EC.presence_of_element_located((By.TAG_NAME, 'h1'))).text
except:
    nama_resto = "NAMA TIDAK DITEMUKAN"

print("🏪 Nama Restoran:", nama_resto)

# Scroll agar semua gambar & menu termuat
driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
time.sleep(5)

# Ambil elemen
menu_cards = driver.find_elements(By.CLASS_NAME, 'itemNameTitle___1sFBq')
harga_cards = driver.find_elements(By.CLASS_NAME, 'discountedPrice___3MBVA')
desc_cards = driver.find_elements(By.CLASS_NAME, 'itemDescription___2cIzt')
gambar_cards = driver.find_elements(By.CLASS_NAME, 'realImage___2TyNE')

print(f"📦 {len(menu_cards)} menu, {len(harga_cards)} harga, {len(desc_cards)} deskripsi, {len(gambar_cards)} gambar")

data = []
waktu_scraping = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

for i in range(len(menu_cards)):
    try:
        # Scroll ke menu agar gambar muncul
        driver.execute_script("arguments[0].scrollIntoView();", menu_cards[i])
        time.sleep(0.5)

        nama = menu_cards[i].text
        harga = harga_cards[i].text if i < len(harga_cards) else "Harga tidak ditemukan"
        deskripsi = desc_cards[i].text if i < len(desc_cards) else "Deskripsi tidak ditemukan"
        gambar = gambar_cards[i].get_attribute("src") if i < len(gambar_cards) else "Gambar tidak ditemukan"

        data.append([nama, harga, deskripsi, gambar, waktu_scraping])
    except Exception as e:
        print("❌ Gagal parsing item:", e)
        continue

driver.quit()

# Simpan ke CSV
hasil_dir = "src/Scraping/Mall/Delta"
os.makedirs(hasil_dir, exist_ok=True)
base_filename = "menu_Rica_Rico_Bika_Ambon-Delta"
ext = ".csv"
i = 1
while True:
    csv_path = os.path.join(hasil_dir, f"{base_filename}_{i}{ext}")
    if not os.path.exists(csv_path):
        break
    i += 1

df = pd.DataFrame(data, columns=["Nama Makanan", "Harga", "Deskripsi", "Gambar", "Waktu Scraping"])
df.to_csv(csv_path, index=False, encoding="utf-8")

print(f"✅ Selesai scraping '{nama_resto}'. Data disimpan ke {csv_path}")