import axios from "axios";

export async function prosesPembayaran({ items, note, alamat, total, router }) {
  const userInfo = localStorage.getItem("user-info");
  if (!userInfo) {
    alert("User belum login!");
    return;
  }
  const userId = JSON.parse(userInfo).id;

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
  await axios.post("http://localhost:3000/pesanan", dataPesanan);

  for (const item of items) {
    await axios.delete(`http://localhost:3000/keranjang/${item.id}`);
  }

  localStorage.removeItem("checkout-items");
  alert(
    `Pesanan berhasil!\nTotal: Rp ${total.toLocaleString()}\nNote: ${note}\nAntar ke: ${alamat}`
  );
  if (router) router.push("/");
}
