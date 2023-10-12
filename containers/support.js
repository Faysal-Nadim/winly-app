import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import * as Font from "expo-font";
import { useSelector } from "react-redux";
import { Picker } from "@react-native-picker/picker";
import { MediumView } from "../components/text/medium";
import axiosInstance from "../redux/helpers/axios";
import Toast from "react-native-toast-message";

/**
 * @author
 * @function Support
 **/
export const Support = (props) => {
  const { container } = styles;

  const user = useSelector((state) => state.auth.user);

  const [name, setName] = useState(user?.fullName);
  const [email, setEmail] = useState(user?.email);
  const [topic, setTopic] = useState("General");
  const [msg, setMsg] = useState("");

  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleMessage = async () => {
    setLoading(true);
    const data = {
      name: name,
      email: email,
      topic: topic,
      msg: msg,
    };
    await axiosInstance
      .post(`/query/submit`, data)
      .then((res) => {
        if (res.status === 201) {
          setMsg("");
          setLoading(false);
          Toast.show({
            type: "success",
            text1: `Dear ${name}`,
            text2: `${res.data.msg}`,
            visibilityTime: 1500,
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        Toast.show({
          type: "error",
          text1: "Failed!",
          text2: `${err.response.data.msg}`,
          visibilityTime: 1500,
        });
      });
  };

  return (
    <SafeAreaView style={{ container }}>
      <ScrollView>
        <View
          style={{
            backgroundColor: "#fff",
            margin: 5,
            padding: 5,
            borderRadius: 10,
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: loaded ? "Sora-Medium" : null,
                marginLeft: 5,
                fontSize: 16,
              }}
            >
              Full Name
            </Text>
            <TextInput
              aria-disabled
              placeholder="Enter Your Full Name"
              value={name}
              onChangeText={setName}
              aria-label="Full Name"
              style={{
                fontFamily: loaded ? "Sora" : null,
                fontSize: 15,
                height: 50,
                borderRadius: 10,
                margin: 5,
                padding: 10,
                backgroundColor: "#fff",
                borderColor: "#828282",
                borderWidth: 1,
              }}
            />
          </View>
          <View>
            <Text
              style={{
                fontFamily: loaded ? "Sora-Medium" : null,
                marginLeft: 5,
                fontSize: 16,
              }}
            >
              Email
            </Text>
            <TextInput
              placeholder="Enter Your Email"
              value={email}
              onChangeText={setEmail}
              aria-label="Email"
              style={{
                fontFamily: loaded ? "Sora" : null,
                fontSize: 15,
                height: 50,
                borderRadius: 10,
                margin: 5,
                padding: 10,
                backgroundColor: "#fff",
                borderColor: "#828282",
                borderWidth: 1,
              }}
              keyboardType="email-address"
            />
          </View>
          <Text
            style={{
              fontFamily: loaded ? "Sora-Medium" : null,
              marginLeft: 5,
              fontSize: 16,
            }}
          >
            Topic
          </Text>
          <View
            style={{
              height: 50,
              // width: Width / 2.3,
              backgroundColor: "#fff",
              justifyContent: "center",
              margin: 5,
              borderRadius: 10,
              padding: 10,
              borderColor: "#828282",
              borderWidth: 1,
            }}
          >
            <Picker
              selectedValue={topic}
              onValueChange={(itemValue, itemIndex) => setTopic(itemValue)}
              style={{}}
            >
              <Picker.Item label="General Enquiries" value="General" />
              <Picker.Item label="Technical Issues" value="Technical" />
              <Picker.Item label="Payment Issues" value="Payment" />
            </Picker>
          </View>
          <View>
            <Text
              style={{
                fontFamily: loaded ? "Sora-Medium" : null,
                marginLeft: 5,
                fontSize: 16,
              }}
            >
              Message
            </Text>
            <TextInput
              placeholder="Enter Your Message"
              value={msg}
              onChangeText={setMsg}
              aria-label="Address"
              style={{
                fontFamily: loaded ? "Sora" : null,
                fontSize: 15,
                height: 120,
                // width: Width - 35,
                borderRadius: 10,
                margin: 5,
                padding: 10,
                backgroundColor: "#fff",
                borderColor: "#828282",
                borderWidth: 1,
              }}
              multiline={true}
              // keyboardType="email-address"
            />
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#FF3624",
            height: 40,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            margin: 5,
          }}
          onPress={handleMessage}
        >
          <MediumView>
            <Text style={{ color: "white", fontSize: 16 }}>Submit Query</Text>
          </MediumView>
        </TouchableOpacity>
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
    margin: 20,
  },
});
