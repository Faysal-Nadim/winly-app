import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MediumView } from "../components/text/medium";

/**
 * @author
 * @function Offer
 **/
export const Offer = (props) => {
  const { container } = styles;
  return (
    <View style={container}>
      <MediumView>
        <Text style={{ fontSize: 18 }}>No Offers Available</Text>
      </MediumView>
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
