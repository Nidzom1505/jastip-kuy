/**
 * Sort produk berdasarkan harga.
 * @param {Array} produkList - Array produk.
 * @param {String} sortBy - 'termurah' | 'termahal' | ''
 * @returns {Array} Produk yang sudah diurutkan.
 */
export function sortProduk(produkList, sortBy) {
    if (sortBy === 'termurah') {
        return [...produkList].sort((a, b) => a.harga - b.harga);
    } else if (sortBy === 'termahal') {
        return [...produkList].sort((a, b) => b.harga - a.harga);
    }
    return produkList;
}