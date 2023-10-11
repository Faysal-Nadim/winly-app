import React, { useRef } from "react";
import { View, Text, Dimensions, FlatList } from "react-native";
import { UpcomingCampaignCard } from "./UpcomingCampaignCards";
import { RegularView } from "../text/regular";

/**
 * @author Md. Shefat Zeon
 * @function UpcomingCampaigns
 **/

export const UpcomingCampaigns = ({ data }) => {
  const flatlistRef = useRef();
  const screenWidth = Dimensions.get("window").width;
  return (
    <View style={{ width: screenWidth }}>
      <View
        style={{
          marginBottom: 24,
          paddingHorizontal: 14,
        }}
      >
        <RegularView>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            Running Campaigns
          </Text>
        </RegularView>
      </View>

      <FlatList
        data={data}
        ref={flatlistRef}
        // getItemLayout={getItemLayout}
        renderItem={({ item, index }) => (
          <UpcomingCampaignCard
            item={item}
            index={index}
            dataLength={data?.length}
          />
        )}
        keyExtractor={(item) => item._id}
        horizontal={true}
        pagingEnabled={true}
        // onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        // initialScrollIndex={activeIndex}
      />
    </View>
  );
};
