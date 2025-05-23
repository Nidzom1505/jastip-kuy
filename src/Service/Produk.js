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
      });
      return res.data;
    }
    return null;
  }

  async removeFromKeranjang(id) {
    await axios.delete(`http://localhost:3000/keranjang/${id}`);
    return true;
  }
}

export default new Produk();
