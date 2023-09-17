import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TextInput,
} from "react-native";
import * as Font from "expo-font";
import { Picker } from "@react-native-picker/picker";

/**
 * @author
 * @function Profile
 **/

const Width = Dimensions.get("window").width;
const countryData = require("../assets/CountryCodes.json");

export const Profile = ({ route }) => {
  const user = route.params.user;
  const [loaded, setLoaded] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);
  const [gender, setGender] = useState(user?.gender);
  const [country, setCountry] = useState(user?.country);
  const [nationality, setNationality] = useState(user?.nationality);
  const [dob, setDob] = useState(user?.dob);
  const [phone, setPhone] = useState(user?.phone);
  const [dialCode, setDialCode] = useState(user?.dialCode);
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

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

  return (
    <SafeAreaView
      style={{
        flex: 1,
        margin: StatusBar.currentHeight - 20,
      }}
    >
      <View>
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
              value={firstName.toUpperCase()}
              onChangeText={setFirstName}
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
              value={lastName.toUpperCase()}
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
                height: 50,
                width: Width / 2.3,
                backgroundColor: "#fff",
                justifyContent: "center",
                margin: 5,
                borderRadius: 10,
              }}
            >
              <Picker
                selectedValue={dialCode}
                onValueChange={(itemValue, itemIndex) => setDialCode(itemValue)}
              >
                {countryData?.map((country, i) => (
                  <Picker.Item
                    key={i}
                    label={country.dial_code}
                    value={country.dial_code}
                  />
                ))}
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Others" value="Others" />
              </Picker>
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
                height: 50,
                width: Width / 2.3,
                backgroundColor: "#fff",
                justifyContent: "center",
                margin: 5,
                borderRadius: 10,
              }}
            >
              <Picker
                selectedValue={country}
                onValueChange={(itemValue, itemIndex) => setCountry(itemValue)}
              >
                {countryData?.map((country, i) => (
                  <Picker.Item
                    key={i}
                    label={country.name}
                    value={country.name}
                  />
                ))}
              </Picker>
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
                height: 50,
                width: Width / 2.3,
                backgroundColor: "#fff",
                justifyContent: "center",
                margin: 5,
                borderRadius: 10,
              }}
            >
              <Picker
                selectedValue={nationality}
                onValueChange={(itemValue, itemIndex) =>
                  setNationality(itemValue)
                }
              >
                {countryData?.map((country, i) => (
                  <Picker.Item
                    key={i}
                    label={country.name}
                    value={country.name}
                  />
                ))}
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Others" value="Others" />
              </Picker>
            </View>
          </View>
        </View>
      </View>
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
