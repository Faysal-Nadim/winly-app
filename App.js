import {
  Button,
  StatusBar,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./redux/store";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import * as Font from "expo-font";
import { MyTabs } from "./components/tab";
import { isUserLoggedIn } from "./redux/actions";
import { Login } from "./containers/login";
import { Profile } from "./containers/profile";
import { PaymentMethod } from "./containers/paymentMethod";
import { Wallet } from "./containers/wallet";
import { Tickets } from "./containers/tickets";
import { Notification } from "./containers/notification";
import { Verify } from "./containers/verify";
import { Register } from "./containers/register";
import { Loading } from "./components/loading";
import { Checkout } from "./containers/checkout";
import axiosInstance from "./redux/helpers/axios";
import { StripeProvider } from "@stripe/stripe-react-native";
import { Confirmation } from "./containers/confirmation";
import { FAQ } from "./containers/FAQ";
import { Offer } from "./containers/offer";
import { AboutUs } from "./containers/about-us";
import { Support } from "./containers/support";

const Stack = createNativeStackNavigator();

export default function App() {
  const auth = useSelector((state) => state.auth);

  const [loaded, setLoaded] = useState(false);
  const [key, setKey] = useState(false);

  const dispatch = useDispatch();

  const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, []);

  useEffect(() => {
    Font.loadAsync({
      Sora: require("./assets/fonts/Sora-Regular.ttf"),
      Sora: {
        uri: require("./assets/fonts/Sora-Regular.ttf"),
        display: Font.FontDisplay.FALLBACK,
      },
    }).then(() => {
      setLoaded(true);
    });
  }, []);

  return (
    <Provider store={store}>
      <MyStatusBar backgroundColor="#535353" barStyle="light-content" />
      <StripeProvider
        urlScheme="winly-app://Checkout"
        publishableKey="pk_live_51NJEroJp4qwBz4X7bqRX5zFVSlAbmP4H6eOaRgrNCMtcqF6NqGAV9ZdrFINYKalj1435cDNJqTDfurL3nBjwzxm000K1l78wMD"
      >
        <NavigationContainer>
          {auth.authenticate ? (
            <Stack.Navigator>
              <Stack.Screen
                name="MyTab"
                component={MyTabs}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Profile"
                component={Profile}
                options={{
                  headerTitle: "Profile Information",
                  headerStyle: { backgroundColor: "#FFFFFF" },
                  headerTitleAlign: "center",
                  headerTitleStyle: {
                    fontFamily: loaded ? "Sora" : null,
                  },
                }}
              />

              <Stack.Screen
                name="FAQ"
                component={FAQ}
                options={{
                  headerTitle: "FAQ Information",
                  headerStyle: { backgroundColor: "#FFFFFF" },
                  headerTitleAlign: "center",
                  headerTitleStyle: {
                    fontFamily: loaded ? "Sora" : null,
                  },
                }}
              />
              <Stack.Screen
                name="PaymentMethod"
                component={PaymentMethod}
                options={{
                  headerTitle: "Payment Methods",
                  headerStyle: { backgroundColor: "#FFFFFF" },
                  headerTitleAlign: "center",
                  headerTitleStyle: {
                    fontFamily: loaded ? "Sora" : null,
                  },
                }}
              />
              <Stack.Screen
                name="Checkout"
                component={Checkout}
                options={{
                  headerTitle: "Checkout",
                  headerStyle: { backgroundColor: "#FFFFFF" },
                  headerTitleAlign: "center",
                  headerTitleStyle: {
                    fontFamily: loaded ? "Sora" : null,
                  },
                }}
              />
              <Stack.Screen
                name="Wallet"
                component={Wallet}
                options={{
                  headerTitle: "Wallet",
                  headerStyle: { backgroundColor: "#FFFFFF" },
                  headerTitleAlign: "center",
                  headerTitleStyle: {
                    fontFamily: loaded ? "Sora" : null,
                  },
                }}
              />
              <Stack.Screen
                name="Ticket"
                component={Tickets}
                options={{
                  headerTitle: "Active Tickets",
                  headerStyle: { backgroundColor: "#FFFFFF" },
                  headerTitleAlign: "center",
                  headerTitleStyle: {
                    fontFamily: loaded ? "Sora" : null,
                  },
                }}
              />
              <Stack.Screen
                name="Notification"
                component={Notification}
                options={{
                  headerTitle: "Notification",
                  headerStyle: { backgroundColor: "#FFFFFF" },
                  headerTitleAlign: "center",
                  headerTitleStyle: {
                    fontFamily: loaded ? "Sora" : null,
                  },
                }}
              />
              <Stack.Screen
                name="Support"
                component={Support}
                options={{
                  headerTitle: "Support Center",
                  headerStyle: { backgroundColor: "#FFFFFF" },
                  headerTitleAlign: "center",
                  headerTitleStyle: {
                    fontFamily: loaded ? "Sora" : null,
                  },
                }}
              />
              <Stack.Screen
                name="Offer"
                component={Offer}
                options={{
                  headerTitle: "Offers",
                  headerStyle: { backgroundColor: "#FFFFFF" },
                  headerTitleAlign: "center",
                  headerTitleStyle: {
                    fontFamily: loaded ? "Sora" : null,
                  },
                }}
              />
              <Stack.Screen
                name="Confirmation"
                component={Confirmation}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="AboutUs"
                component={AboutUs}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator>
              {/* <Stack.Screen
                name="Loading"
                component={Loading}
                options={{
                  headerShown: false,
                }}
              /> */}
              <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Register"
                component={Register}
                options={{
                  headerShown: false,
                  headerStyle: { backgroundColor: "#FFFFFF" },
                }}
              />
              <Stack.Screen
                name="Verify"
                component={Verify}
                options={{
                  headerShown: false,
                  headerStyle: { backgroundColor: "#FFFFFF" },
                }}
              />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </StripeProvider>
      <Toast />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
