import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Easing,
  Animated,
  TouchableOpacity,
} from "react-native";
import WinlyColors from "../../assets/WinlyColors";
import * as Font from "expo-font";

export const CustomPasswordInput = ({ label, text, setText }) => {
  const [isFocused, setIsFocused] = useState(false);
  const labelPosition = new Animated.Value(text ? -16 : 10);
  const labelFontSize = new Animated.Value(text ? 14 : 16);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State to manage password visibility

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

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible); // Toggle password visibility
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
            fontFamily: loaded ? "Sora" : null,
          },
        ]}
      >
        {label}
      </Animated.Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          style={[styles.input, { fontFamily: loaded ? "Sora" : null }]}
          placeholder=""
          value={text}
          onChangeText={setText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity
          style={{ flex: 0.2, alignItems: "center" }}
          onPress={togglePasswordVisibility}
        >
          <Text style={{ color: WinlyColors.inputlabelText }}>
            {isPasswordVisible ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
      </View>
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
    flex: 0.8,
    color: WinlyColors.inputlabelText,
  },
});
