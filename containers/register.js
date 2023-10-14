import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as Font from "expo-font";
import { useNavigation } from "@react-navigation/native";
import axiosInstance from "../redux/helpers/axios";
import Toast from "react-native-toast-message";
import { CustomTextInput } from "../components/Input/CustomTextInput";
import { CustomPasswordInput } from "../components/Input/CustomPasswordInput";
// import { CustomSelectInput } from "../components/Input/CustomSelectInput";
import { CustomSelectInputByList } from "../components/Input/CustomSelectInputByList";
import WinlyColors from "../assets/WinlyColors";

/**
 * @author
 * @function Register
 **/

const Width = Dimensions.get("window").width;
const countryData = require("../assets/Country.json");
const dialCodeData = require("../assets/dialcode.json");
const genderData = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

export const Register = (props) => {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");
  const [country, setCountry] = useState("");
  const [nationality, setNationality] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [dialCode, setDialCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigation = useNavigation();

  const handleRegistration = async () => {
    setLoading(true);

    const data = {
      firstName,
      lastName,
      email,
      gender,
      country,
      dob,
      phone,
      password,
      dialCode,
      nationality,
    };

    if (data?.password === confirmPassword) {
      try {
        const res = await axiosInstance.post(`/user/auth/signup`, data);
        if (res.status === 201) {
          setLoading(false);
          Toast.show({
            type: "success",
            text1: "Congratulations!",
            text2: `${res.data.msg}`,
            visibilityTime: 1000,
          });
          navigation.navigate("Verify", { email: email });
        }
      } catch (err) {
        setLoading(false);
        Toast.show({
          type: "error",
          text1: `${err.response.data.msg}`,
          visibilityTime: 1500,
        });
      }
    } else {
      setLoading(false);
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: `Password Dosen't Matched`,
        visibilityTime: 1000,
      });
    }
  };

  useEffect(() => {
    Font.loadAsync({
      Sora: require("../assets/fonts/Sora-Regular.ttf"),
      "Sora-Medium": {
        uri: require("../assets/fonts/Sora-Medium.ttf"),
        display: Font.FontDisplay.FALLBACK,
      },
    }).then(() => {
      setLoaded(true);
    });
  }, []);

  function checkValue(str, max) {
    if (str.charAt(0) !== "0" || str == "00") {
      var num = parseInt(str);
      if (isNaN(num) || num <= 0 || num > max) num = 1;
      str =
        num > parseInt(max.toString().charAt(0)) && num.toString().length == 1
          ? "0" + num
          : num.toString();
    }
    return str;
  }

  useEffect(() => {
    var input = dob;
    if (/\D\/$/.test(input)) input = input.substr(0, input.length - 3);
    var values = input.split("/").map(function (v) {
      return v.replace(/\D/g, "");
    });
    if (values[0]) values[0] = checkValue(values[0], 31);
    if (values[1]) values[1] = checkValue(values[1], 12);
    var output = values.map(function (v, i) {
      return v.length == 2 && i < 2 ? v + " / " : v;
    });
    setDob(output.join("").substr(0, 14));
  }, [dob]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: StatusBar.currentHeight,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: "#fff",
          paddingHorizontal: 20,
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            resizeMode="contain"
            source={require("../assets/winly-big.png")}
            style={{
              height: 100,
              width: 160,
            }}
          />
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontFamily: loaded ? "Sora" : null,
            }}
          >
            Fill Up The Following Form
          </Text>
        </View>

        <View>
          <View style={{ flexDirection: "row", marginBottom: 4 }}>
            <View style={{ flex: 1 }}>
              <CustomTextInput
                label={"First Name"}
                text={firstName}
                setText={setFirstName}
              />
            </View>
            <View style={{ flex: 1 }}>
              <CustomTextInput
                label={"Last Name"}
                text={lastName}
                setText={setLastName}
              />
            </View>
          </View>

          <View style={{ flex: 1, marginBottom: 4 }}>
            <CustomTextInput label={"Email"} text={email} setText={setEmail} />
          </View>
          <View style={{ flex: 1, marginBottom: 4 }}>
            <CustomTextInput
              label={"Date of Birth (dd/mm/yyyy)"}
              text={dob}
              setText={setDob}
              keyboardType="phone-pad"
            />
          </View>

          <View style={{ flexDirection: "row", marginBottom: 4 }}>
            <View style={{ flex: 0.4 }}>
              <CustomSelectInputByList
                label={"Dial Code"}
                onValueChange={(val) => setDialCode(val)}
                items={dialCodeData}
              />
            </View>

            <View style={{ flex: 0.6 }}>
              <CustomTextInput
                label={"Phone"}
                text={phone}
                setText={setPhone}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* <View style={{ flex: 1 }}>
            <CustomSelectInput
              label={"Gender"}
              onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
              selectedValue={gender}
              items={genderData}
            />
          </View> */}

          {/* GENDER COUNTRY NATIONALITY */}

          <View style={{ flex: 1, marginBottom: 4 }}>
            <CustomSelectInputByList
              label={"Gender"}
              onValueChange={(val) => setGender(val)}
              items={genderData}
              searchEnable={false}
            />
          </View>
          <View style={{ flex: 1, marginBottom: 4 }}>
            <CustomSelectInputByList
              label={"Country"}
              onValueChange={(val) => setCountry(val)}
              items={countryData}
            />
          </View>
          <View style={{ flex: 1, marginBottom: 4 }}>
            <CustomSelectInputByList
              label={"Nationality"}
              onValueChange={(val) => setNationality(val)}
              items={countryData}
            />
          </View>

          {/* PASSWORD */}
          <View style={{ flex: 1, marginBottom: 4 }}>
            <CustomPasswordInput
              label={"Password"}
              text={password}
              setText={setPassword}
            />
          </View>
          <View style={{ flex: 1, marginBottom: 4 }}>
            <CustomPasswordInput
              label={"Confirm Password"}
              text={confirmPassword}
              setText={setConfirmPassword}
            />
          </View>

          <TouchableOpacity
            style={{
              marginHorizontal: 10,
              marginTop: 10,
              marginBottom: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={handleRegistration}
          >
            <View
              style={{
                width: "100%",
                height: 48,
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
                  fontFamily: loaded ? "Sora-Medium" : null,
                }}
              >
                Register
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {loading && (
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
  },
});
