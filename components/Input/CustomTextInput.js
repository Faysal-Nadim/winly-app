import React, { useState, useEffect } from "react";
import { View, TextInput, Easing, Animated } from "react-native";
import WinlyColors from "../../assets/WinlyColors";
import * as Font from "expo-font";

export const CustomTextInput = ({
  label,
  text,
  setText,
  keyboardType = "default",
  placeholder,
  inputFieldHeight,
  multiline,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const labelPosition = new Animated.Value(text ? -16 : 10);
  const labelFontSize = new Animated.Value(text ? 14 : 16);
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

  const handleFocus = () => {
    setIsFocused(true);
    animateLabel(0);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!text) {
      animateLabel(1);
    }
  };

  const animateLabel = (toValue) => {
    Animated.parallel([
      Animated.timing(labelPosition, {
        toValue: toValue === 0 ? -12 : 14.5,
        duration: 250,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }),
      Animated.timing(labelFontSize, {
        toValue: toValue === 0 ? 12 : 16,
        duration: 250,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }),
    ]).start();
  };

  useEffect(() => {
    if (isFocused || text) {
      animateLabel(0);
    } else {
      animateLabel(1);
    }
  }, [text, isFocused]);

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor:
          // isFocused
          // ? WinlyColors.primaryRed
          // :
          WinlyColors.inputBorder,
        marginVertical: 10,
        marginHorizontal: 5,

        borderRadius: 5,
      }}
    >
      <Animated.Text
        style={[
          {
            position: "absolute",
            left: 10,
            backgroundColor: WinlyColors.inputlabelBackground,
            paddingHorizontal: 5,
            color:
              // isFocused
              // ? WinlyColors.primaryRed
              //   :
              WinlyColors.inputlabelText,
          },
          {
            top: labelPosition,
            fontSize: labelFontSize,
            fontFamily: loaded ? "Sora" : null,
          },
        ]}
      >
        {label}
      </Animated.Text>
      <TextInput
        style={[
          {
            height: inputFieldHeight !== undefined ? inputFieldHeight : 48,
            paddingLeft: 10,
            color: WinlyColors.inputlabelText,
          },
          { fontFamily: loaded ? "Sora" : null },
        ]}
        placeholder={placeholder !== undefined ? placeholder : ""}
        multiline={multiline !== undefined ? multiline : false}
        value={text}
        onChangeText={setText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        keyboardType={keyboardType} // Set the keyboardType prop
        cursorColor={WinlyColors.primaryRed}
      />
    </View>
  );
};
