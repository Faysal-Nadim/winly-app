import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import OTPTextView from "react-native-otp-textinput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { requestCode, verifyCode } from "../redux/actions";
import { SemiBoldView } from "../components/text/semibold";
import { RegularView } from "../components/text/regular";
import * as Font from "expo-font";

/**
 * @author
 * @function Verify
 **/
export const Verify = ({ route }) => {
  const { container } = styles;

  const auth = useSelector((state) => state.auth);

  const [code, setCode] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

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

  useEffect(() => {
    const data = { email: route.params.email };
    dispatch(requestCode(data));
  }, []);

  useEffect(() => {
    if (auth.error === null && auth.verified === true) {
      navigation.navigate("Login");
    }
  }, [auth]);

  const verifyEmailCode = () => {
    const data = {
      code: Number(code),
      email: route.params.email,
    };
    dispatch(verifyCode(data));
  };

  return (
    <View style={container}>
      <View>
        <View
          style={{
            marginTop: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/splash.png")}
            style={{
              height: 100,
              width: 200,
            }}
          />
        </View>
        <SemiBoldView>
          <Text
            style={{
              fontSize: 18,
            }}
          >
            Please Verify Your Email Address
          </Text>
        </SemiBoldView>
      </View>
      <View
        style={{
          marginTop: 30,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 15,
            fontFamily: loaded ? "Sora" : null,
          }}
        >
          A 6 Digit Code Has Been Sent To{"\n"}
          {route.params.email}
        </Text>
      </View>
      <OTPTextView handleTextChange={(text) => setCode(text)} inputCount={6} />

      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <View>
          <RegularView>
            <Text style={{ fontSize: 15 }}>Didn't Get Code?</Text>
          </RegularView>
        </View>
        <TouchableOpacity>
          <SemiBoldView>
            <Text
              style={{
                color: "#FF3624",
                fontSize: 15,
              }}
            >
              {" "}
              Resend
            </Text>
          </SemiBoldView>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={{ margin: 20 }} onPress={verifyEmailCode}>
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
          <RegularView>
            <Text
              style={{
                color: "#fff",
              }}
            >
              Verify
            </Text>
          </RegularView>
        </View>
      </TouchableOpacity>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <RegularView>Version 1.0.4 (Beta)</RegularView>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
