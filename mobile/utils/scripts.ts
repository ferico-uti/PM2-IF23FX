// buat fungsi untuk format ribuan (harga)
export const formatRupiah = (text: number) => {
    return text.toLocaleString("id-ID");
}