import axios from "axios";

class Produk {
  async getAll() {
    const res = await axios.get("http://localhost:3000/produk");
    return res.data;
  }

  async getKeranjang() {
    const userInfo = localStorage.getItem("user-info");
    const userId = JSON.parse(userInfo).id;
    const res = await axios.get(
      `http://localhost:3000/keranjang?userId=${userId}`
    );
    return res.data;
  }

  async addToKeranjang(produk) {
    const userInfo = localStorage.getItem("user-info");
    const userId = JSON.parse(userInfo).id;

    const cek = await axios.get(
      `http://localhost:3000/keranjang?produkId=${produk.id}&userId=${userId}`
    );
    if (cek.data.length === 0) {
      const { id, ...produkTanpaId } = produk;
      const res = await axios.post(`http://localhost:3000/keranjang`, {
        ...produkTanpaId,
        produkId: id,
        userId,
        quantity: 1,
      });
      return res.data;
    } else {
      const existing = cek.data[0];
      const res = await axios.patch(
        `http://localhost:3000/keranjang/${existing.id}`,
        { quantity: (existing.quantity || 1) + 1 }
      );
      return res.data;
    }
  }

  async removeFromKeranjang(id) {
    await axios.delete(`http://localhost:3000/keranjang/${id}`);
    return true;
  }

  async updateQtyKeranjang(id, quantity) {
    const res = await axios.patch(`http://localhost:3000/keranjang/${id}`, {
      quantity,
    });
    return res.data;
  }
}

export default new Produk();
