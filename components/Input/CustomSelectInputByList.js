import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import WinlyColors from "../../assets/WinlyColors";

export const CustomSelectInputByList = ({
  label,
  onValueChange,
  items,
  searchEnable,
}) => {
  return (
    <View style={styles.inputContainer}>
      <SelectList
        search={searchEnable ? searchEnable : true}
        setSelected={onValueChange}
        data={items}
        save="value"
        boxStyles={{
          height: 50,
          borderWidth: 1,
          borderColor: WinlyColors.inputBorder,
          borderRadius: 5,
        }}
        inputStyles={{ color: WinlyColors.inputlabelText, fontSize: 16 }}
      />

      <Text style={styles.label}>{label}</Text>
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
