import { dbPromise } from "./IndexDB";

export async function prosesPembayaran({ items, note, alamat, total, router }) {
  const userInfo = localStorage.getItem("user-info");
  if (!userInfo) {
    alert("User belum login!");
    return;
  }
  const userId = JSON.parse(userInfo).id;
  const db = await dbPromise;
  const dataPesanan = {
    userId,
    items: items.map((item) => ({
      id: item.id,
      nama: item.nama,
      harga: item.harga,
      quantity: item.quantity,
    })),
    note,
    alamat,
    total,
    tanggal: new Date().toISOString(),
  };
  await db.add("pesanan", dataPesanan);

  const tx = db.transaction("keranjang", "readwrite");
  const keranjangStore = tx.objectStore("keranjang");
  for (const item of items) {
    await keranjangStore.delete(item.id);
  }
  await tx.done;

  localStorage.removeItem("checkout-items");
  alert(
    `Pesanan berhasil!\nTotal: Rp ${total.toLocaleString()}\nNote: ${note}\nAntar ke: ${alamat}`
  );
  if (router) router.push("/");
}
