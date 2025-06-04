from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import datetime
import os
import pandas as pd

options = Options()
options.add_argument("--disable-gpu")
driver = webdriver.Chrome(options=options)

url = "https://food.grab.com/id/id/restaurant/yaudah-seafood-kebon-melati-delivery/6-C62GJTK1NNKJGE?"
driver.get(url)

time.sleep(10)

wait = WebDriverWait(driver, 10)
try:
    nama_resto = wait.until(EC.presence_of_element_located((By.TAG_NAME, 'h1'))).text
except:
    nama_resto = "NAMA TIDAK DITEMUKAN"

print("Nama Restoran:", nama_resto)

driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
time.sleep(5)

with open("grabfood_dump.html", "w", encoding="utf-8") as f:
    f.write(driver.page_source)

menu_cards = driver.find_elements(By.CLASS_NAME, 'itemNameTitle___1sFBq')
harga_cards = driver.find_elements(By.CLASS_NAME, 'discountedPrice___3MBVA')
# Ambil gambar menu (img di dalam parent menu)
gambar_cards = driver.find_elements(By.CSS_SELECTOR, '.itemNameTitle___1sFBq ~ div img')

print("Jumlah menu ditemukan:", len(menu_cards))
print("Jumlah harga ditemukan:", len(harga_cards))
print("Jumlah gambar ditemukan:", len(gambar_cards))

data = []
waktu_scraping = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

for i in range(len(menu_cards)):
    try:
        nama = menu_cards[i].text
        harga = harga_cards[i].text if i < len(harga_cards) else "Harga tidak ditemukan"
        # Ambil gambar, fallback ke "" jika tidak ada
        gambar = gambar_cards[i].get_attribute("src") if i < len(gambar_cards) else ""
        data.append([nama, harga, gambar, waktu_scraping])
    except Exception as e:
        print("Gagal parsing kartu:", e)
        continue

driver.quit()

# Pastikan folder hasil ada
hasil_dir = "src/Scraping/HasilGambar"
os.makedirs(hasil_dir, exist_ok=True)

# Cari nomor urut file berikutnya
base_filename = "menu_grabfood"
ext = ".csv"
i = 1
while True:
    csv_path = os.path.join(hasil_dir, f"{base_filename}_{i}{ext}")
    if not os.path.exists(csv_path):
        break
    i += 1

df = pd.DataFrame(data, columns=["Nama Makanan", "Harga", "Gambar", "Waktu Scraping"])
df.to_csv(csv_path, index=False)

print(f"Scraping selesai untuk '{nama_resto}'. Data disimpan ke '{csv_path}'")