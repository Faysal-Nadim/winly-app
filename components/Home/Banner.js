import React from "react";
import { Dimensions, Image, View } from "react-native";
import { bannerImage } from "../../assets/images";

/**
 * @author
 * @function Banner
 **/
export const Banner = (props) => {
  const screenWidth = Dimensions.get("window").width;
  return (
    <View style={{ paddingHorizontal: 10, width: screenWidth }}>
      <Image
        source={bannerImage}
        style={{ height: 172, width: "100%", borderRadius: 12 }}
      />
    </View>
  );
};
