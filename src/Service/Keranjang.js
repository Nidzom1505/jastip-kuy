import axios from "axios";

class Keranjang {
  constructor() {
    this.url = "https://hereby-fixtures-dee-ended.trycloudflare.com/";
    this.token = localStorage.getItem("token");
  }

  async getKeranjang() {
    const res = await axios.get(`${this.url}api/cart`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    return res.data.data.items;
  }

  async addToKeranjang(produk) {
    const res = await axios.post(
      `${this.url}api/cart/items`,
      {
        product_id: produk.id,
        quantity: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );

    return res.data;
  }

  async removeFromKeranjang(itemId) {
    await axios.delete(`${this.url}api/cart/items/${itemId}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    return true;
  }

  async updateQtyKeranjang(itemId, quantity) {
    if (quantity < 1) {
      this.removeFromKeranjang(itemId);
      return true;
    } else {
      const res = await axios.put(
        `${this.url}api/cart/items/${itemId}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      return res.data;
    }
  }

  async bayar(data, router) {
    if (data.length === 0) {
      return alert(
        "Keranjang kosong, silakan tambahkan produk terlebih dahulu."
      );
    }

    localStorage.setItem("checkout-items", JSON.stringify(data));
    if (router) router.push("/bayar");
    return true;
  }
}

export default new Keranjang();
