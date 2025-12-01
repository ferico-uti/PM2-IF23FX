import { Colors } from "@/constants/color";
import { styles } from "@/styles/styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Button, TextInput } from "react-native-paper";

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
  const [textSatuan, setTextSatuan] = useState(null);

  // buat fungsi untuk isi dropdown
  const renderItem = (item: DropdownItem) => {
    return (
      <View style={styles_dropdown.item}>
        <Text style={styles_dropdown.textItem}>{item.label}</Text>
        {item.value === textSatuan && (
          <MaterialIcons
            style={styles_dropdown.icon}
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
      <Text style={styles.title}>Tambah Data Barang</Text>

      {/* komponen kode barang */}
      <View style={styles.component_area}>
        <TextInput
          label="Kode Barang"
          value={textKode}
          onChangeText={(text) => setTextKode(text)}
          style={{ backgroundColor: Colors.white }}
        />
      </View>

      {/* komponen nama barang */}
      <View style={styles.component_area}>
        <TextInput
          label="Nama Barang"
          value={textNama}
          onChangeText={(text) => setTextNama(text)}
          style={{ backgroundColor: Colors.white }}
        />
      </View>

      {/* komponen harga barang */}
      <View style={styles.component_area}>
        <TextInput
          label="Harga Barang"
          value={textHarga}
          onChangeText={(text) => setTextHarga(text)}
          style={{ backgroundColor: Colors.white }}
        />
      </View>

      {/* komponen satuan barang */}
      <View style={styles.component_area}>
        <Dropdown
          style={styles_dropdown.dropdown}
          placeholderStyle={styles_dropdown.placeholderStyle}
          selectedTextStyle={styles_dropdown.selectedTextStyle}
          inputSearchStyle={styles_dropdown.inputSearchStyle}
          iconStyle={styles_dropdown.iconStyle}
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
          //     style={styles_dropdown.icon}
          //     name="check"
          //     size={24}
          //     color="black"
          //   />
          // )}
          renderItem={renderItem}
        />
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
          onPress={() => console.log("Pressed")}>
          Simpan
        </Button>

        <Button
          icon="close"
          mode="outlined"
          onPress={() => router.back()}>
          Batal
        </Button>
      </View>
    </View>
  );
}
// setup internal style (untuk dropdown)
const styles_dropdown = StyleSheet.create({
  dropdown: {
    margin: 0,
    height: 50,
    backgroundColor: "white",
    borderRadius: 0,
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#a3a3a3",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.9,
    shadowRadius: 1.41,

    // elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
