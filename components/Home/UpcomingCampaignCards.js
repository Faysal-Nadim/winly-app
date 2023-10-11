import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { RegularView } from "../text/regular";

/**
 * @author
 * @function UpcomingCampaignCard
 **/
export const UpcomingCampaignCard = ({ item, index, dataLength }) => {
  let imageUrl = item?.img?.prize;
  let title = item?.title;
  let productTitle = item?.productTitle;
  return (
    <View
      style={{
        marginBottom: 6,
        marginLeft: 12,
        marginRight: index == dataLength - 1 ? 12 : 0, //last item
        height: 200,
        width: 160,
        backgroundColor: "#ffffff",
        borderRadius: 8,
      }}
    >
      <TouchableOpacity onPress={() => {}}>
        <Image
          source={{ uri: imageUrl }}
          style={{ height: 200, width: "100%", borderRadius: 8 }}
        />
        <View
          style={{
            //   height: 54,
            width: "100%",
            padding: 12,
            marginTop: -72,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
            //   borderBottomStartRadius: 12,
            //   borderBottomEndRadius: 12,
          }}
        >
          <RegularView>
            <Text style={{ fontSize: 12, fontWeight: 400, marginBottom: 2 }}>
              {productTitle}
            </Text>
          </RegularView>
          <RegularView>
            <Text style={{ fontSize: 14, fontWeight: 800 }}>{title}</Text>
          </RegularView>
        </View>
      </TouchableOpacity>
    </View>
  );
};
