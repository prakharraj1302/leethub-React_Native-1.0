import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import MainPage from "../components/MainPage/MainPage";
import SearchBar from "../components/SearchBar/SearchBar";
import { UserList } from "../components/UserList/UserList";
import { useEffect, useState } from "react";
import { NotifPane } from "../components/NotifiPane/NotifPane";
import { register } from "../util/job";
import { DrawerComponent } from "../components/Drawer/Drawer";
// import {setActiveState}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

const Home = () => {
  const [refresh, setRefresh] = useState(true);
  const [isActive, setActive] = useState(true);

  const  setActiveState = async () => {
    await registerForPushNotificationsAsync()
    console.log("ACTIVE STATE", isActive);
  };
  // function showToast(msg) {
  //   ToastAndroid.show(msg, ToastAndroid.SHORT);
  // }

  useEffect(() => {
    setActiveState();
    // showToast('HOME BAR', isActive);

    // register();
  }, []);

  return (
    <SafeAreaView>
      {/* <Text>HOME</Text> */}
      {/* <NotifPane isActive={isActive} setActive={setActive} /> */}
      <SearchBar
        refresh={refresh}
        setRefresh={setRefresh}
        isActive={isActive}
        setActive={setActive}
      />
      {/* <DrawerComponent /> */}
      <UserList refresh={refresh} setRefresh={setRefresh} />
    </SafeAreaView>
  );
};

export default Home;
