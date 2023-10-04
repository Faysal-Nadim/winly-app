import React from "react";
import { View, Text, StyleSheet } from "react-native";

/**
 * @author
 * @function ProgressBar
 **/
export const ProgressBar = (props) => {
  const { container } = styles;
  return (
    <View style={container}>
      <Text>ProgressBar</Text>
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
