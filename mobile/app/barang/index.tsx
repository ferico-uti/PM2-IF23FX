import { Colors } from "@/constants/color";
import { Strings } from "@/constants/strings";
import { styles } from "@/styles/styles";
import { formatRupiah } from "@/utils/scripts";
import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import {
  Button,
  Card,
  Dialog,
  FAB,
  Portal,
  Snackbar,
  Text,
  TextInput,
} from "react-native-paper";
import Feather from "react-native-vector-icons/Feather";

export default function BarangViewPage() {
  // buat react hook (useState)
  const [visible, setVisible] = useState(false);
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);

  const hideDialog = () => setVisible(false);
  const hideSnackbar = () => setVisibleSnackbar(false);

  // untuk menampung data barang
  const [data, setData] = useState<
    { id: number; kode: string; nama: string; harga: number; satuan: string }[]
  >([]);

  // untuk pencarian data barang
  const [searchData, setSearchData] = useState("");
  // untuk menyaring data barang
  const [filterData, setFilterData] = useState<typeof data>([]);
  // untuk simpan data id barang
  const [idBarang, setIdBarang] = useState(0);

  // buat react hook (useRef)
  const message = useRef("");
  const messageSnackbar = useRef("");

  // buat fungsi untuk pesan hapus data
  const messageDelete = (text: string) => {
    message.current = `Data Barang : ${text} Ingin Dihapus ?`;
  };

  // buat fungsi untuk menampilkan pesan snackbar
  const messageSnackbarDelete = (text: string) => {
    messageSnackbar.current = text;
  };

  // buat fungsi untuk hapus data
  const deleteData = async () => {
    try {
      const response = await axios.delete(
        `http://10.0.2.2:3001/api/barang/${idBarang}`
      );      
      // panggil fungsi messageSnackbarDelete
      messageSnackbarDelete(response.data.message);
    } finally {
      // tutup dialog
      hideDialog();
      // tampilkan snackbar
      setVisibleSnackbar(true);
    }
  };

  // react hook (useEffect)
  useEffect(() => {
    // panggil fungsi getData
    getData();

    // buat variabel untuk kata kunci pencarian
    // keyword belum mengabaikan spasi
    const keyword = searchData.toLowerCase().trim();
    // keyword sudah mengabaikan spasi
    const keywordCleanSpace = keyword.replace(/\s+/g, "");

    // jika kata kunci pencarian kosong
    if (keyword === "") {
      // ambil seluruh data barang
      setFilterData(data);
      // jika kata kunci pencarian diisi
    } else {
      // lakukan proses filter data
      const filtered = data.filter((item) => {
        // nama barang proses filter mengabaikan spasi
        const nama = item.nama.replace(/\s+/g, "").toLowerCase();
        // harga barang proses filter tidak mengabaikan spasi
        const harga = String(item.harga).toLowerCase();
        // tampikan hasil filter
        return nama.includes(keywordCleanSpace) || harga.includes(keyword);
      });
      // hasil filter disimpan di state
      setFilterData(filtered);
    }
  }, [data, searchData]);

  // react hook (useState)
  // daftarkan item model barang dan tipe data

  // buat fungsi untuk ambil data barang (GET)
  const getData = async () => {
    await axios
      .get(Strings.api_barang)
      .then(function (response) {
        // console.log(response.data.barang);
        setData(response.data.barang);
        setFilterData(response.data.barang);
      })
      .catch(function (error) {
        console.log(error);
      });

    // return response;
  };

  return (
    <View style={styles.frame}>
      <Text style={styles.title}>Tampil Data Barang</Text>
      {/* <Text style={[styles.title]}>Contoh CSS (Internal)</Text>
      <Text style={{ textAlign: "center", color: "red", backgroundColor: "yellow" }}>
        Halaman Tampil Data Barang
      </Text> */}

      {/* komponen search */}
      <View style={{ width: "100%" }}>
        <TextInput
          label="Cari Data Barang"
          // secureTextEntry
          right={
            <TextInput.Icon
              icon={() => (
                <Feather
                  name="search"
                  size={20}
                  color="gray"
                  onPress={() => console.log("Pressed")}
                />
              )}
            />
          }
          value={searchData}
          onChangeText={setSearchData}
          style={{ backgroundColor: Colors.white }}
        />
      </View>

      {/* komponen card / data */}
      {/* <Text>
        {data.map((item) => (
          <Text key={item.id}>{item.satuan}</Text>
        ))}
      </Text> */}

      {/* {data.map((item) => ( */}
      <FlatList
        data={filterData}
        style={{ width: "100%", backgroundColor: Colors.sponsor }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card key={item.id} style={styles.card}>
            <Card.Title title={item.nama} subtitle={formatRupiah(item.harga)} />
            <Card.Actions>
              <Button style={styles.card_button_secondary}>
                <Feather
                  name="edit-2"
                  size={20}
                  color="gray"
                  onPress={() => setVisible(false)}
                />
              </Button>
              <Button style={styles.card_button_primary}>
                <Feather
                  name="trash"
                  size={20}
                  color="white"
                  onPress={() => {
                    setVisible(true);
                    setIdBarang(item.id);
                    messageDelete(item.nama);
                  }}
                />
              </Button>
            </Card.Actions>
          </Card>
        )}
      />
      {/* ))} */}

      {/* komponen FAB  */}
      <FAB
        icon="plus"
        color={Colors.white}
        mode="flat"
        style={styles.fab}
        onPress={() => router.push("/barang/add")}
      />

      {/* komponen dialog */}
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Icon icon="alert" />
          <Dialog.Title>Informasi</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">{message.current}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={deleteData}>Ya</Button>
            <Button onPress={hideDialog}>Tidak</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* komponen snackbar */}
      <Snackbar visible={visibleSnackbar} onDismiss={hideSnackbar}>
        {messageSnackbar.current}
      </Snackbar>
    </View>
  );
}
