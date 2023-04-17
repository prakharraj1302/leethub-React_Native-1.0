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
  ToastAndroid,
  ActivityIndicator,
  SafeAreaView,
  Row,
  Column,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NotifPane } from "../NotifiPane/NotifPane";
// import { useRouter } from "expo-router";
// import { userNameValid } from "../../util/backend";
// import { reLoadUsers } from "../UserList/UserList";
// import { COLORS, FONT, SIZES } from "../../../constants";

const SearchBar = ({ refresh, setRefresh, isActive, setActive }) => {
  const [userName, onChangeText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function showToast(msg) {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  }
  useEffect(() => {
    showToast("SRCH BAR", isActive.toString());
  }, []);

  function showToast(msg) {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  }

  const getUserData = async (userName) => {
    var json = null;
    console.log("GET SUBB");
    var myHeaders = new Headers();
    myHeaders.append("referer", "https://leetcode.com/%s/votrubac");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Cookie",
      "csrftoken=2fh1J8fR3kqtgbptItZQ3tw7I92UAXxmW5VWQ5H5RkqLdEn83OI9Kn5IMCgrRz4Z"
    );

    var graphql = JSON.stringify({
      query:
        "query getUserProfile\r\n($username: String!) {\r\n    # allQuestionsCount { difficulty count }\r\n    matchedUser(username: $username) {\r\n        username\r\n        githubUrl\r\n        twitterUrl\r\n        linkedinUrl\r\n         contributions { points } \r\n         profile { \r\n             ranking      userAvatar      realName      aboutMe      school      websites      countryName      company      jobTitle      skillTags      postViewCount      postViewCountDiff      reputation      reputationDiff      solutionCount      solutionCountDiff      categoryDiscussCount      categoryDiscussCountDiff\r\n             } \r\n         activeBadge {\r\n            displayName\r\n            icon\r\n          }\r\n \r\n    } \r\n} ",
      variables: { username: userName },
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: graphql,
      redirect: "follow",
    };

    try {
      // setIsLoading(true);
      const response = await fetch(
        "https://leetcode.com/graphql/votrubac",
        requestOptions
      );
      json = await response.json();
      console.log("---- FETCH DATA- ", json);
    } catch (error) {
      console.error(e);
    } finally {
      // setIsLoading(false);
    }
    return json;
  };
  const appendUserList = async (userName, userData) => {
    console.log("append----");
    var list = null;
    try {
      const value = await AsyncStorage.getItem("@UserList");
      if (value !== null) {
        // existing
        console.log("existing---");
        // const jsonData = JSON.parse(value);
        jsonData = value;
        console.log(jsonData);
        list = jsonData;
        // return value;
      } else {
        console.log("initial---");
        const jsonTemplate = JSON.stringify({ userData: {} });
        list = jsonTemplate;
      }
    } catch (e) {
      // error reading value
      console.log(e);
      alert("error ");
      return null;
    }
    console.log("UPDATE BIO LIST");
    console.log(typeof list);
    var json = null;
    try {
      json = JSON.parse(list);
      // const json = list;
      console.log(json["userData"]);
      json["userData"][userName] = userData;
    } catch (e) {
      console.log(e, "in BIO updt");
    }
    try {
      const value = JSON.stringify(json);
      await AsyncStorage.setItem("@UserList", value);
      console.log("SAVED BIO data ", value);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  const userAddRoutine = async (userName) => {
    try {
      setIsLoading(true);
      const chk = await userNameValid(userName);
      if (chk) {
        const response = await getUserData(userName);
        console.log("RESPONSE RECEIVED");
        if (response !== null) {
          userData = {
            realName: response["data"]["matchedUser"]["profile"]["realName"],
            userAvatar:
              response["data"]["matchedUser"]["profile"]["userAvatar"],
            notifStatus: true,
          };
          console.log(userData);
          await appendUserList(userName, userData);
          console.log("USER ADDED", userName);
        } else {
          console.log("error in BIO fetch data");
        }
      } else {
        console.log("INVALID USER");
        alert(`Invalid Username - ${userName}`);
      }
    } catch (e) {
      alert("ERROR IN ADDING ", userName);
    } finally {
      setIsLoading(false);
    }
  };
  const userNameValid = async (userName) => {
    console.log("CHK userName", userName);
    var myHeaders = new Headers();
    myHeaders.append("referer", "https://leetcode.com/%s/votrubac");
    myHeaders.append("Content-Type", "application/json");
    // myHeaders.append(
    //   'Cookie',
    //   'csrftoken=2fh1J8fR3kqtgbptItZQ3tw7I92UAXxmW5VWQ5H5RkqLdEn83OI9Kn5IMCgrRz4Z'
    // );

    var graphql = JSON.stringify({
      query:
        "query getUserProfile($username: String!) {matchedUser(username: $username) {profile { realName}} } ",
      variables: { username: userName },
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: graphql,
      redirect: "follow",
    };

    try {
      setIsLoading(true);
      const response = await fetch(
        "https://leetcode.com/graphql/votrubac",
        requestOptions
      );
      const json = await response.json();
      if (json.hasOwnProperty("errors")) {
        showToast("false");
        return false;
      }
      showToast("true");
      return true;
    } catch (e) {
      console.log("FETCH ____ ERROR - ", e);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  function addUser() {
    // setIsLoading(true);

    console.log(userName);
    userAddRoutine(userName).then(() => {
      setRefresh((refersh) => !refersh);
    });

    // setIsLoading(false);
  }

  return (
    <View>
      <View style={styles.header}>
        <View
          style={{
            // backgroundColor:"black",
            // width: "100%",
            // marginTop: 15,
            // marginLeft: 15,
            // padding:10,
            // paddingBottom:20,
            // height:"100%",
            marginRight: 20,
            // marginBottom:20,
          }}
        >
          <Text style={styles.userName}>Hello Leetcoders;</Text>
          <Text style={styles.welcomeMessage}>
            {/* Track your friend's Submissions */}
            Get Notified of your friend's progress
          </Text>
        </View>
        {/* <View> */}
        <TouchableOpacity style={styles.infoBtn} >
          {/* <Text>ADD</Text> */}
          <Image
            source={require("../../assets/icon.png")}
            resizeMode="contain"
            style={{ flex: 0.9 }}
          />

          {/* <Image source={{ uri: '../../assets/icon.png'  }}/> */}
        </TouchableOpacity>
        {/* </View> */}
      </View>
      <Text style={styles.info}> {">> Swipe Right for Help"} </Text>
      <SafeAreaView>
        {/* <Row>
          <Column>
            <Text>Enter the username below,</Text>
          </Column>
          <Column>
            <Text>Click 'Add' to add the user</Text>
          </Column>
        </Row> */}
        <NotifPane isActive={isActive} setActive={setActive} />
      </SafeAreaView>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={userName}
            onChangeText={onChangeText}
            placeholder="username"
          />
        </View>
        {isLoading ? (
          <ActivityIndicator
            size={"large"}
            color={"#4b9c4f"}
            width={100}
            style={{ size: "large" }}
          />
        ) : (
          <TouchableOpacity style={styles.searchBtn} onPress={addUser}>
            <Text
              style={{
                color: "ivory",
                fontFamily: "DMRegular",
                // fontWeight:"900",
              }}
            >
              ADD
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {/* <TextInput
        // style={styles.input}
        placeholder="enter userid"
        // keyboardType="alphanumeric"
        onChangeText={onChangeText}
        value={userName}
      />
      <TouchableOpacity onPress={addUser}>
        <Text>USED ADD</Text>
      </TouchableOpacity> */}
    </View>
    //   <View style={styles.searchContainer}>
    //   <View style={styles.searchWrapper}>
    //   <Text>SearchBar</Text>
    //     {isLoading ? <ActivityIndicator /> : null}
    //     <TextInput
    //       style={styles.searchInput}
    //       value={userName}
    //       // onChangeText={(text) => setSearchTerm(text)}
    //       placeholder="username"
    //     />
    //   </View>

    //   <TouchableOpacity style={styles.searchBtn} onPress={addUser}>
    //     <Image
    //       // source={icons.search}
    //       resizeMode="contain"
    //       style={styles.searchBtnImage}
    //     />
    //   </TouchableOpacity>
    // </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: StatusBar.currentHeight || 0,
//   },
//   item: {
//     backgroundColor: "#f9c2ff",
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
//   title: {
//     fontSize: 32,
//   },
// });
const styles = StyleSheet.create({
  // container: {
  //   width: "100%",
  //   marginTop: "15px",
  // },
  info: {
    // paddingTop:30,
    // marginTop:40,
    fontFamily: "DMRegular",
    paddingLeft: 20,
    paddingBottom: 5,
  },
  logo: {
    height: 100,
    width: 100,
    // borderRadius: 100,
    // marginRight: 100,
  },
  userName: {
    marginLeft:40,
    // width:"70%",
    fontFamily: "DMRegular",
    fontSize: 24,
    color: "#444262",
  },
  welcomeMessage: {
    fontFamily: "DMBold",
    fontSize: 24,
    color: "#312651",
    marginLeft:40,
    // marginRight:10,
    // height:"100%",
    // marginTop: 2,
    // marginBottom:10,
    // paddingTop:20,
    // marginBottom:50,
    // padding:20,
    // paddingBottom:20,
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
    height: 50,
  },
  spinnerContainer: {
    // color:"ivory",
    width: 50,
    height: "100%",
    // backgroundColor: "#4b9c4f",
    size: "large",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width:"90%",
    // padding
    // backgroundColor: "#00000",
    // marginTop: 25,
    // marginLeft: 15,
    // marginRight: 15,
    marginBottom: 15,
    // height: 50,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: "#F3F4F8",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    height: "100%",
  },
  searchInput: {
    fontFamily: "DMRegular",
    width: "100%",
    height: "100%",
    paddingHorizontal: 16,
    // margin:10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 100,
  },
  searchBtn: {
    // color:"ivory",
    width: 50,
    height: "100%",
    backgroundColor: "#4b9c4f",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  infoBtn: {
    width: 60,
    height: 60,
    // backgroundColor: "#00000",
    borderColor: "#fffff",
    borderWidth: 1,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtnImage: {
    width: "50%",
    height: "50%",
    tintColor: "#F3F4F8",
  },
  // instructionList: {
  //   paddingTop: "20px",
  // },
});

// const styles = StyleSheet.create({
//   container: {
//     width: "100%",
//   },
//   userName: {
//     fontFamily: FONT.regular,
//     fontSize: SIZES.large,
//     color: COLORS.secondary,
//   },
//   welcomeMessage: {
//     fontFamily: FONT.bold,
//     fontSize: SIZES.xLarge,
//     color: COLORS.primary,
//     marginTop: 2,
//   },
//   searchContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "row",
//     marginTop: SIZES.large,
//     height: 50,
//   },
//   searchWrapper: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//     marginRight: SIZES.small,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: SIZES.medium,
//     height: "100%",
//   },
//   searchInput: {
//     fontFamily: FONT.regular,
//     width: "100%",
//     height: "100%",
//     paddingHorizontal: SIZES.medium,
//   },
//   searchBtn: {
//     width: 50,
//     height: "100%",
//     backgroundColor: COLORS.tertiary,
//     borderRadius: SIZES.medium,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   searchBtnImage: {
//     width: "50%",
//     height: "50%",
//     tintColor: COLORS.white,
//   },
//   tabsContainer: {
//     width: "100%",
//     marginTop: SIZES.medium,
//   }
// });

export default SearchBar;
