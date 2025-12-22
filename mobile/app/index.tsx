import React, { useEffect } from "react";
import BarangViewPage from "./barang";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// setup notifikasi
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


export default function HomePage() {
  // berikan izin notifikasi (untuk android)
  useEffect(() => {
    const initNotification = async () => {
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
        });
      }

      await Notifications.requestPermissionsAsync();
    };

    initNotification();
  }, []);


  return <BarangViewPage />;
}
