import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as Font from "expo-font";
import { CustomTextInput } from "../components/Input/CustomTextInput";
import { CustomSelectInputByList } from "../components/Input/CustomSelectInputByList";
import Modal from "react-native-modal";
import { MediumView } from "../components/text/medium";
import axiosInstance from "../redux/helpers/axios";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { signout } from "../redux/actions";

/**
 * @author
 * @function Profile
 **/

const Width = Dimensions.get("window").width;

const data = require("../assets/dialcode.json");

const countryData = require("../assets/Country.json");
const dialCodeData = require("../assets/dialcode.json");
const genderData = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

const getDefaultDialCode = (userDialCode) => {
  let defaultDialCode = null;
  if (userDialCode?.includes("+")) {
    userDialCode = userDialCode?.split("+")[1];
  }
  defaultDialCode = dialCodeData.find((c) => c?.value == userDialCode);
  return defaultDialCode;
};

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

  const defaultDialCode = getDefaultDialCode(user?.dialCode);

  const defaultGender = genderData.find((c) => c?.value == user?.gender);
  const defaultCountry = countryData.find((c) => c?.value == user?.country);
  const defaultNationality = countryData.find(
    (c) => c?.value === user?.nationality
  );

  const [password, setPassword] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

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

  const handleDeleteAccount = async () => {
    setModalVisible(false);
    setLoading(true);
    try {
      const data = { password: password, email: email };
      const res = await axiosInstance.post("/user/auth/profile/delete", data);
      if (res.status === 201) {
        Toast.show({
          type: "success",
          text1: "Account Deleted Successfully!",
          visibilityTime: 1500,
        });
        dispatch(signout());
        setLoading(false);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: `${error.response.data.msg}`,
        visibilityTime: 1500,
      });
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        margin: 0,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: "#fff",
          paddingHorizontal: 20,
          paddingVertical: 24,
        }}
      >
        <View style={{ flex: 1, marginBottom: 4 }}>
          <CustomTextInput
            label={"First Name"}
            text={firstName}
            setText={setFirstName}
          />
        </View>
        <View style={{ flex: 1, marginBottom: 4 }}>
          <CustomTextInput
            label={"Last Name"}
            text={lastName}
            setText={setLastName}
          />
        </View>

        <View style={{ flex: 1, marginBottom: 4 }}>
          <CustomTextInput label={"Email"} text={email} setText={setEmail} />
        </View>
        <View style={{ flexDirection: "row", marginBottom: 4 }}>
          <View style={{ flex: 0.4 }}>
            <CustomSelectInputByList
              label={"Dial Code"}
              onValueChange={(val) => setDialCode(val)}
              items={dialCodeData}
              defaultOption={defaultDialCode}
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
        <View style={{ flex: 1, marginBottom: 4 }}>
          <CustomTextInput
            label={"Date of Birth (dd/mm/yyyy) (Optional)"}
            text={dob}
            setText={setDob}
            keyboardType="phone-pad"
          />
        </View>

        <View style={{ flex: 1, marginBottom: 4 }}>
          <CustomSelectInputByList
            label={"Gender (Optional)"}
            onValueChange={(val) => setGender(val)}
            items={genderData}
            searchEnable={false}
            defaultOption={defaultGender}
          />
        </View>
        <View style={{ flex: 1, marginBottom: 4 }}>
          <CustomSelectInputByList
            label={"Country"}
            onValueChange={(val) => setCountry(val)}
            items={countryData}
            defaultOption={defaultCountry}
          />
        </View>
        <View style={{ flex: 1, marginBottom: 4 }}>
          <CustomSelectInputByList
            label={"Nationality"}
            onValueChange={(val) => setNationality(val)}
            items={countryData}
            defaultOption={defaultNationality}
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
          onPress={() => setModalVisible(true)}
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
              Delete Account
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <Modal
        isVisible={isModalVisible}
        animationIn={"slideInUp"}
        animationInTiming={500}
        animationOut={"slideOutDown"}
        animationOutTiming={800}
        // backdropTransitionOutTiming={1000}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 5,
            height: 200,
            width: Width - 40,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
        >
          <View style={{ width: Width - 50 }}>
            <CustomTextInput
              label={"Password"}
              text={password}
              setText={setPassword}
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "black",
              height: 40,
              width: "100%",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
            onPress={handleDeleteAccount}
          >
            <MediumView style={{ color: "white", fontSize: 16 }}>
              Confirm Deletion
            </MediumView>
          </TouchableOpacity>
        </View>
      </Modal>
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
