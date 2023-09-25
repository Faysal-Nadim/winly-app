import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { MediumView } from "../components/text/medium";
import { useDispatch, useSelector } from "react-redux";
import { updateNotification } from "../redux/actions";

/**
 * @author
 * @function Notification
 **/
export const Notification = (props) => {
  const { container } = styles;

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [email, setEmail] = useState(user?.notification?.email);
  const [sms, setSms] = useState(user?.notification?.sms);
  const [wp, setWP] = useState(user?.notification?.wp);
  const [pn, setPN] = useState(user?.notification?.pn);
  const [click, setClick] = useState(false);

  useEffect(() => {
    const data = {
      email: email,
      sms: sms,
      wp: wp,
      pn: pn,
    };
    if (click) {
      dispatch(updateNotification(data));
      setClick(false);
    }
  }, [click]);

  return (
    <SafeAreaView style={container}>
      <View style={{ backgroundColor: "#fff", padding: 10, borderRadius: 10 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <MediumView>
              <Text style={{ fontSize: 17 }}>Email</Text>
            </MediumView>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#767577" }}
            thumbColor={email ? "#FF3624" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => {
              setEmail(!email);
              setClick(true);
            }}
            value={email}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <MediumView>
              <Text style={{ fontSize: 17 }}>SMS</Text>
            </MediumView>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#767577" }}
            thumbColor={sms ? "#FF3624" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => {
              setSms(!sms);
              setClick(true);
            }}
            value={sms}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <MediumView>
              <Text style={{ fontSize: 17 }}>Whatsapp</Text>
            </MediumView>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#767577" }}
            thumbColor={wp ? "#FF3624" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => {
              setWP(!wp);
              setClick(true);
            }}
            value={wp}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <MediumView>
              <Text style={{ fontSize: 17 }}>Push Notifications</Text>
            </MediumView>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#767577" }}
            thumbColor={pn ? "#FF3624" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => {
              setPN(!pn);
              setClick(true);
            }}
            value={pn}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: StatusBar.currentHeight - 20,
  },
});
