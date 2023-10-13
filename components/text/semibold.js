import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import * as Font from "expo-font";

/**
 * @author
 * @function SemiBoldView
 **/
export const SemiBoldView = (props) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    Font.loadAsync({
      Sora: require("../../assets/fonts/Sora-Regular.ttf"),
      Sora: {
        uri: require("../../assets/fonts/Sora-Regular.ttf"),
        display: Font.FontDisplay.FALLBACK,
      },
      "Sora-SemiBold": {
        uri: require("../../assets/fonts/Sora-SemiBold.ttf"),
        display: Font.FontDisplay.FALLBACK,
      },
    }).then(() => {
      setLoaded(true);
    });
  }, []);

  return (
    <Text
      style={{
        ...props?.style,
        fontFamily: loaded ? "Sora-SemiBold" : null,
        fontWeight: 600,
      }}
    >
      {props.children}
    </Text>
  );
};
