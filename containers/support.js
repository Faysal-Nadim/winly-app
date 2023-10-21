import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import * as Font from "expo-font";
import { useSelector } from "react-redux";
import { MediumView } from "../components/text/medium";
import axiosInstance from "../redux/helpers/axios";
import Toast from "react-native-toast-message";
import { CustomTextInput } from "../components/Input/CustomTextInput";
import { CustomSelectInputByList } from "../components/Input/CustomSelectInputByList";

/**
 * @author
 * @function Support
 **/

const topicData = [
  {
    value: "General",
    name: "General Enquiries",
  },
  {
    value: "Technical",
    name: "Technical Issue",
  },
  {
    value: "Payment",
    name: "Payment Issues",
  },
];

export const Support = (props) => {
  const user = useSelector((state) => state?.auth?.user);

  const [name, setName] = useState(user?.fullName || null);
  const [email, setEmail] = useState(user?.email || null);
  const [topic, setTopic] = useState(null);
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
      topic: topic !== null ? topic : "General",
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
    <SafeAreaView style={{}}>
      <ScrollView
        style={{
          backgroundColor: "#fff",
          paddingVertical: 20,
          paddingHorizontal: 12,
        }}
      >
        <View>
          <View style={{ flex: 1, marginBottom: 4 }}>
            <CustomTextInput
              label={"Full Name"}
              text={name}
              setText={setName}
            />
          </View>
          <View style={{ flex: 1, marginBottom: 4 }}>
            <CustomTextInput label={"Email"} text={email} setText={setEmail} />
          </View>

          <View style={{ flex: 1, marginBottom: 4 }}>
            <CustomSelectInputByList
              label={"Topic"}
              onValueChange={(val) => setTopic(val)}
              items={topicData}
              searchEnable={false}
              defaultOption={topicData[0]}
              placeholder={"Select Topic"}
            />
          </View>
          <View style={{ flex: 1, marginBottom: 4 }}>
            <CustomTextInput
              label={"Message"}
              text={msg}
              setText={setMsg}
              inputFieldHeight={120}
              multiline={true}
            />
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
