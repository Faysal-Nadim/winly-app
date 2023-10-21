import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import WinlyColors from "../../assets/WinlyColors";
import * as Font from "expo-font";

export const CustomSelectInputByList = ({
  label,
  onValueChange,
  items,
  searchEnable,
  defaultOption,
  placeholder,
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

  // console.log(searchEnable == undefined ? "undi" : "veri");
  // console.log(defaultOption != undefined);
  return (
    <View
      style={{
        marginVertical: 10,
        marginHorizontal: 5,
      }}
    >
      <SelectList
        search={searchEnable !== undefined ? searchEnable : true}
        setSelected={onValueChange}
        data={items}
        defaultOption={defaultOption !== undefined ? defaultOption : null}
        placeholder={placeholder !== undefined ? placeholder : "Select option"}
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

      <Text
        style={[
          {
            backgroundColor: WinlyColors.inputlabelBackground,
            color: WinlyColors.inputlabelText,
            paddingHorizontal: 5,

            position: "absolute",
            left: 10,
            fontSize: 12,
            top: -12,
          },
          { fontFamily: loaded ? "Sora" : null },
        ]}
      >
        {label}
      </Text>
    </View>
  );
};
