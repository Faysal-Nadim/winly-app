import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SemiBoldView } from "../components/text/semibold";

/**
 * @author
 * @function Confirmation
 **/

const Width = Dimensions.get("window").width;

export const Confirmation = ({ route }) => {
  const { container } = styles;

  const navigation = useNavigation();

  return (
    <SafeAreaView style={container}>
      <View
        style={{
          height: 250,
          width: 250,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {route.params.payment === "complete" ? (
          <Image
            resizeMode="contain"
            source={require("../assets/orderplaced.png")}
            style={{
              width: 250,
              height: 250,
            }}
          />
        ) : (
          <Image
            resizeMode="contain"
            source={require("../assets/failed.png")}
            style={{
              width: 200,
              height: 200,
            }}
          />
        )}
      </View>
      <Text
        style={{
          fontSize: 22,
          color: "#3B577C",
          textAlign: "center",
        }}
      >
        {route.params.payment === "complete"
          ? `Your Order Has Been Placed`
          : `Payment Failed! Please Try Again.`}
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: "#FF3624",
          padding: 10,
          width: Width / 2,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
          marginTop: 20,
        }}
        onPress={() => {
          route.params.payment === "complete"
            ? navigation.navigate("Home")
            : navigation.navigate("Cart");
        }}
      >
        <SemiBoldView>
          <Text
            style={{
              fontSize: 20,
              color: "#fff",
            }}
          >
            {route.params.payment === "complete"
              ? "Back To Home"
              : "Back To Cart"}
          </Text>
        </SemiBoldView>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: StatusBar.currentHeight,
  },
});
