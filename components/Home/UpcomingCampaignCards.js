import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { RegularView } from "../text/regular";
import WinlyColors from "../../assets/WinlyColors";
import { ManropeRegular } from "../text/ManropeRegular";

/**
 * @author
 * @function UpcomingCampaignCard
 **/
export const UpcomingCampaignCard = ({
  item,
  index,
  setClickedItem,
  setModalVisible,
  dataLength,
}) => {
  let imageUrl = item?.img?.prize;
  let title = item?.title;
  let productTitle = item?.productTitle;
  return (
    <View
      style={{
        marginBottom: 6,
        marginLeft: 12,
        marginRight: index == dataLength - 1 ? 12 : 0, //last item
        height: 228,
        width: 200,
        backgroundColor: "#ffffff",
        borderRadius: 8,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          setClickedItem(item);
          setModalVisible(true);
        }}
        style={{
          height: 228,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Image
          source={{ uri: imageUrl }}
          style={{
            height: 168,
            width: "100%",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        />
        <View
          style={{
            width: "100%",
            padding: 12,
            marginTop: -72,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
          }}
        >
          <RegularView style={{ marginBottom: 2 }}>
            <Text style={{ fontSize: 14, fontWeight: 800, marginBottom: 0 }}>
              {title}
            </Text>
          </RegularView>
          <ManropeRegular
            style={{
              fontSize: 12,
              marginBottom: 2,
              color: WinlyColors.inputlabelText,
            }}
          >
            {productTitle}
          </ManropeRegular>
        </View>
      </TouchableOpacity>
    </View>
  );
};
