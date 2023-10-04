import React from "react";
import { View, Text, StyleSheet } from "react-native";

/**
 * @author
 * @function UpcomingCampaigns
 **/
export const UpcomingCampaigns = (props) => {
  const { container } = styles;
  return (
    <View style={container}>
      <Text>UpcomingCampaigns</Text>
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
