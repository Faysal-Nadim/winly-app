import React from "react";
import { View, Text, StyleSheet } from "react-native";

/**
 * @author
 * @function ExploreCampaigns
 **/
export const ExploreCampaigns = (props) => {
  const { container } = styles;
  return (
    <View style={container}>
      <Text>ExploreCampaigns</Text>
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
