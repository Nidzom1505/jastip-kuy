import axios from "axios";

class Produk {
  async getAll() {
    const res = await axios.get("http://localhost:3000/produk");
    return res.data;
  }

  async getAllProduk2() {
    const res = await axios.get("http://localhost:3000/produk2");
    return res.data;
  }

  async getKeranjang() {
    const res = await axios.get(`http://localhost:3000/keranjang`);
    return res.data;
  }

  async addToKeranjang(produk) {
    const cek = await axios.get(
      `http://localhost:3000/keranjang?id=${produk.id}`
    );
    if (cek.data.length === 0) {
      const { id, ...produkTanpaId } = produk;
      const res = await axios.post(`http://localhost:3000/keranjang`, {
        ...produkTanpaId,
        produkId: id,
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