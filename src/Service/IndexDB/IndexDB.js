import { openDB } from "idb";

export const dbPromise = openDB("jastipkuuy-db", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("user")) {
      db.createObjectStore("user", { keyPath: "id", autoIncrement: true });
    }
    if (!db.objectStoreNames.contains("produk")) {
      db.createObjectStore("produk", { keyPath: "id", autoIncrement: true });
    }
    if (!db.objectStoreNames.contains("keranjang")) {
      db.createObjectStore("keranjang", { keyPath: "id", autoIncrement: true });
    }
  },
});
