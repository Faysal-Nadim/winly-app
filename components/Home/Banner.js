import React from "react";
import { View, Text, StyleSheet } from "react-native";

/**
 * @author
 * @function Banner
 **/
export const Banner = (props) => {
  const { container } = styles;
  return (
    <View style={container}>
      <Text>Banner</Text>
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
