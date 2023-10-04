import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";

/**
 * @author
 * @function SliderComponent
 **/
export const SliderComponent = ({ item, index }) => {
  const screenWidth = Dimensions.get("window").width;
  return (
    <View>
      <Image source={item.image} style={{ height: 200, width: screenWidth }} />
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
