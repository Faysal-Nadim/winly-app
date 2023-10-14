import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Easing, Animated } from "react-native";
import { Picker } from "@react-native-picker/picker";
import WinlyColors from "../../assets/WinlyColors";

export const CustomSelectInput = ({
  label,
  selectedValue,
  onValueChange,
  items,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const labelPosition = new Animated.Value(selectedValue ? -16 : 10);
  const labelFontSize = new Animated.Value(selectedValue ? 14 : 16);

  const handleFocus = () => {
    setIsFocused(true);
    animateLabel(0);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!selectedValue) {
      animateLabel(1);
    }
  };

  const animateLabel = (toValue) => {
    Animated.parallel([
      Animated.timing(labelPosition, {
        toValue: toValue === 0 ? -16 : 10,
        duration: 250,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }),
      Animated.timing(labelFontSize, {
        toValue: toValue === 0 ? 14 : 16,
        duration: 250,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }),
    ]).start();
  };

  useEffect(() => {
    if (isFocused || selectedValue) {
      animateLabel(0);
    } else {
      animateLabel(1);
    }
  }, [selectedValue, isFocused]);

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
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={{ ...styles.input, height: 48 }}
        onResponderGrant={handleFocus}
        onResponderRelease={handleBlur}
      >
        {items.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: WinlyColors.inputBorder,
    margin: 10,
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
    paddingLeft: 10,
  },
});
