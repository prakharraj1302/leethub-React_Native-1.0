import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  StatusBar,
  Button,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
// import { useRouter } from "expo-router";
// import { getUsers } from "../../util/backend";
// import userDataLoad from "../../util/userDataLoad";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { ScrollView } from "react-native-gesture-handler";
// import { userDataLoad, deleteUser } from "../../util/userDataLoad";

const AVATAR_SIZE = 70;
const SPACING = 20;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

// const reLoadUsers = () => {
//   setIsLoading(true);
//   loadUsers();
// };
const UserList = ({ refresh, setRefresh }) => {
  // console.log("LOADING DATA");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [counter, update] = useState(0);
  //   const { data, isLoading } = userDataLoad();
  //   const [data, setData] = useState(null);
  //   const [isLoading, setLoading] = useState(false);
  //   const userDataLoad = () => {

  //-------------//-------------//-------------//-------------//-------------
  function deleteUser(userName) {
    // console.log("BEFORE", data);

    copy = [];
    for (u in data) {
      if (data[u].userName != userName) {
        copy.push(data[u]);
      }
    }
    setData(copy);
    // console.log(data);
    console.log("GLOBAL STATE ----", data);
    // updateListUI();
  }
  //-------------//-------------//-------------//-------------//-------------//-------------
  function toggleNotif(userName) {
    console.log("Toggle", userName);
    copy = [];
    for (u in data) {
      copy.push(data[u]);
    }
    for (u in copy) {
      if (copy[u].userName == userName) {
        copy[u].notifStatus = !copy[u].notifStatus;
      }
    }
    console.log(copy);
    setData(copy);
    // updateListUI();

    // reLoadUsers()
  }

  const loadUsers = async () => {
    var userData = null;
    try {
      const value = await AsyncStorage.getItem("@UserList");
      if (value !== null) {
      // if (true) {
        // value previously stored
        const jsonData = JSON.parse(value);

        const userListRaw =
          '{"userData":{"prakharraj1302":{"realName":"PrakharRajPandey","userAvatar":"https://assets.leetcode.com/users/avatars/avatar_1647532784.png","notifStatus":true},"gauravgarwa":{"realName":"GauravGarwa","userAvatar":"https://assets.leetcode.com/users/avatars/avatar_1673192364.png","notifStatus":true},"votrubac":{"realName":"Vlad","userAvatar":"https://assets.leetcode.com/users/votrubac/avatar_1610271695.png","notifStatus":true},"user7519am":{"realName":"","userAvatar":"https://assets.leetcode.com/users/avatars/avatar_1680455541.png","notifStatus":true}}}';

        // var jsonData = JSON.parse(userListRaw);

        // userData = jsonData;
        console.log("LOADED DATA -", jsonData);

        uiList = [];
        var user = jsonData["userData"];

        for (u in user) {
          var ele = {
            userName: u,
            realName: user[u]["realName"],
            userAvatar: user[u]["userAvatar"],
            notifStatus: user[u]["notifStatus"],
          };
          uiList.push(ele);
        }
        // console.log(uiList);
        setData(uiList);
      }
    } catch (e) {
      // error reading value
      console.log(e);
      alert("error ", e);
      return null;
    } finally {
      setIsLoading(false);
    }
    return userData;
  };

  async function updateListUI() {
    var uiList = data;
    var newJson = { userData: {} };

    // for (u in uiList) {
    //   console.log(u);
    //   // newJson['userData'][u[userName]] = {realName : realName , userAvatar: userAvatar}
    // }
    if (uiList != null) {
      for (i = 0; i < uiList.length; i++) {
        console.log(uiList[i]);
        newJson["userData"][uiList[i]["userName"]] = {
          realName: uiList[i]["realName"],
          userAvatar: uiList[i]["userAvatar"],
          notifStatus: uiList[i]["notifStatus"],
        };
      }
    }
    console.log("______ NEWJSON ", newJson);

    try {
      const value = JSON.stringify(newJson);
      await AsyncStorage.setItem("@UserList", value);
      console.log("SAVED BIO data ", value);
    } catch (e) {
      // saving error
      console.log(e);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);
  useEffect(() => {
    console.log("refershing -----------");

    reLoadUsers();
  }, [refresh]);

  useEffect(() => {
    update((counter) => counter + 1);
    updateListUI();
    console.log(
      "---------------------------DATA CHNGED------------------",
      counter
    );
  }, [data]);

  const reLoadUsers = () => {
    // updateListUI().then(()=> {
    setIsLoading(true);
    loadUsers();
    // })
  };

  // return { data, isLoading, reLoadUsers };
  //   };

  const ItemView = ({ item }) => (
    // <View style={styles.item}>

    // <TouchableWithoutFeedback>
    <View
      // style={styles.item}
      style={styles.itemView}
    >
      <Image
        style={{
          height: AVATAR_SIZE,
          width: AVATAR_SIZE,
          borderRadius: AVATAR_SIZE,
          marginRight: SPACING,
        }}
        source={{ uri: item.userAvatar }}
      />
      <View style={{ flexDirection: "column" }}>
        <Text style={styles.heading}>{item.realName}</Text>
        <Text style={styles.subHeading}>{item.userName}</Text>
        {/* {item.notifStatus ? <Text>YES</Text> : <Text>NO</Text>} */}
        <View
          style={{
            flexDirection: "row",
            paddingLeft: 5,
            paddingTop: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              toggleNotif(item.userName);
            }}
          >
              {item.notifStatus ? (
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "DMRegular",
                    width:"100%",
                    color: "ivory",
                    backgroundColor: "#4b9c4f",
                    fontWeight: "900",
                    padding: 10,
                    borderRadius: 100,
                    position: "relative",
                    textAlign:"center",
                  }}
                >
                  NOTIFY ON
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "DMRegular",
                    width:"100%",
                    color: "black",
                    backgroundColor: "gray",
                    padding: 10,
                    borderRadius: 100,
                    opacity: 0.5,
                    textAlign:"center",
                  }}
                >
                  NOTIFY OFF
                </Text>
              )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log(item.userName);
              deleteUser(item.userName);
            }}
          >
            <Text
              style={{
                fontSize: 12,
                paddingLeft: 15,
                backgroundColor: "red",
                fontWeight: "900",
                padding: 10,
                // margin: 20,
                marginLeft: 15,
                borderRadius: 100,

                // padding: 30,
                // borderRadius: 30
              }}
            >
              <Text
                style={{
                  // color: "black",
                  // backgroundColor: "#444978",
                  // padding: SPACING,
                  // paddingBottom: 20,
                  // margin: 10,
                  // borderRadius: 10,
                  // position: "relative",
                  color: "ivory",
                }}
              >
                DELETE
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    // </TouchableWithoutFeedback>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* <TouchableOpacity onPress={reLoadUsers}>
        <Text>REFRESH</Text>
      </TouchableOpacity> */}
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          contentContainerStyle={{ paddingTop:0, paddingBottom:550, padding: SPACING }}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          enableEmptySections={true}
          renderItem={ItemView}
        />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexGrow :1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  subTitle: {
    fontSize: 20,
  },
  heading: {
    fontFamily: "DMRegular",
    fontSize: 22,
    padding: 2,
    // fontweight: "700",
  },
  subHeading: {
    fontFamily: "DMRegular",
    fontSize: 16,
    opacity: 0.6,
    padding: 3,
  },
  itemView: {
    // backgroundColor: "#cbe38a",
    flexDirection: "row",
    padding: SPACING,
    paddingTop: 20,
    marginBottom: SPACING,
    // margin: 20,
    borderRadius: 50,
    borderColor:"#fffff",
    borderWidth:1,

    // shadowColor: "#fffff",

    // shadowOffset: {
    //   width: 100,
    //   height: 100,
    // },
    // shadowOpacity: 1,
    // shadowRadius: 10,
    // transform: [{ scale }],
  },
});
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     backgroundColor: "#ecf0f1",
//     padding: 0,
//   },
//   heading: {
//     fontSize: 22,
//     padding: "2px",
//     // fontweight: "700",
//   },
//   subHeading: {
//     fontSize: 16,
//     opacity: 0.6,
//     padding: "3px",
//   },
//   itemView: {
//     backgroundColor: "#fff",
//     flexDirection: "row",
//     padding: SPACING,
//     paddingTop: 20,
//     marginBottom: SPACING,
//     borderRadius: 15,
//     shadowColor: "#f0fcf3",
//     shadowOffset: {
//       width: 0,
//       height: 10,
//     },
//     shadowOpacity: 1,
//     shadowRadius: 5,
//     // transform: [{ scale }],
//   },
//   input: {
//     height: 40,
//     margin: 20,
//     borderWidth: 1,
//     padding: 10,
//     borderRadius: 5,
//     backgroundColor: "#00e8d",
//   },
//   FooterStyle: {
//     alignItems: "center",
//   },
// });

export { UserList };
