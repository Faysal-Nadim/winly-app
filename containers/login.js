import React from "react";
import { useEffect, useState } from "react";
import * as Font from "expo-font";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions";
import { useNavigation } from "@react-navigation/native";
import { CustomTextInput } from "../components/Input/CustomTextInput";
import { CustomPasswordInput } from "../components/Input/CustomPasswordInput";
import WinlyColors from "../assets/WinlyColors";

/**
 * @author
 * @function Login
 **/
export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loaded, setLoaded] = useState(false);

  const navigation = useNavigation();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.error !== null && auth.error.status === 403) {
      navigation.navigate("Verify", { email: email });
    }
  }, [auth.error]);

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

  const dispatch = useDispatch();

  const userlogin = () => {
    const user = {
      email: email,
      password: password,
    };
    dispatch(login(user));
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: StatusBar.currentHeight,
        backgroundColor: "#fff",
      }}
    >
      {/* INTRO */}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 32,
        }}
      >
        <Image
          resizeMode="contain"
          source={require("../assets/winly-big.png")}
          style={{
            height: 100,
            width: 160,
          }}
        />
        <Text
          style={{
            fontSize: 20,
            fontFamily: loaded ? "Sora" : null,
          }}
        >
          Welcome To Winly LLC.
        </Text>
      </View>

      {/* LOGIN FORM */}

      <View style={{ width: 340 }}>
        <CustomTextInput
          label={"Email"}
          text={email}
          setText={setEmail}
          keyboardType="email-address"
        />
      </View>
      <View style={{ width: 340 }}>
        <CustomPasswordInput
          label={"Enter Password"}
          text={password}
          setText={setPassword}
        />
      </View>

      {/* LOGIN BUTTON */}

      <TouchableOpacity style={{ margin: 20 }} onPress={userlogin}>
        <View
          style={{
            width: 100,
            backgroundColor: WinlyColors.primaryRed,
            justifyContent: "center",
            alignItems: "center",
            padding: 8,
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontFamily: loaded ? "Sora" : null,
            }}
          >
            Login
          </Text>
        </View>
      </TouchableOpacity>

      {/* OR DIVIDER */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: 1,
            width: "40%",
            backgroundColor: "#090909",
            opacity: 0.5,
          }}
        />
        <Text
          style={{
            fontFamily: loaded ? "Sora" : null,
            marginLeft: 5,
            marginRight: 5,
          }}
        >
          Or
        </Text>
        <View
          style={{
            height: 1,
            width: "40%",
            backgroundColor: "#090909",
            opacity: 0.5,
          }}
        />
      </View>

      {/* REGISTER BUTTON */}
      <View style={{ flexDirection: "row", marginTop: 15 }}>
        <Text style={{ fontFamily: loaded ? "Sora" : null, fontSize: 17 }}>
          New User?
        </Text>
      </View>
      <TouchableOpacity
        style={{ margin: 20 }}
        onPress={() => navigation.navigate("Register")}
      >
        <View
          style={{
            width: 150,
            backgroundColor: WinlyColors.primaryRed,
            justifyContent: "center",
            alignItems: "center",
            padding: 8,
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontFamily: loaded ? "Sora" : null,
            }}
          >
            Register Now
          </Text>
        </View>
      </TouchableOpacity>

      {/*  VERSION */}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: 10,
        }}
      >
        <Text
          style={{
            fontFamily: loaded ? "Sora" : null,
          }}
        >
          Version 1.0.4 (Beta)
        </Text>
      </View>
      {auth?.loading && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: "#f3f3f3",
            opacity: 0.5,
          }}
        >
          <Image
            source={require("../assets/loading.gif")}
            style={{ height: 40, width: 40 }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: StatusBar.currentHeight,
  },
  container_center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
