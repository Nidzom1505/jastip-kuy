/**
 * @param {Array} produkList
 * @param {String} filterKategori
 * @returns {Array}
 */

export function filterMakananMinuman(produkList, filterKategori) {
    let hasil = produkList.filter(
        p => p.kategori === 'makanan' || p.kategori === 'minuman'
    );
    if (filterKategori) {
        hasil = hasil.filter(p => p.kategori === filterKategori);
    }
    return hasil;
}

export function filterCemilan(produkList) {
    return produkList.filter(p => p.kategori === 'cemilan');
}