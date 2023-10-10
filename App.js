import { Button, StyleSheet, Text, View } from "react-native";
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

const Stack = createNativeStackNavigator();

export default function App() {
  const auth = useSelector((state) => state.auth);

  const [loaded, setLoaded] = useState(false);

  const dispatch = useDispatch();

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
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="Loading"
              component={Loading}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
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
            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                headerShown: false,
                headerStyle: { backgroundColor: "#FFFFFF" },
              }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
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
