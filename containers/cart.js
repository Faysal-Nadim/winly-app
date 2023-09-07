import React from "react";
import { View, Text, StyleSheet } from "react-native";

/**
 * @author
 * @function Cart
 **/
export const Cart = (props) => {
  const { container } = styles;
  return (
    <View style={container}>
      <Text>Cart</Text>
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
