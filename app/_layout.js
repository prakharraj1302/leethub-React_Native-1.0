import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import Home from "./home";
// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "home",
};

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
    <Home/>
  );
};

export default Layout;
