import CustomHeader from "@/components/custom/CustomHeader";
import { Colors } from "@/constants/color";
import { Strings } from "@/constants/strings";
import { styles } from "@/styles/styles";
import { filterHargaRaw, filterKode, filterNama, formatRibuan } from "@/utils/scripts";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import axios from "axios";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Button, Snackbar, TextInput } from "react-native-paper";

// buat array untuk data satuan
const satuan = [
  { label: "Unit", value: "UNIT" },
  { label: "Pcs", value: "PCS" },
  { label: "Kilogram", value: "KILOGRAM" },
];

// buat interface untuk dropdown
interface DropdownItem {
  label: string;
  value: number;
}

export default function BarangAddPage() {
  // buat state
  const [textKode, setTextKode] = useState("");
  const [textNama, setTextNama] = useState("");
  const [textHarga, setTextHarga] = useState("");
  const [textHargaRaw, setTextHargaRaw] = useState(0);
  // buat state untuk satuan
  const [textSatuan, setTextSatuan] = useState(null);

  // buat state untuk snackbar
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);

  // buat useRef untuk menampilkan respon simpan data
  const messageResponse = useRef("");

  // buat useRef untuk focus ke TextInput Kode Barang
  const refFocus = useRef<any>(null);

  // buat fungsi untuk hide snackbar
  const hideSnackbar = () => setVisibleSnackbar(false);

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

  // buat fungsi untuk simpan data
  const saveData = async () => {
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
      const response = await axios.post(Strings.api_barang, {
        kode: textKode,
        nama: textNama,
        harga: textHargaRaw,
        satuan: textSatuan,
      });

      // jika success == true
      if (response.data.success) {
        // reset form
        setTextKode("");
        setTextNama("");
        setTextHarga("");
        setTextHargaRaw(0);
        setTextSatuan(null);

        // pilih salah 1 opsi berikut setelah simpan data berhasil
        // 1. hilangkan focus
        // Keyboard.dismiss();
        // 2. alihkan focus ke TextInput Kode Barang
        refFocus.current.focus();

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
      {/* panggil reusable component CustomHeader 
          (components/custom/CustomHeader.tsx)
      */}
      <CustomHeader title="Tambah Data Barang" iconBack={true} />

      {/* komponen kode barang */}
      <View style={styles.component_area}>
        <TextInput
          label="Kode Barang"
          value={textKode}
          ref={refFocus}
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
          // renderLeftIcon={() => (
          //   <MaterialIcons
          //     style={styles.icon}
          //     name="check"
          //     size={24}
          //     color="black"
          //   />
          // )}
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
          onPress={saveData}>
          Simpan
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
  );
}

