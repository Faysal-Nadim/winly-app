import React from "react";
import { View, Text, StyleSheet } from "react-native";

/**
 * @author
 * @function CampaignCard
 **/
export const CampaignCard = (props) => {
  const { container } = styles;
  return (
    <View style={container}>
      <Text>CampaignCard</Text>
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
