import React from "react";
import { View, Text, StyleSheet } from "react-native";

/**
 * @author
 * @function Wallet
 **/
export const Wallet = (props) => {
  const { container } = styles;
  return (
    <View style={container}>
      <Text>Wallet</Text>
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
