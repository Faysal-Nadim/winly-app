import React from "react";
import { useEffect, useState } from "react";
import * as Font from "expo-font";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions";
import { useNavigation } from "@react-navigation/native";

// import * as Google from "expo-google-app-auth";
// import { GoogleSignin, GoogleSigninButton } from "react-native-login-google";

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

  //   const auth = useSelector((state) => state.auth);
  //   const verify = useSelector((state) => state.verify);

  // GoogleSignin.configure({
  //   webClientId:
  //     "665178446094-ci8tq3phvuv23bju5gij3q3imjuujopk.apps.googleusercontent.com",
  //   iosClientId:
  //     "665178446094-0t32o2ahfm396oss96jrs1391dnmrvb5.apps.googleusercontent.com",
  //   scopes: ["profile", "email"],
  // });

  // const googleLogin = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     // const userInfo = await GoogleSignin.signIn();
  //     // console.log(userInfo);
  //   } catch (error) {
  //     console.log(error);
  //     // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //     //   // user cancelled the login flow
  //     // } else if (error.code === statusCodes.IN_PROGRESS) {
  //     //   // operation (e.g. sign in) is in progress already
  //     // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //     //   // play services not available or outdated
  //     // } else {
  //     //   // some other error happened
  //     // }
  //   }
  // };

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

  const { container, container_center } = styles;
  return (
    <SafeAreaView style={container}>
      <View>
        <Image
          resizeMode="contain"
          source={require("../assets/winly-big.png")}
          style={{
            height: 100,
            width: 160,
          }}
        />
      </View>

      <View>
        <Text
          style={{
            fontSize: 20,
            fontFamily: loaded ? "Sora" : null,
          }}
        >
          Welcome To Winly LLC.
        </Text>
      </View>
      <View style={{ marginVertical: 16 }} />
      <View>
        <TextInput
          value={email}
          placeholder="Enter Email"
          onChangeText={setEmail}
          style={{
            fontFamily: loaded ? "Sora" : null,
            height: 40,
            width: 300,
            borderRadius: 5,
            margin: 12,
            // borderColor: "#1461AC",
            // borderWidth: 1,
            padding: 10,
            backgroundColor: "#fff",
          }}
          keyboardType="email-address"
        />
      </View>
      <View>
        <TextInput
          value={password}
          placeholder="Enter Password"
          onChangeText={setPassword}
          style={{
            fontFamily: loaded ? "Sora" : null,
            height: 40,
            width: 300,
            borderRadius: 5,
            // margin: 12,
            // borderColor: "#1461AC",
            // borderWidth: 1,
            padding: 10,
            backgroundColor: "#fff",
          }}
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity style={{ margin: 20 }} onPress={userlogin}>
        <View
          style={{
            width: 100,
            backgroundColor: "#FF3624",
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
      {/* <TouchableOpacity style={{ marginBottom: 20 }}>
        <Image
          resizeMode="contain"
          source={require("../assets/login.png")}
          style={{
            height: 45,
            width: 200,
            borderRadius: 5,
            borderColor: "#1461AC",
            borderWidth: 1,
          }}
        />
      </TouchableOpacity> */}
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
      <View
        style={{ flexDirection: "row", marginTop: 15 }}
        // onPress={() => navigation.navigate("Signup")}
      >
        <Text style={{ fontFamily: loaded ? "Sora" : null, fontSize: 17 }}>
          New User?
        </Text>
      </View>
      <TouchableOpacity style={{ margin: 20 }} onPress={userlogin}>
        <View
          style={{
            width: 150,
            backgroundColor: "#FF3624",
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
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: 20,
        }}
      >
        <Text
          style={{
            fontFamily: loaded ? "Sora" : null,
          }}
        >
          Version 1.0.1 (Beta)
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
