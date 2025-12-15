import { Colors } from '@/constants/color';
import { Strings } from '@/constants/strings';
import { styles } from '@/styles/styles';
import { filterHargaRaw, filterKode, filterNama, formatRibuan, formatRupiah } from '@/utils/scripts';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Keyboard, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Button, Snackbar, TextInput } from 'react-native-paper';

// buat array untuk data satuan
const satuan = [
    { label: "Unit", value: "UNIT" },
    { label: "Pcs", value: "PCS" },
    { label: "Kilogram", value: "KILOGRAM" },
];

// buat interface untuk dropdown satuan
interface DropdownItem {
    label: string;
    value: number;
}

export default function BarangEditPage() {
    // ambil nilai slug (id)
    const { index } = useLocalSearchParams();

    // buat state
    const [textKode, setTextKode] = useState("");
    const [textNama, setTextNama] = useState("");
    const [textHarga, setTextHarga] = useState("");
    const [textHargaRaw, setTextHargaRaw] = useState(0);
    // buat state untuk satuan
    const [textSatuan, setTextSatuan] = useState(null);

    // buat state untuk cek error (jika ada salah komponen tidak diisi)
    // bentuk state berupa objek  
    const [error, setError] = useState<{
        kode: boolean;
        nama: boolean;
        harga: boolean;
        satuan: boolean;
    }>({
        kode: false,
        nama: false,
        harga: false,
        satuan: false,
    });

    // buat state untuk snackbar
    const [visibleSnackbar, setVisibleSnackbar] = useState(false);
    // buat fungsi untuk hide snackbar
    const hideSnackbar = () => setVisibleSnackbar(false);

    // buat useRef untuk menampilkan respon ubah data
    const messageResponse = useRef("");

    // buat fungsi untuk menampilkan detail data berdasarkan slug (id)
    const detailData = useCallback(async () => {
        // panggil API detail barang
        try {
            const response = await axios.get(`${Strings.api_barang}/${index}`, {
                validateStatus: () => true,
            });

            // jika respon berhasil menampilkan data barang
            if (response.data.barang) {
                setTextKode(response.data.barang.kode);
                setTextNama(response.data.barang.nama);
                setTextHarga(formatRupiah(Number(response.data.barang.harga)));
                setTextHargaRaw(response.data.barang.harga);
                setTextSatuan(response.data.barang.satuan);
            }
            // jika respon gagal menampilkan data barang
            else {
                // alihkan ke halaman view
                router.replace("/barang");
            }
        } catch (err) {
            console.log("Gagal Menampilkan Data !", err);
        }
    }, [index]);

    // tampilkan detail data dengan useEffect
    useEffect(() => {
        detailData();
    }, [detailData]);

    // buat fungsi untuk ubah data
    const editData = async () => {
        // buat object errorStatus untuk menampung kondisi error setiap komponen
        const errorStatus = {
            kode: textKode === "",
            nama: textNama === "",
            harga: textHarga === "",
            satuan: textSatuan === null,
        };

        // update kondisi error setiap komponen
        setError(errorStatus);

        const hasError =
            errorStatus.kode ||
            errorStatus.nama ||
            errorStatus.harga ||
            errorStatus.satuan;

        // jika ada salah satu komponen tidak diisi
        if (hasError) {
            return;
        }

        // jika tidak error
        try {
            const response = await axios.put(`${Strings.api_barang}/${index}`, {
                kode: textKode,
                nama: textNama,
                harga: textHargaRaw,
                satuan: textSatuan,
            });

            // jika success == true
            if (response.data.success) {
                
                // hilangkan focus
                Keyboard.dismiss();

            }
            // isi respon
            messageResponse.current = response.data.message;
        }
        // jika terjadi error
        catch {
            // isi respon
            messageResponse.current = "Gagal Kirim Data !";
        }
        finally {
            // tampilkan snackbar
            setVisibleSnackbar(true);
        }
    }

    // buat fungsi untuk isi dropdown
    const renderItem = (item: DropdownItem) => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
                {item.value === textSatuan && (
                    <MaterialIcons
                        style={styles.icon}
                        name="check"
                        size={24}
                        color="black"
                    />
                )}
            </View>
        );
    };

    return (
        <View style={styles.frame}>
            {/* area header */}
            <View style={styles.header_area}>
                <MaterialIcons
                    name="arrow-back"
                    size={24}
                    style={styles.back_button}
                    onPress={() => {
                        router.back();
                    }}
                />

                <Text style={styles.header_title}>
                    Ubah Data Barang
                </Text>
            </View>

            {/* komponen kode barang */}
            <View style={styles.component_area}>
                <TextInput
                    label="Kode Barang"
                    value={textKode}
                    onChangeText={(text) => {
                        const result = filterKode(text);
                        setTextKode(result);
                    }}
                    style={{ backgroundColor: Colors.white }}
                />

                {/* tampilkan error jika kode barang belum diisi */}
                {error.kode && (
                    <View style={styles.error_area}>
                        <MaterialIcons
                            name="info-outline"
                            size={16}
                            color="#ff0000"
                        />
                        <Text style={styles.error}>
                            Kode Barang Harus Diisi !</Text>
                    </View>
                )}

            </View>

            {/* komponen nama barang */}
            <View style={styles.component_area}>
                <TextInput
                    label="Nama Barang"
                    value={textNama}
                    onChangeText={(text) => {
                        const result = filterNama(text);
                        setTextNama(result);
                    }}
                    style={{ backgroundColor: Colors.white }}
                />

                {/* tampilkan error jika nama barang belum diisi */}
                {error.nama && (
                    <View style={styles.error_area}>
                        <MaterialIcons
                            name="info-outline"
                            size={16}
                            color="#ff0000"
                        />
                        <Text style={styles.error}>
                            Nama Barang Harus Diisi !</Text>
                    </View>
                )}
            </View>

            {/* komponen harga barang */}
            <View style={styles.component_area}>
                <TextInput
                    label="Harga Barang"
                    value={textHarga}
                    onChangeText={(text) => {
                        const result = formatRibuan(text);
                        const result_raw = filterHargaRaw(text);
                        setTextHarga(result);
                        setTextHargaRaw(Number(result_raw));
                    }}
                    style={{ backgroundColor: Colors.white }}
                />

                {/* tampilkan error jika harga barang belum diisi */}
                {error.harga && (
                    <View style={styles.error_area}>
                        <MaterialIcons
                            name="info-outline"
                            size={16}
                            color="#ff0000"
                        />
                        <Text style={styles.error}>
                            Harga Barang Harus Diisi !</Text>
                    </View>
                )}
            </View>

            {/* komponen satuan barang */}
            <View style={styles.component_area}>
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={satuan}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Pilih Satuan Barang"
                    searchPlaceholder="Cari Data"
                    value={textSatuan}
                    onChange={(item) => {
                        setTextSatuan(item.value);
                    }}

                    renderItem={renderItem}
                />

                {/* tampilkan error jika satuan barang belum diisi */}
                {error.satuan && (
                    <View style={styles.error_area}>
                        <MaterialIcons
                            name="info-outline"
                            size={16}
                            color="#ff0000"
                        />
                        <Text style={styles.error}>
                            Satuan Barang Harus Dipilih !</Text>
                    </View>
                )}
            </View>

            {/* area tombol */}
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 20,
                    gap: 10,
                }}>
                <Button
                    icon="check"
                    mode="contained"
                    onPress={editData}>
                    Ubah
                </Button>

                <Button
                    icon="close"
                    mode="outlined"
                    onPress={() => router.back()}>
                    Batal
                </Button>
            </View>

            {/* area snackbar (respon simpan data) */}
            <Snackbar visible={visibleSnackbar} onDismiss={hideSnackbar}>
                {messageResponse.current}
            </Snackbar>

        </View>
    )
}
