import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as Font from "expo-font";
import { Picker } from "@react-native-picker/picker";
import { SelectList } from "react-native-dropdown-select-list";
import { useNavigation } from "@react-navigation/native";
import axiosInstance from "../redux/helpers/axios";
import Toast from "react-native-toast-message";

/**
 * @author
 * @function Register
 **/

const Width = Dimensions.get("window").width;
const countryData = require("../assets/Country.json");
const data = require("../assets/dialcode.json");

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

  const navigation = useNavigation();

  const handleRegistration = async () => {
    setLoading(true);
    try {
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
        marginLeft: 10,
        marginRight: 10,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
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
        <View style={{}}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: loaded ? "Sora-Medium" : null,
                  marginLeft: 5,
                }}
              >
                First Name
              </Text>
              <TextInput
                value={firstName}
                onChangeText={setFirstName}
                placeholder="First Name"
                style={{
                  fontFamily: loaded ? "Sora" : null,
                  fontSize: 15,
                  height: 50,
                  width: Width / 2.3,
                  borderRadius: 10,
                  margin: 5,
                  padding: 10,
                  backgroundColor: "#fff",
                }}
              />
            </View>
            <View>
              <Text
                style={{
                  fontFamily: loaded ? "Sora-Medium" : null,
                  marginLeft: 5,
                }}
              >
                Last Name
              </Text>
              <TextInput
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
                style={{
                  fontFamily: loaded ? "Sora" : null,
                  fontSize: 15,
                  height: 50,
                  width: Width / 2.3,
                  borderRadius: 10,
                  margin: 5,
                  padding: 10,
                  backgroundColor: "#fff",
                }}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: loaded ? "Sora-Medium" : null,
                  marginLeft: 5,
                }}
              >
                Email
              </Text>
              <TextInput
                placeholder="Valid Email"
                value={email}
                onChangeText={setEmail}
                aria-label="Email"
                style={{
                  fontFamily: loaded ? "Sora" : null,
                  fontSize: 15,
                  height: 50,
                  width: Width - 35,
                  borderRadius: 10,
                  margin: 5,
                  padding: 10,
                  backgroundColor: "#fff",
                }}
                keyboardType="email-address"
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 5,
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: loaded ? "Sora-Medium" : null,
                  marginLeft: 5,
                  fontWeight: 500,
                }}
              >
                Dial Code
              </Text>
              <View
                style={{
                  // height: 150,
                  width: Width / 2.3,
                  backgroundColor: "#fff",
                  justifyContent: "center",
                  margin: 5,
                  borderRadius: 10,
                }}
              >
                <SelectList
                  setSelected={(val) => setDialCode(val)}
                  data={data}
                  save="value"
                  label="DialCode"
                  fontFamily="Sora"
                />
              </View>
            </View>
            <View>
              <Text
                style={{
                  fontFamily: loaded ? "Sora-Medium" : null,
                  marginLeft: 5,
                  fontWeight: 500,
                }}
              >
                Phone Number
              </Text>
              <TextInput
                placeholder="Phone Number"
                value={phone}
                onChangeText={setPhone}
                style={{
                  fontFamily: loaded ? "Sora" : null,
                  fontSize: 15,
                  height: 50,
                  width: Width / 2.3,
                  borderRadius: 10,
                  margin: 5,
                  padding: 10,
                  backgroundColor: "#fff",
                }}
                keyboardType="phone-pad"
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: loaded ? "Sora-Medium" : null,
                  marginLeft: 5,
                }}
              >
                Date of Birth
              </Text>
              <TextInput
                placeholder="DD/MM/YYYY"
                value={dob}
                onChangeText={setDob}
                style={{
                  fontFamily: loaded ? "Sora" : null,
                  fontSize: 15,
                  height: 50,
                  width: Width / 2.3,
                  borderRadius: 10,
                  margin: 5,
                  padding: 10,
                  backgroundColor: "#fff",
                }}
                keyboardType="phone-pad"
              />
            </View>
            <View>
              <Text
                style={{
                  fontFamily: loaded ? "Sora-Medium" : null,
                  marginLeft: 5,
                }}
              >
                Gender
              </Text>
              <View
                style={{
                  height: 50,
                  width: Width / 2.3,
                  backgroundColor: "#fff",
                  justifyContent: "center",
                  margin: 5,
                  borderRadius: 10,
                  padding: 10,
                }}
              >
                <Picker
                  selectedValue={gender}
                  onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                >
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Female" value="Female" />
                  <Picker.Item label="Others" value="Others" />
                </Picker>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 5,
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: loaded ? "Sora-Medium" : null,
                  marginLeft: 5,
                  fontWeight: 500,
                }}
              >
                Country
              </Text>
              <View
                style={{
                  // height: 50,
                  width: Width / 2.3,
                  backgroundColor: "#fff",
                  justifyContent: "center",
                  margin: 5,
                  borderRadius: 10,
                }}
              >
                <SelectList
                  setSelected={(val) => setCountry(val)}
                  data={countryData}
                  save="value"
                  label="Country"
                  fontFamily="Sora"
                />
              </View>
            </View>
            <View>
              <Text
                style={{
                  fontFamily: loaded ? "Sora-Medium" : null,
                  marginLeft: 5,
                  fontWeight: 500,
                }}
              >
                Nationality
              </Text>
              <View
                style={{
                  // height: 50,
                  width: Width / 2.3,
                  backgroundColor: "#fff",
                  justifyContent: "center",
                  margin: 5,
                  borderRadius: 10,
                }}
              >
                <SelectList
                  setSelected={(val) => setNationality(val)}
                  data={countryData}
                  save="value"
                  label="Nationality"
                  fontFamily="Sora"
                />
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: loaded ? "Sora-Medium" : null,
                  marginLeft: 5,
                }}
              >
                Password
              </Text>
              <TextInput
                placeholder="Enter Strong Password"
                value={password}
                onChangeText={setPassword}
                aria-label="Password"
                style={{
                  fontFamily: loaded ? "Sora" : null,
                  fontSize: 15,
                  height: 50,
                  width: Width - 35,
                  borderRadius: 10,
                  margin: 5,
                  padding: 10,
                  backgroundColor: "#fff",
                }}
                secureTextEntry={true}
              />
            </View>
          </View>
          <TouchableOpacity
            style={{
              margin: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={handleRegistration}
          >
            <View
              style={{
                width: "100%",
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
