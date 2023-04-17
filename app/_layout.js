import React, { useRef, useState, useCallback, useEffect } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import {
  Button,
  DrawerLayoutAndroid,
  Text,
  StyleSheet,
  View,
  FlatList,
  Alert,
  Linking,
  TouchableOpacity,
  Image,
} from "react-native";
import Home from "./home";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

// export const unstable_settings = {
//   // Ensure any route can link back to `/`
//   initialRouteName: "home",
// };

// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Button
//         onPress={() => navigation.navigate("Notifications")}
//         title="Go to notifications"
//       />
//     </View>
//   );
// }

// function NotificationsScreen({ navigation }) {
//   console.log("CONST $_-----------");
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Button onPress={() => navigation.goBack()} title="Go back home" />
//     </View>
//   );
// }
const CustomDrawer = () => {
  var drawer = null;
  // useEffect(() => {
  //   drawer = useRef(null);
  //   console.log("DRAWER CONST");
  //   try {
  //     drawer.current.openDrawer();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, []);

  const Footer = () => {
    return (
      <View style={styles.FooterStyle}>
        <Text>
          Made with love by -{" "}
          <Text
            style={styles.hyperlinkStyle}
            onPress={() => {
              Linking.openURL("https://gauravgarwa.vercel.app");
            }}
          >
            Gaurav
          </Text>
          <Text>{" | "}</Text>
          <Text
            style={styles.hyperlinkStyle}
            onPress={() => {
              Linking.openURL(
                "https://www.linkedin.com/in/prakhar-raj-pandey-1b4124238/"
              );
            }}
          >
            Prakhar
          </Text>
        </Text>
      </View>
    );
  };

  const NavigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <Text style={styles.appName}>LeeTracker</Text>
      {/* <TouchableOpacity onPress={() => drawer.current.closeDrawer()}> */}
      {/* <Text style={{ paddingTop: 30, color: "red" }}> Close </Text>
      </TouchableOpacity> */}
      <Text style={styles.heading}>Instructions to use the app</Text>
      <FlatList
        data={[
          { key: '1. To add a new user, Enter the username and click "Add."' },
          {
            key: "2. The list will display the entered username if it exists.",
          },
          {
            key: "3. To enable/disable app notifications, use the 'Notification ON/OFF' button.",
          },
          {
            key: "4. Use the 'Notify' button to control an individual's notification.",
          },
          // {
          //   key: "Keep the App in the background to get Notifications.",
          // },
        ]}
        renderItem={({ item }) => (
          <Text style={styles.paragraph}>{item.key}</Text>
        )}
        ListFooterComponent={Footer}
      />
      <Text style={styles.infoBackground}>Keep the App in the background to get Notifications.</Text>
    </View>
  );
  return <NavigationView />;
};
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <View
      style={{
        backgroundColor: "#fffff",
        flex: 1,
        // padding:10
      }}
    >
      <CustomDrawer />
    </View>
  );
}

const Layout = () => {
  const [fontsLoaded] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    // <Stack screenOptions={{ headerShown: false }} initialRouteName="home">
    //   <Stack.Screen name="home" />
    // </Stack>
    <NavigationContainer independent={true}>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{ headerShown: false }}
        initialRouteName="Home"
      >
        <Drawer.Screen name="Close" component={Home} />
        {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
      </Drawer.Navigator>
      {/* <Home /> */}
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    // fontFamily: "DMRegular",
    backgroundColor: "#fffff",
    flex: 1,
    padding: 10,
    paddingTop: 50,
  },
  navigationContainer: {
    backgroundColor: "#ecf0f1",
  },
  heading: {
    fontFamily: "DMRegular",
    fontSize: 20,
    paddingTop: 15,
    color: "#d9b504",
  },
  appName: {
    fontFamily: "DMRegular",
    fontSize: 45,
    paddingTop: 15,
    fontWeight: "300",
    color: "#014040",
  },
  paragraph: {
    fontFamily: "DMRegular",
    fontSize: 15,
    padding: 5,
    paddingTop: 10,
  },
  infoBackground: {
    fontFamily: "DMRegular",
    fontSize: 12,
    padding: 5,
    paddingTop: 10,
  },
  FooterStyle: {
    fontFamily: "DMRegular",
    width: "100%",
    backgroundColor: "#4b9c4f",
    paddingTop: 10,
    padding: 15,
    alignSelf: "center",
    borderRadius: 100,
    marginTop: 50,
  },
  hyperlinkStyle: {
    color: "blue",
  },
});

export default Layout;
