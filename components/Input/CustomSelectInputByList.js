import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import WinlyColors from "../../assets/WinlyColors";
import * as Font from "expo-font";

export const CustomSelectInputByList = ({
  label,
  onValueChange,
  items,
  searchEnable,
  defaultOption,
}) => {
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

  // console.log(defaultOption);
  return (
    <View style={styles.inputContainer}>
      <SelectList
        search={searchEnable ? searchEnable : true}
        setSelected={onValueChange}
        data={items}
        defaultOption={defaultOption ? defaultOption : null}
        save="value"
        boxStyles={{
          height: 50,
          borderWidth: 1,
          borderColor: WinlyColors.inputBorder,
          borderRadius: 5,
        }}
        inputStyles={{
          color: WinlyColors.inputlabelText,
          fontSize: 16,
          fontFamily: loaded ? "Sora" : null,
        }}
      />

      <Text style={[styles.label, { fontFamily: loaded ? "Sora" : null }]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 10,
    marginHorizontal: 5,
  },
  label: {
    backgroundColor: WinlyColors.inputlabelBackground,
    color: WinlyColors.inputlabelText,
    paddingHorizontal: 5,

    position: "absolute",
    left: 10,
    fontSize: 12,
    top: -12,
  },
});
