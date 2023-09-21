import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { MediumView } from "../components/text/medium";
import { RegularView } from "../components/text/regular";

/**
 * @author
 * @function Wallet
 **/
const Height = Dimensions.get("window").height;
const Width = Dimensions.get("window").width;

export const Wallet = ({ route }) => {
  const user = route.params.user;
  const { container } = styles;
  return (
    <SafeAreaView style={container}>
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          height: Height / 4,
        }}
      >
        <RegularView>
          {" "}
          <Text style={{ fontSize: 10 }}>Available Balance</Text>
        </RegularView>
        <MediumView>
          <Text style={{ fontSize: 25 }}>AED {user?.wallet?.available}</Text>
        </MediumView>
      </View>
      <View
        style={{
          marginTop: 15,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            height: 40,
            width: Width / 3,
            backgroundColor: "#FF3624",
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MediumView>
            <Text style={{ color: "white", fontSize: 15 }}>Add Balance</Text>
          </MediumView>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: StatusBar.currentHeight - 10,
  },
});
