import { dbPromise } from "./IndexDB";

class ProdukIDB {
  async getAll() {
    const db = await dbPromise;
    return db.getAll("produk");
  }

  async getKeranjang() {
    const userInfo = localStorage.getItem("user-info");
    if (!userInfo) return [];
    const userId = JSON.parse(userInfo).id;
    const db = await dbPromise;
    const all = await db.getAll("keranjang");
    return all.filter((item) => item.userId === userId);
  }

  async addToKeranjang(produk) {
    const userInfo = localStorage.getItem("user-info");
    if (!userInfo) return null;
    const userId = JSON.parse(userInfo).id;
    const db = await dbPromise;
    const all = await db.getAll("keranjang");

    const existing = all.find(
      (item) => item.produkId === produk.id && item.userId === userId
    );
    if (existing) {

      await db.put("keranjang", {
        ...existing,
        quantity: (existing.quantity || 1) + 1,
      });
      return true;
    } else {
      const { id, ...produkTanpaId } = produk;
      return db.add("keranjang", {
        ...produkTanpaId,
        produkId: id,
        userId,
        quantity: 1,
      });
    }
  }

  async removeFromKeranjang(id) {
    const db = await dbPromise;
    await db.delete("keranjang", id);
    return true;
  }

  async updateQtyKeranjang(id, quantity) {
    const db = await dbPromise;
    const item = await db.get("keranjang", id);
    if (item) {
      await db.put("keranjang", { ...item, quantity });
    }
  }
}

export default new ProdukIDB();
