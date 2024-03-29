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

const Home = () => {
  const [refresh, setRefresh] = useState(true);
  const [isActive, setActive] = useState(true);

  const setActiveState = () => {
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
