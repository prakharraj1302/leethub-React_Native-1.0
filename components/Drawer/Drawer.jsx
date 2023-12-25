import React, { useRef, useState, useCallback, useEffect } from "react";
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

const Drawer = () => {
  var drawer = null;
  useEffect(() => {
     drawer = useRef(null);
    console.log("DRAWER CONST");
    try{
      drawer.current.openDrawer();
    }catch(e){
      console.log(e);
    }
  }, []);
  

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
              Linking.openURL("https://linkedin.com");
            }}
          >
            Prakhar
          </Text>
        </Text>
      </View>
    );
  };

  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <TouchableOpacity onPress={() => drawer.current.closeDrawer()}>
        <Text style={{ paddingTop: 30, color: "red" }}> Close </Text>
      </TouchableOpacity>
      <Text style={styles.heading}>Instructions to use the app</Text>
      <FlatList
        data={[
          { key: "1. Enter user name in the input box." },
          { key: "2. Click 'Add' to add a new user." },
          { key: "3. If the user exist you will see the details. " },
          { key: "4. Click notify to manage notifications." },
        ]}
        renderItem={({ item }) => (
          <Text style={styles.paragraph}>{item.key}</Text>
        )}
        ListFooterComponent={Footer}
      />
    </View>
  );
  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={330}
      renderNavigationView={navigationView}
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={() => drawer.current.openDrawer()}>
          <Text style={{ padding: 20 }}> Help </Text>
          <Text>HELLO</Text>
        </TouchableOpacity>
      </View>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#fffff",
    flex: 1,
    padding: 100,

  },
  navigationContainer: {
    backgroundColor: "#ecf0f1",
  },
  heading: {
    fontSize: 24,
    paddingTop: 15,
    color: "blue",
  },
  paragraph: {
    fontSize: 18,
    padding: 5,
    paddingTop: 10,
  },
  FooterStyle: {
    width: 280,
    backgroundColor: "#00de8d",
    paddingTop: 10,
    padding: 15,
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 50,
  },
  hyperlinkStyle: {
    color: "blue",
  },
});

export {Drawer};
