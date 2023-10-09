import React from "react";
import { View, Text, StyleSheet } from "react-native";

/**
 * @author
 * @function Register
 **/
export const Register = (props) => {
  const { container } = styles;
  return (
    <View style={container}>
      <Text>Register</Text>
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
