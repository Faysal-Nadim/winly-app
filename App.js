import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { MyTabs } from "./components/tabs";
// import { Login } from "./components/login";
// import { Provider, useDispatch, useSelector } from "react-redux";
// import store from "./store";
import { useEffect, useState } from "react";
// import { isUserLoggedIn } from "./actions";
// import { Product } from "./components/product";
// import { ProductHeader } from "./components/product.header";
// import { Signup } from "./components/signup";
import Toast from "react-native-toast-message";
// import { Verify } from "./components/verify";
// import { Checkout } from "./components/checkout";
// import { Payment } from "./components/payment";
// import { Orderplaced } from "./components/orderplaced";
// import { Order } from "./components/order";
// import { OrderDetails } from "./components/orderdetails";
import * as Font from "expo-font";
import { Home } from "./containers/home";
import { MyTabs } from "./components/tab";
// import { Address } from "./components/address";

const Stack = createNativeStackNavigator();

export default function App() {
  // const auth = useSelector((state) => state.auth);
  const [loaded, setLoaded] = useState(false);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (!auth.authenticate) {
  //     dispatch(isUserLoggedIn());
  //   }
  // }, []);

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
    // <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MyTab"
          component={MyTabs}
          options={{
            headerShown: false,
          }}
        />
        {/* <Stack.Screen
            name="Product"
            options={{
              headerTitle: ProductHeader,
              headerStyle: { backgroundColor: "#f2f2f2" },
            }}
            component={Product}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
              headerStyle: { backgroundColor: "#FFFFFF" },
            }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
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
          <Stack.Screen
            name="Checkout"
            component={Checkout}
            options={{
              // headerShown: false,
              headerStyle: { backgroundColor: "#FFFFFF" },
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontFamily: loaded ? "Montserrat-Medium" : null,
              },
            }}
          />
          <Stack.Screen
            name="Payment"
            component={Payment}
            options={{
              headerShown: false,
              headerStyle: { backgroundColor: "#FFFFFF" },
            }}
          />
          <Stack.Screen
            name="Orders"
            component={Order}
            options={{
              // headerShown: false,

              headerStyle: { backgroundColor: "#FFFFFF" },
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontFamily: loaded ? "Montserrat-Medium" : null,
              },
            }}
          />
          <Stack.Screen
            name="Orderplaced"
            component={Orderplaced}
            options={{
              headerShown: false,
              headerStyle: { backgroundColor: "#FFFFFF" },
            }}
          />
          <Stack.Screen
            name="Order Details"
            component={OrderDetails}
            options={{
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontFamily: loaded ? "Montserrat-Medium" : null,
              },
            }}
          />
          <Stack.Screen
            name="Address"
            component={Address}
            options={{
              // headerShown: false,
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontFamily: loaded ? "Montserrat-Medium" : null,
              },
            }}
          /> */}
      </Stack.Navigator>
    </NavigationContainer>
    // <Toast />
    // </Provider>
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
