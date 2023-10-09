import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";

/**
 * @author
 * @function Loading
 **/
export const Loading = (props) => {
  const auth = useSelector((state) => state.auth);
  const navigation = useNavigation();

  setTimeout(function () {
    if (!auth.authenticate) {
      navigation.navigate("Login");
    }
  }, 1000);

  const { container } = styles;
  return (
    <View style={container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
