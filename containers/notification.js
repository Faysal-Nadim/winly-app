import React, { useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";

/**
 * @author
 * @function Notification
 **/
export const Notification = (props) => {
  const { container } = styles;
  const [isEnabled, setIsEnabled] = useState(false);
  return (
    <View style={container}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#FF3624" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => setIsEnabled(!isEnabled)}
        value={isEnabled}
      />
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
