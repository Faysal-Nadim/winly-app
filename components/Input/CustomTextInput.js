import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Easing,
  Animated,
} from "react-native";
import WinlyColors from "../../assets/WinlyColors";

export const CustomTextInput = ({
  label,
  text,
  setText,
  keyboardType = "default",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const labelPosition = new Animated.Value(text ? -16 : 10);
  const labelFontSize = new Animated.Value(text ? 14 : 16);

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
    <View style={styles.inputContainer}>
      <Animated.Text
        style={[
          styles.label,
          {
            top: labelPosition,
            fontSize: labelFontSize,
          },
        ]}
      >
        {label}
      </Animated.Text>
      <TextInput
        style={styles.input}
        placeholder=""
        value={text}
        onChangeText={setText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        keyboardType={keyboardType} // Set the keyboardType prop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: WinlyColors.inputBorder,
    marginVertical: 10,
    marginHorizontal: 5,

    borderRadius: 5,
  },
  label: {
    position: "absolute",
    left: 10,
    backgroundColor: WinlyColors.inputlabelBackground,
    paddingHorizontal: 5,
    color: WinlyColors.inputlabelText,
  },
  input: {
    height: 48,
    paddingLeft: 10,
    color: WinlyColors.inputlabelText,
  },
});
