import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import * as Font from "expo-font";

/**
 * @author
 * @function BoldView
 **/
export const BoldView = (props) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    Font.loadAsync({
      Sora: require("../../assets/fonts/Sora-Regular.ttf"),
      Sora: {
        uri: require("../../assets/fonts/Sora-Regular.ttf"),
        display: Font.FontDisplay.FALLBACK,
      },
    }).then(() => {
      setLoaded(true);
    });
  }, []);

  return (
    <Text style={{ fontFamily: loaded ? "Sora" : null, fontWeight: 900 }}>
      {props.children}
    </Text>
  );
};
