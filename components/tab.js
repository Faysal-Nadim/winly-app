import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import { Home } from "../containers/home";
import { Cart } from "../containers/cart";
import { Account } from "../containers/account";
import { useSelector } from "react-redux";
import { Winner } from "../containers/Winner";

const Tab = createBottomTabNavigator();

const CompanyTab = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -10,
      justifyContent: "center",
      alignItems: "center",
      ...styles.shadow,
    }}
    onPress={onPress}
  >
    <View
      style={{
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: "#FF3624",
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

export const MyTabs = () => {
  const [loaded, setLoaded] = useState(false);

  const cart = useSelector((state) => state.cart.cart);

  const totalItem =
    cart?.cartItems?.length > 0
      ? Object.keys(cart.cartItems).reduce(function (qty, key) {
          return qty + cart.cartItems[key].qty;
        }, 0)
      : 0;

  useEffect(() => {
    Font.loadAsync({
      Sora: require("../assets/fonts/Sora-Regular.ttf"),
      Sora: {
        uri: require("../assets/fonts/Sora-Regular.ttf"),
        display: Font.FontDisplay.FALLBACK,
      },
    }).then(() => {
      setLoaded(true);
    });
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          height: Platform.OS === "android" ? 60 : 90,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../assets/home.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#FF3624" : "#748c94",
                }}
              />
              <Text
                style={{
                  fontFamily: loaded ? "Sora" : null,
                  color: focused ? "#FF3624" : "#748c94",
                  fontSize: 10,
                }}
              >
                HOME
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Winner"
        component={Winner}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../assets/win.png")}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#FF3624" : "#748c94",
                }}
              />
              <Text
                style={{
                  color: focused ? "#FF3624" : "#748c94",
                  fontSize: 10,
                  fontFamily: loaded ? "Sora" : null,
                }}
              >
                WINNERS
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Comopany"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/winly.png")}
              resizeMode="contain"
              style={{
                width: 45,
                height: 45,
                left: 2,
                top: -2,
                tintColor: "#fff",
              }}
            />
          ),
          tabBarButton: (props) => <CompanyTab {...props} />,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../assets/cart.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#FF3624" : "#748c94",
                }}
              />
              <View
                style={{
                  position: "absolute",
                  right: 0,
                  top: -10,
                  left: 14,
                  backgroundColor: "#FF3624",
                  height: 25,
                  width: 25,
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: "#fff",
                  borderWidth: 2,
                }}
              >
                <Text
                  style={{
                    fontFamily: loaded ? "Sora" : null,
                    color: "#fff",
                  }}
                >
                  {totalItem}
                </Text>
              </View>
              <Text
                style={{
                  color: focused ? "#FF3624" : "#748c94",
                  fontSize: 10,
                  fontFamily: loaded ? "Sora" : null,
                }}
              >
                CART
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../assets/profile.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#FF3624" : "#748c94",
                }}
              />
              <Text
                style={{
                  color: focused ? "#FF3624" : "#748c94",
                  fontSize: 10,
                  fontFamily: loaded ? "Sora" : null,
                }}
              >
                ACCOUNT
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "7F5DF0",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
