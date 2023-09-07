import React from "react";
import { View, Text, StyleSheet } from "react-native";

/**
 * @author
 * @function Home
 **/
export const Home = (props) => {
  const { container } = styles;
  return (
    <View style={container}>
      <Text>Home</Text>
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
