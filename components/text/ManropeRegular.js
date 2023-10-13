import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import * as Font from "expo-font";

/**
 * @author
 * @function ManropeRegular
 **/
export const ManropeRegular = (props) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    Font.loadAsync({
      mr: require("../../assets/fonts/Manrope-Regular.ttf"),
      mr: {
        uri: require("../../assets/fonts/Manrope-Regular.ttf"),
        display: Font.FontDisplay.FALLBACK,
      },
    }).then(() => {
      setLoaded(true);
    });
  }, []);

  return (
    <Text style={{ ...props?.style, fontFamily: loaded ? "mr" : null }}>
      {props.children}
    </Text>
  );
};
