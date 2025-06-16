import axios from "axios";

export async function prosesPembayaran({ items, note, alamat, total, router }) {
  const url = "https://hereby-fixtures-dee-ended.trycloudflare.com/";
  const token= localStorage.getItem("token");

  if (!token) {
    alert("User belum login!");
    return;
  }

  const dataPesanan = {
    items: items.map((item) => ({
      product_id: item.product.id,
      quantity: item.quantity,
    })),
    note,
    tujuan: alamat,
  };

  try {
    await axios.post(`${url}api/orders`, dataPesanan, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    for (const item of items) {
      await axios.delete(`${url}api/cart/items/${item.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    localStorage.removeItem("checkout-items");

    alert(
      `Pesanan berhasil!\nTotal: Rp ${total.toLocaleString()}\nNote: ${note}\nAntar ke: ${alamat}`
    );

    if (router) router.push("/");
  } catch (error) {
    console.error(error);
    alert("Gagal memproses pesanan");
  }
}
